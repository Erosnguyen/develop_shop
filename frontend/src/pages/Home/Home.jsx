import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { Services } from "../../components/Services/Services";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="">
      <HeroSection  />
      {/* <Header /> */}
      <Services/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
