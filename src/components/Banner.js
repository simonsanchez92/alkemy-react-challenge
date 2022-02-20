import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Banner = ({ router, handleScroll }) => {
  return (
    <>
      {router.location.pathname === "/search" && (
        <section className="hero-banner w-100 mb-5">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1>Build your own menu</h1>
              <p>
                Use the searchbar to get the most amazing recipes and build your
                menu
              </p>
              <div className="banner-btns py-4">
                <button className="btn btn-primary mr-2" onClick={handleScroll}>
                  Begin
                </button>

                <Link className="btn btn-primary mx-3" to="/home">
                  Go to Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Banner;
