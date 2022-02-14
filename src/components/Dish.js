import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Dish = ({ id, title, imageUrl, details, menuDish, action }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    action();
  };

  const seeDetails = () => {
    console.log(id);
    navigate(`/recipe/${id}`);
  };

  console.log(details);

  return (
    <div className="card my-3 shadow-sm">
      <div className=" d-flex justify-content-between ps-2">
        <div className="col-md-6 flex-grow-1">
          <div className=" d-flex flex-column justify-content-around m-0 py-0  h-100">
            <h5 className="card-title ">{title}</h5>
            <div className="d-flex justify-content-around">
              <div className="action-btns">
                <button
                  className="btn btn-primary card-link"
                  onClick={seeDetails}
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

              <Spinner loading={isLoading} />
            </div>
          </div>
        </div>
        <div className=" col-md-4 img-container d-flex  justify-content-md-end">
          <img className="card-img" src={imageUrl} alt={title} />
        </div>
      </div>
      {details && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Price: ${details.pricePerServing}</li>
          <li className="list-group-item">
            Preparation time: {details.readyInMinutes} min.
          </li>
          <li className="list-group-item">
            HealthScore: {details.healthScore}
          </li>
          <li className="list-group-item ">
            Vegan:{" "}
            <span className="mx-1">
              {details.vegan ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#157347" }}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "#BB2D3B" }}
                  size="lg"
                />
              )}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dish;
