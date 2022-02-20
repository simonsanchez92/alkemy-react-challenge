import React, { Fragment, useState } from "react";

import Spinner from "../components/Spinner";
import Menu from "../components/Menu";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="homepage">
      <Menu />
    </div>
  );
};

export default Home;
