import React, { useState, useEffect } from "react";
import Dish from "./Dish";
import Spinner from "./Spinner";
import usePersistedState from "../hooks/usePersistedState";

const Menu = () => {
  const [dishes, setDishes] = usePersistedState("dishes");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDish = (dish) => {
    setIsLoading(true);

    setTimeout(() => {
      setDishes(dishes.filter((d) => d.uuid !== dish.uuid));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container menu-container  my-5 shadow-lg rounded">
      <div className="menu-top py-3 border-bottom border-dark border-3">
        <div className="menu-title">
          <h2 className="h2 text-center">Menu</h2>
          <span>Dishes: {dishes.length}/4</span>
        </div>
        <div className="menu-info-container d-flex flex-column">
          <span>
            Accumulated price: $
            {dishes
              .reduce((sum, dish) => {
                return sum + parseFloat(dish.details.pricePerServing);
              }, 0)
              .toFixed(2)}
          </span>
          <span>
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
          <span>
            AVG Health Score:{" "}
            {dishes.length > 0
              ? (
                  dishes.reduce((sum, dish) => {
                    return sum + parseFloat(dish.details.healthScore);
                  }, 0) / dishes.length
                ).toFixed(2)
              : "0"}
          </span>
        </div>
      </div>

      {/* <h2 className="h2">Vegan dishes:</h2>
          <span>{veganDishes}/2</span> */}
      <div className=" py-3 d-flex flex-column ">
        <h3 className="text-center py-3">Your Selection:</h3>
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
      <div className="spinner-container centered mt-4">
        <Spinner loading={isLoading} />
      </div>
    </div>
  );
};

export default Menu;
