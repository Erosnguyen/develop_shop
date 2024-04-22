import React from "react";
import { assets } from "../../assets/assets";

const FoodItem = ({
  description,
  product_name,
  media,
  variants,
  product_id,
  handleClick,
}) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image size-80"
          src={media[0]?.src}
          alt=""
          onClick={() => handleClick(product_id)}
        />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p
            className="text-xl font-bold py-2"
            onClick={() => handleClick(product_id)}
          >
            {product_name}
          </p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc line-clamp-4 text-sm pt-1">
          {description}
        </p>
        <p className="food-item-price">${19}</p>
      </div>
    </div>
  );
};

export default FoodItem;
