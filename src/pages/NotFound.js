import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found container  d-flex flex-column justify-content-center align-items-center">
      <h1 className="py-2">404</h1>
      <h3 className="py-2">Page Not Found</h3>
      <Link to="/home" className="btn btn-primary my-4">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
