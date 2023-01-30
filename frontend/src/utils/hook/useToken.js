import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = (userToken) => {
    localStorage.removeItem("token"); // or deleteItem...
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
