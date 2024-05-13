import React, {useState, useContext} from 'react'
import { StoreContext } from "../../context/StoreContext";
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import FoodItem from '../../components/FoodItem/FoodItem';
import { useNavigate } from "react-router-dom";

const Shop = () => {
    const { products } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(`/product/${path}`);
      };

  return (
    <div>
        <div className="food-display-list grid grid-cols-4 mt-[30px] gap-[30px] gap-y-[50px] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
        {products.map((item, index) => (
          <FoodItem key={index} {...item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default Shop