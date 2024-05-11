import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const FoodItem = (props) => {
  const { description, product_name, media, variants, product_id } = props;
  const { handleClick, ...rest } = props;
  // const [itemCount, setItemCount] = useState(0);
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
  } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container relative">
        <img
          className="food-item-image rounded-xl max-sm:w-full max-sm:h-auto max-md:w-full max-md:h-80 max-lg:size-60 max-xl:size-60 2xl:size-80"
          src={media[0]?.src}
          alt=""
          onClick={() => handleClick(product_id)}
        />
        {getItemQuantity(rest) === 0 ? (
          <img
            className="add w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full"
            onClick={() => increaseCartQuantity(rest)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter absolute bottom-[15px] right-[15px] cursor-pointer rounded-full flex justify-between items-center gap-[10px] p-[6px] bg-white">
            <img
              onClick={() => decreaseCartQuantity(rest)}
              className=""
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{getItemQuantity(rest)}</p>
            <img
              onClick={() => increaseCartQuantity(rest)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info p-3">
        <div className="food-item-name-rating mb-[10px]">
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
        <div className="flex justify-between items-center">
          <p className="food-item-price mt-3 text-amber-700 font-bold text-[22px]">
            ${19}
          </p>
          <Link to="/Cart">
            <button className="bg-amber-700 text-white mt-3 px-3 py-2 hover:bg-amber-800">
              Add to cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
