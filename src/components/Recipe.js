import React, { useEffect, useState } from "react";
import { getSingleRecipe } from "../API/actions";
import { useParams } from "react-router-dom";
import Dish from "./Dish";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(async () => {
    const r = await getSingleRecipe(id);
    setRecipe(r);
    console.log(r);
  }, []);

  const act = () => {
    console.log("action");
  };
  return (
    <div>
      <h1>This is the individual recipe page</h1>
      <div className="dishes-container d-flex flex-wrap justify-content-center ">
        {recipe && (
          <Dish
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.image}
            menuDish={true}
            action={() => act()}
          />
        )}
      </div>
    </div>
  );
};

export default Recipe;
