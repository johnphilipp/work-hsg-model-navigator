import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AuthLayout } from "../components/utils/AuthLayout";
import { Button } from "../components/utils/Button";
import { TextField } from "../components/utils/Fields";
import { Logo } from "../components/utils/Logo";

async function loginUser(credentials) {
  console.log("post");
  return fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        email,
        password,
      });
      if ("status_code" in token) {
        console.log(token);
        setErrorMsg(token.detail);
      } else {
        setToken(token);
      }
    } catch (e) {
      setErrorMsg(e.toString());
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col">
          <Link to="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don't have an account? Contact{" "}
              <Link
                to="#"
                className="font-medium text-blue-600 hover:underline"
              >
                Bernhard Bermeitinger
              </Link>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
          <span className="mb-3 block text-sm font-medium text-red-700">
            {errorMsg}
          </span>
        </form>
      </AuthLayout>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
