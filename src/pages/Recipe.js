import React, { useEffect, useState } from "react";
import { getSingleRecipe } from "../API/actions";
import { useParams } from "react-router-dom";
import Dish from "../components/Dish";

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
    <div className="container border border-warning">
      <h1>{recipe.title}</h1>
      <div className="info-container d-flex">
        <div className="summary">
          <p dangerouslySetInnerHTML={{ __html: recipe.extraInfo?.summary }} />
          <small>{recipe.extraInfo?.creditsText}</small>
        </div>
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <ul className="recipe-details">
        <li>Health Score: {recipe.details?.healthScore}</li>
        <li>Preparation time: {recipe.details?.readyInMinutes}</li>
        <li>Vegan: {recipe.details?.vegan}</li>
        <li>Price: {recipe.details?.pricePerServing}</li>
      </ul>

      <div className="ingredients-container">
        <ul>
          {recipe.extraInfo?.extendedIngredients.map((ingredient) => (
            <li>{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div
        className="instructions"
        dangerouslySetInnerHTML={{ __html: recipe.extraInfo?.instructions }}
      />
    </div>
  );
};

export default Recipe;
