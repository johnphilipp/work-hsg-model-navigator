import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Container } from "./components/utils/Container";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <BrowserRouter>
        <Container>
          <Header /> {/* Change header to not display memu */}
          <Login setToken={setToken} />
        </Container>
      </BrowserRouter>
    );
  }

  return (
    // <div className="wrapper">
    //   <h1>Application</h1>
    //   <BrowserRouter>
    //     <Container />
    //     <Header />
    //     <Routes>
    //       <Route path="/dashboard" element={<Dashboard />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>

    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/models" element={<Models />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
