import React, { useState } from "react";
import { searchRecipes } from "../API/actions";
import Dish from "./Dish";

const Search = ({ handleAddDish }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.length >= 2) {
      const fetchedRecipes = await searchRecipes(searchTerm);
      setRecipes(fetchedRecipes);

      console.log(fetchedRecipes);
    } else {
      alert("term must be at least 2 characters long");
    }
  };

  const handleAdd = (recipe) => {
    handleAddDish(recipe);
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="recipeInput" className="form-label">
            Search for a plate
          </label>
          <input
            type="text"
            className="form-control"
            id="recipeInput"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>

      <div className="searchResults d-flex flex-wrap">
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
    </div>
  );
};

export default Search;
