import React from "react";
import Dish from "./Dish";

const SearchResults = ({ recipes, handleAdd }) => {
  return (
    <div className="searchResults d-flex  flex-wrap w-100 justify-content-around pt-5">
      {recipes &&
        recipes.map((recipe) => (
          <Dish
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.image}
            menuDish={false}
            action={() => handleAdd(recipe)}
          />
        ))}
    </div>
  );
};

export default SearchResults;
