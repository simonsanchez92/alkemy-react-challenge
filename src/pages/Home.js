import React from "react";
import Menu from "../components/Menu";
import AnimatedPage from "../components/AnimatedPage";

const Home = () => {
  return (
    <AnimatedPage>
      <div className="homepage">
        <Menu />
      </div>
    </AnimatedPage>
  );
};

export default Home;
