import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-3 border-top">
      <ul className="nav justify-content-center  pb-3 mb-3">
        <li className="nav-item">
          <Link className="nav-link px-2 " to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 " to="/search">
            Search
          </Link>
        </li>
      </ul>
      <p className="text-center">2021, All rights reserved</p>
    </footer>
  );
};

export default Footer;
