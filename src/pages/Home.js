import React, { Fragment, useState, useEffect } from "react";

import Banner from "../components/Banner";
import Spinner from "../components/Spinner";
import Menu from "../components/Menu";
import { ToastContainer, toast } from "react-toastify";

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
  const [veganDishes, setVeganDishes] = useState(0);
  const [nonVeganDishes, setNonVeganDishes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [dishes, setDishes] = usePersistedState("dishes", []);

  return (
    <Fragment>
      {/* <Banner /> */}

      <div className="main container">
        <Menu />
      </div>

      <div className="spinner-container centered mt-4">
        <Spinner loading={isLoading} />
      </div>
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
    </Fragment>
  );
};

export default Home;
