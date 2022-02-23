import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { getSingleRecipe } from "../API/actions";

const Recipe = () => {
  const [dishes, setDishes] = usePersistedState("dishes", []);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleAddDish = async () => {
    setIsLoading(true);
    if (dishes.length === 4) {
      setIsLoading(false);
      toast.warn("You cannot add more than 4 dishes to the menu", {
        theme: "dark",
      });
      return;
    }
    const veganDishes = dishes.filter((d) => d.details.vegan).length;
    const nonVeganDishes = dishes.filter((d) => !d.details.vegan).length;

    if (recipe.details.vegan && veganDishes >= 2) {
      setIsLoading(false);
      toast.warn("You cannot add more that 2 vegan dishes", {
        theme: "dark",
      });
      return;
    }
    if (!recipe.details.vegan && nonVeganDishes >= 2) {
      setIsLoading(false);
      toast.warn("You cannot add more that 2 non-vegan dishes", {
        theme: "dark",
      });
      return;
    }
    const uuid = uuidv4();
    const newDish = { uuid, ...recipe };
    setDishes([...dishes, newDish]);
    toast.success("Dish added to your menu!", {
      theme: "dark",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const r = await getSingleRecipe(id);
      setRecipe(r);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="recipe-container container ">
        {recipe.title ? (
          <>
            <div className="recipe-top rounded-top">
              <h1 className="text-light p-3 m-0">{recipe.title}</h1>
            </div>
            <div className="info-container bg-light  py-4 d-flex  flex-wrap ">
              <div className="recipe-img-container py-4 px-3 d-flex align-items-start justify-content-center">
                <img src={recipe.image} alt={recipe.title} />
              </div>

              <div className="summary py-3 px-4 d-flex flex-column align-items-center">
                <p
                  className=" fs-6"
                  dangerouslySetInnerHTML={{
                    __html: recipe.extraInfo?.summary,
                  }}
                />
                <small>{recipe.extraInfo?.creditsText}</small>
                <button
                  disabled={isLoading}
                  className="btn btn-primary w-50 mt-3"
                  onClick={() => {
                    handleAddDish();
                  }}
                >
                  Add to menu
                </button>
              </div>
            </div>
            <div className="recipe-center d-flex justify-content-between flex-wrap ">
              <div className="ingredients-container bg-light  my-4 border border-secondary rounded shadow-lg ">
                <h4 className=" text-light py-3 px-3 ">Ingredients:</h4>
                <ul className="list-group px-3  py-3">
                  {recipe.extraInfo?.extendedIngredients.map(
                    (ingredient, i) => (
                      <li key={i} className="list-group-item">
                        {ingredient.original}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="info-container-bottom my-4 bg-light border border-secondary rounded shadow-lg">
                <div className="details-top rounded-top">
                  <h4 className="text-light py-3 px-3 ">Details</h4>
                </div>
                <ul className="list-group  px-3  py-3">
                  <li className="list-group-item">
                    Health Score: {recipe.details?.healthScore}
                  </li>
                  <li className="list-group-item">
                    Preparation time: {recipe.details?.readyInMinutes} min.
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    Vegan:
                    {recipe.details?.vegan ? (
                      <FontAwesomeIcon
                        className="mx-2"
                        icon={faCheck}
                        style={{ color: "#157347" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="mx-2"
                        icon={faTimes}
                        style={{ color: "#BB2D3B" }}
                      />
                    )}
                  </li>
                  <li className="list-group-item">
                    Price: {recipe.details?.pricePerServing} $
                  </li>
                </ul>
              </div>
            </div>

            <div className="instructions   d-flex ">
              <div className="instructions-inner bg-light border border-secondary rounded shadow-lg">
                <h4 className=" text-light py-3 px-3">Instructions</h4>

                <div
                  className="py-4 px-4"
                  dangerouslySetInnerHTML={{
                    __html: recipe.extraInfo?.instructions,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="spinner-container centered mt-4">
            <Spinner loading={isLoading} />
          </div>
        )}
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
      </div>
    </>
  );
};

export default Recipe;
