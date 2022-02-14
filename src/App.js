import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Search from "./pages/Search";

import Recipe from "./pages/Recipe";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

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
        <div className="app-container w-100  d-flex flex-column justify-content-center align-items-center">
          <Routes>
            <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />

            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Route>

            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
