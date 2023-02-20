import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Login from "./pages/Login";
import useToken from "./utils/hook/useToken";
import Details from "./pages/Details";
import Example from "./pages/Example";
import Skeleton from "./components/Skeleton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // change to " 1000 * 60 * (seconds) " ?
      cacheTime: Infinity, // change to " 1000 * 60 * (seconds) " ?
    },
  },
});

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Login setToken={setToken} />
        </QueryClientProvider>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Skeleton />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/models" element={<Models />} />
                <Route path="/login" element={<Login />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/example" element={<Example />} />
              </Routes>
            </div>
          </div>
        </main>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
