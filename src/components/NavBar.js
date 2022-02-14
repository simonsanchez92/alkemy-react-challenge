import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../API/actions";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light py-2 border-bottom border-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <span className="brand text-uppercase mx-2">Foodorama</span>
          <FontAwesomeIcon icon={faUtensils} />
        </Link>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuBtn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className="dropdown-menu " aria-labelledby="dropdownMenuBtn">
            <li>
              <Link
                className="dropdown-item"
                to="/search"
                style={{ cursor: "pointer" }}
              >
                Search
              </Link>
            </li>
            <li>
              <span
                className="dropdown-item"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
