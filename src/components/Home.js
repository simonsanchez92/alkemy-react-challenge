import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dish from "./Dish";
import Search from "./Search";
import { v4 as uuidv4 } from "uuid";
import { getSingleRecipe } from "../API/actions";

function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const Home = () => {
  // const [dishes, setDishes] = useState([]);
  const [veganDishes, setVeganDishes] = useState(0);
  const [nonVeganDishes, setNonVeganDishes] = useState(0);

  const [dishes, setDishes] = usePersistedState("dishes", []);

  const handleAddDish = async (dish) => {
    if (dishes.length === 4) {
      alert("You cannot add more than 4 dishes to the menu");
      return;
    }
    const recipe = await getSingleRecipe(dish.id);

    if (recipe.details.vegan && veganDishes >= 2) {
      alert("You cannot add more that 2 vegan dishes");
      return;
    }
    if (!recipe.details.vegan && nonVeganDishes >= 2) {
      alert("You cannot add more than 2 non-vegan dishes");
      return;
    }
    const uuid = uuidv4();
    if (recipe.details.vegan) {
      setVeganDishes(veganDishes + 1);
    } else {
      setNonVeganDishes(nonVeganDishes + 1);
    }
    const newDish = { uuid, ...recipe };
    setDishes([...dishes, newDish]);
  };

  const handleDeleteDish = (dish) => {
    if (dish.details.vegan) {
      setVeganDishes(veganDishes - 1);
    } else {
      setNonVeganDishes(nonVeganDishes - 1);
    }
    setDishes(dishes.filter((d) => d.uuid !== dish.uuid));
  };

  return (
    <Fragment>
      <header className="container">
        <h1>Welcome to main page</h1>
      </header>

      <main className="container">
        <div className="menu-container border border-primary">
          <h2 className="h2">Selected dishes:</h2>
          <span>{dishes.length}/4</span>
          <h2 className="h2">Vegan dishes:</h2>
          <span>{veganDishes}/2</span>
          <div className="dishes-container d-flex flex-wrap justify-content-center ">
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
                  />
                );
              })}
          </div>
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
              ? dishes.reduce((sum, dish) => {
                  return sum + parseFloat(dish.details.readyInMinutes);
                }, 0) / dishes.length
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
      </main>
      <Search handleAddDish={handleAddDish} />
    </Fragment>
  );
};

export default Home;
