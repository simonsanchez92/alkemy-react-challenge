import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../API/actions";
import Spinner from "./Spinner";

const NavBar = ({ logged, router }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = router.location;

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      logout();
      navigate("/");
    }, 800);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-2 border-bottom border-dark">
      <div className="container-fluid ">
        <Link className="navbar-brand" to={pathname === "/" ? "/" : "/home"}>
          <span className="brand text-uppercase mx-2">Foodorama</span>
          <FontAwesomeIcon icon={faUtensils} />
        </Link>

        {pathname !== "/" && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {pathname !== "/" && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mt-2  mb-lg-0 d-flex justify-content-end  w-100"
              aria-labelledby="dropdownMenuBtn"
            >
              <li className="nav-item  mx-2 d-flex justify-content-end">
                <Link className="item" to="/home">
                  Menu
                </Link>
              </li>
              <li className="nav-item mx-2  d-flex justify-content-end">
                <Link className="item" to="/search">
                  Search
                </Link>
              </li>

              <li className="nav-item mx-2  d-flex justify-content-end align-items-center">
                <a
                  className="item mr-4"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout{" "}
                  <FontAwesomeIcon className="ml-4" icon={faSignOutAlt} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="spinner-container centered mt-4">
        <Spinner loading={isLoading} />
      </div>
    </nav>
  );
};

export default NavBar;
