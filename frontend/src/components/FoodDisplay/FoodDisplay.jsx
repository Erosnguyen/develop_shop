import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display mt-[30px]">
      <h2 className="text-2xl font-semibold">Top disher near you</h2>
      <div className="food-display-list grid grid-cols-4 mt-[30px] gap-[30px] gap-y-[50px]">
        {food_list.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
