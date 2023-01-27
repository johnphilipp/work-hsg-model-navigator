// at top
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Container } from "./components/utils/Container";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Login from "./pages/Login";

function App() {
  return (
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
