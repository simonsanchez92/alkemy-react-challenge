import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dish from "./Dish";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import {
  faPizzaSlice,
  faMoneyBill,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import usePersistedState from "../hooks/usePersistedState";

const Menu = () => {
  const [dishes, setDishes] = usePersistedState("dishes", []);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDish = (dish) => {
    setIsLoading(true);

    setTimeout(() => {
      setDishes(dishes.filter((d) => d.uuid !== dish.uuid));
      setIsLoading(false);
      toast.info("Dish removed from menu", {
        theme: "dark",
      });
    }, 1000);
  };

  return (
    <>
      {dishes && (
        <div className="container menu-container  shadow-lg rounded">
          <div className="menu-top py-3 border-bottom border-dark border-3">
            <div className="menu-title pb-3">
              <h2 className="h2 text-center">Menu</h2>
            </div>
            <div className="menu-info-container d-flex flex-column">
              <span className="text-uppercase">
                <FontAwesomeIcon
                  icon={faPizzaSlice}
                  className="mx-2"
                  style={{ color: "rgb(216, 165, 71)" }}
                />{" "}
                Dishes: {dishes.length}
                /4
              </span>
              <span className="text-uppercase">
                <FontAwesomeIcon
                  icon={faClock}
                  className="mx-2"
                  style={{ color: "rgb(149, 156, 163)" }}
                />{" "}
                AVG Prep time:{" "}
                {dishes.length > 0
                  ? (
                      dishes.reduce((sum, dish) => {
                        return sum + parseFloat(dish.details.readyInMinutes);
                      }, 0) / dishes.length
                    ).toFixed(2)
                  : "0"}{" "}
                min.
              </span>
              <span className="text-uppercase">
                <FontAwesomeIcon
                  icon={faStar}
                  className="mx-2"
                  style={{ color: "rgb(168, 212, 79)" }}
                />
                AVG Health Score:{" "}
                {dishes.length > 0
                  ? (
                      dishes.reduce((sum, dish) => {
                        return sum + parseFloat(dish.details.healthScore);
                      }, 0) / dishes.length
                    ).toFixed(2)
                  : "0"}
              </span>
              <span className="text-uppercase">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="mx-2"
                  style={{ color: "rgb(2, 46, 2)" }}
                />{" "}
                Accumulated price: $
                {dishes
                  .reduce((sum, dish) => {
                    return sum + parseFloat(dish.details.pricePerServing);
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <div className=" py-4 d-flex flex-column ">
            {dishes.length === 0 && (
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center py-4">
                  You have not added any dishes to the menu yet...
                </h3>
                <Link to="/search" className="btn btn-primary my-4 p-3">
                  Start Now
                </Link>
              </div>
            )}
            <div className="dishes-container d-flex flex-wrap justify-content-around">
              {dishes &&
                dishes.map((dish, i) => {
                  return (
                    <Dish
                      key={i}
                      id={dish.id}
                      title={dish.title}
                      imageUrl={dish.image}
                      menuDish={true}
                      action={() => handleDeleteDish(dish)}
                      details={dish.details}
                    />
                  );
                })}
            </div>
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="spinner-container centered mt-4">
            <Spinner loading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
