import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderPublic } from "./components/HeaderPublic";
import { HeaderPrivate } from "./components/HeaderPrivate";
import { Container } from "./components/Container";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Login from "./pages/Login";
import useToken from "./utils/hook/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <BrowserRouter>
        <HeaderPublic /> {/* Change header to not display memu */}
        <Login setToken={setToken} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <HeaderPrivate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/models" element={<Models />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
