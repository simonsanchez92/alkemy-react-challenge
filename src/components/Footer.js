import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p className="text-center m-0">
        &copy; {new Date().getFullYear()} . All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
