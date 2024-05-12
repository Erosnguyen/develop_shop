import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";

const FoodDisplay = () => {
  const { products } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/product/${path}`);
  };

  return (
    <div className="food-display mt-[30px]">
      <h2 className="text-2xl font-semibold">Top disher near you</h2>
      <div className="food-display-list grid grid-cols-4 mt-[30px] gap-[30px] gap-y-[50px] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
        {products.slice(0, 8).map((item, index) => (
          <FoodItem key={index} {...item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
