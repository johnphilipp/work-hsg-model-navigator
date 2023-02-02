import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeaderPublic } from "./components/header/HeaderPublic";
import { HeaderPrivate } from "./components/header/HeaderPrivate";
import { Container } from "./components/Container";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Login from "./pages/Login";
import useToken from "./utils/hook/useToken";
import Details from "./pages/Details";
import Example from "./pages/Example";

// NOTE: Login/Logout functionality temporarily disabled

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  // const { token, setToken } = useToken();

  // if (!token) {
  //   return (
  //     <BrowserRouter>
  // <QueryClientProvider client={queryClient}>
  //       <HeaderPublic /> {/* Change header to not display memu */}
  //       <Login setToken={setToken} />
  // </QueryClientProvider>
  //     </BrowserRouter>
  //   );
  // }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HeaderPrivate />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/models" element={<Models />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/example" element={<Example />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
