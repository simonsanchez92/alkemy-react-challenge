import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post("http://challenge-react.alkemy.org/", {
    email,
    password,
  });
  const token = await res?.data?.token;
  localStorage.setItem("alkemyToken", JSON.stringify(token));

  //only for testing purposes...
  if (email !== "challenge@alkemy.org" || password !== "react") {
    return { success: false };
  }
  return { success: true };
};

export const searchRecipes = async (searchTerm) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${process.env.REACT_APP_API_KEY}`
    );

    localStorage.setItem("searchResults", JSON.stringify(res.data.results));
    return res.data.results;
  } catch (e) {
    console.error(e);
  }
};

export const getSingleRecipe = async (RecipeId) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${RecipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
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
