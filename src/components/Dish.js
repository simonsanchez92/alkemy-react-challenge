import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Dish = ({ id, title, imageUrl, details, menuDish, action }) => {
  const navigate = useNavigate();

  const handleAction = async () => {
    action();
  };

  const seeDetails = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="card my-3 shadow-lg">
      <div className=" d-flex justify-content-between ps-2">
        <div className="col-md-6 flex-grow-1">
          <div className=" d-flex flex-column justify-content-around m-0 py-0  h-100">
            <h5 className="card-title">{title}</h5>
            <div className="d-flex justify-content-start b">
              <div className="action-btns">
                {/* <button>
                  See details
                  <Link to={`/recipe/${id}`} state={r} />
                </button> */}
                <button
                  className="btn btn-primary card-link"
                  onClick={() => seeDetails()}
                >
                  See details
                </button>
                {menuDish === true ? (
                  <button
                    className="btn btn-danger card-link"
                    onClick={handleAction}
                  >
                    Erase
                  </button>
                ) : (
                  <button
                    className="btn btn-success card-link"
                    onClick={handleAction}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" col-md-4 img-container d-flex  justify-content-md-end">
          <img className="card-img" src={imageUrl} alt={title} />
        </div>
      </div>
      {details && (
        <ul className="list-group list-group">
          <li className="list-group-item">
            Price: {details.pricePerServing} $
          </li>
          <li className="list-group-item">
            Preparation time: {details.readyInMinutes} min.
          </li>
          <li className="list-group-item">
            HealthScore: {details.healthScore}
          </li>
          <li className="list-group-item d-flex align-items-center">
            Vegan:
            {details.vegan ? (
              <FontAwesomeIcon
                className="mx-2"
                icon={faCheck}
                style={{ color: "#157347" }}
              />
            ) : (
              <FontAwesomeIcon
                className="mx-2"
                icon={faTimes}
                style={{ color: "#BB2D3B" }}
              />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dish;
