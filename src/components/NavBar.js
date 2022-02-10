import React from "react";
import { useNavigate } from "react-router-dom";
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
        <a className="navbar-brand" href="#">
          <span className="brand text-uppercase mx-2">Foodorama</span>
          <FontAwesomeIcon icon={faUtensils} />
        </a>

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
