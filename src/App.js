import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

import Recipe from "./components/Recipe";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleAuth = () => {
    const token = localStorage.getItem("alkemyToken");
    if (token && JSON.parse(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const useAuth = () => {
    return isLoggedIn;
  };

  useEffect(() => {
    handleAuth();
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <NavBar />
      <main>
        <div className="app-container container d-flex flex-column justify-content-center align-items-center">
          <Routes>
            <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />

            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Route>

            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
