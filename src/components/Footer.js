import React from "react";

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
