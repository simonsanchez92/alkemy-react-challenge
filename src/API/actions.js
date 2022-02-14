import axios from "axios";

export const searchRecipes = async (searchTerm) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=9633d50c4561455784d5013b3c7d3502`
    );

    return res.data.results;
  } catch (e) {
    console.error(e);
  }
};

export const getSingleRecipe = async (RecipeId) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${RecipeId}/information?apiKey=9633d50c4561455784d5013b3c7d3502`
    );

    const {
      id,
      title,
      image,
      pricePerServing,
      readyInMinutes,
      healthScore,
      vegan,
      ...rest
    } = res.data;

    const recipe = {
      id,
      title,
      image,
      details: {
        pricePerServing,
        readyInMinutes,
        healthScore,
        vegan,
      },
      extraInfo: rest,
    };

    return recipe;
  } catch (e) {
    console.error(e);
  }
};

export const logout = () => {
  localStorage.removeItem("alkemyToken");
};
