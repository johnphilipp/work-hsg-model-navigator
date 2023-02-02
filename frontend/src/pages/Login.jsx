import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { Logo } from "../components/Logo";
import { Container } from "../components/Container";

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
        console.log("Credentials correct");
        setToken(token);
      }
    } catch (e) {
      setErrorMsg(e.toString());
    }
  };

  return (
    <Container>
      <div className="mt-8 md:mt-28" />
      <AuthLayout>
        <div className="flex flex-col">
          <div className="mt-12 flex items-center gap-2">
            <Link to="/" aria-label="Home">
              <Logo className="-mt-3 h-10 w-auto" />
            </Link>
            <Link to="/" aria-label="Home">
              <div className="-mt-2 text-2xl font-extrabold text-slate-700">
                ModelNavigator
              </div>
            </Link>
          </div>
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
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
