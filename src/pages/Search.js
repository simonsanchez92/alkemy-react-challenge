import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import SearchResults from "../components/SearchResults";
import Spinner from "../components/Spinner";
import { searchRecipes, getSingleRecipe } from "../API/actions";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import usePersistedState from "../hooks/usePersistedState";
import Banner from "../components/Banner";

const Search = () => {
  const [dishes, setDishes] = usePersistedState("dishes", []);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddDish = async (dish) => {
    setIsLoading(true);

    if (dishes.length === 4) {
      setIsLoading(false);
      toast.warn("You cannot add more than 4 dishes to the menu", {
        theme: "dark",
      });
      return;
    }

    const veganDishes = dishes.filter((dish) => dish.details.vegan).length;
    const nonVeganDishes = dishes.filter((dish) => !dish.details.vegan).length;

    const recipe = await getSingleRecipe(dish.id);

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

  return (
    <Fragment>
      <Banner />

      <div className="d-flex flex-column align-items-center">
        <Formik
          initialValues={{ term: "" }}
          validate={(values) => {
            const errors = {};

            if (values.term.length === 0) {
              errors.term = "Required";
            } else if (values.term.length < 2) {
              errors.term = "Term must be at least 2 characters long";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            const fetchedRecipes = await searchRecipes(values.term);
            setSearchedRecipes(fetchedRecipes);

            setMessage(
              fetchedRecipes.length === 0
                ? `No results found for '${values.term}'`
                : `Results for '${values.term}'...`
            );

            values.term = "";
            setSubmitting(false);
            setIsLoading(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="search-form">
              <div className="mb-3">
                <div className="input-group">
                  <Field
                    className="form-control"
                    id="recipeInput"
                    type="text"
                    name="term"
                    placeholder="Search for a dish..."
                  />

                  <button
                    type="submit"
                    className="btn btn-primary "
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <ErrorMessage name="term" component="div" />
            </Form>
          )}
        </Formik>

        <h4 className="search-message py-3">{message}</h4>

        {searchedRecipes.length > 1 && (
          <SearchResults recipes={searchedRecipes} handleAdd={handleAddDish} />
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

        <div className="spinner-container centered mt-4">
          <Spinner loading={isLoading} />
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
