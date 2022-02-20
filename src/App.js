import { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Search from "./pages/Search";

import Recipe from "./pages/Recipe";

import { scroller } from "react-scroll";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const BannerWithRouter = withRouter(Banner);
const Nav = withRouter(NavBar);

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

  function handleScroll() {
    scroller.scrollTo("main", { smooth: true });
  }

  useEffect(() => {
    handleAuth();
  }, [isLoggedIn]);

  return (
    <div className="app-container">
      {/* <NavBar /> */}
      <Nav logged={isLoggedIn} />
      <BannerWithRouter handleScroll={handleScroll} />
      <main name="main">
        <div className="container main-inner py-5 d-flex flex-column ">
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
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
    </div>
  );
}

export default App;
