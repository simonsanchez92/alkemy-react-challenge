import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Dish = ({ id, title, imageUrl, menuDish, action }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    action();
  };

  const seeDetails = () => {
    console.log(id);
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img className="card-img-top" src={imageUrl} alt={title} />

      <div className="card-body  ">
        <h5 className="card-title"> {title}</h5>
      </div>

      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">Price: {details.pricePerServing}</li>
        <li className="list-group-item">
          Preparation time: {details.readyInMinutes}
        </li>
        <li className="list-group-item">HealthScore: {details.healthScore}</li>
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
      </ul> */}

      <div className="card-body">
        <button className="btn btn-primary card-link" onClick={seeDetails}>
          See details
        </button>
        {menuDish === true ? (
          <button className="btn btn-danger card-link" onClick={handleAction}>
            Erase
          </button>
        ) : (
          <button className="btn btn-success card-link" onClick={handleAction}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Dish;
