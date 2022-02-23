import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Banner from "./components/Banner";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Recipe from "./pages/Recipe";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { withRouter } from "./utils/withRouter";
import { handleScroll } from "./utils/scroller";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //To handle redirection
  const AppBanner = withRouter(Banner);
  const Nav = withRouter(NavBar);

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

  useEffect(() => {
    handleAuth();
  }, [isLoggedIn]);

  return (
    <div className="app-container">
      <Nav logged={isLoggedIn} />
      <AppBanner handleScroll={handleScroll} />
      <main name="main">
        <div className="container main-inner py-5 d-flex flex-column ">
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
