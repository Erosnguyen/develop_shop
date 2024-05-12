import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { getVariantPrice } from "../../lib/utils";

const FoodItem = (props) => {
  const { description, product_name, media, product_id, product } = props;
  const { handleClick, ...rest } = props;
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
  } = useContext(StoreContext);

  const variants = product?.variants;
  const options = product?.options;

  const [quantity, setQuantity] = useState(1);

  const [checkedVariant, setCheckedVariant] = useState({
    color: variants?.[0]?.option1,
    material: variants?.[0]?.option2,
    size: variants?.[0]?.option3,
  });

  useEffect(() => {
    setCheckedVariant({
      color: variants?.[0]?.option1,
      material: variants?.[0]?.option2,
      size: variants?.[0]?.option3,
    });
  }, [product]);

  const updateVariant = (optionName, itemId) => {
    setCheckedVariant((prevVariant) => ({
      ...prevVariant,
      [optionName]: itemId,
    }));
  };

  const handleChecked = (itemId, optionName) => {
    updateVariant(optionName, itemId);
  };

  //lấy giá tiền của variant theo màu, hình thức, kiểu

  const priceProduct = getVariantPrice(
    variants,
    checkedVariant.color,
    checkedVariant.material,
    checkedVariant.size
  );

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container relative">
        <img
          className="food-item-image rounded-xl max-sm:w-full max-sm:h-auto max-md:w-full max-md:h-80 max-lg:size-60 max-xl:size-60 2xl:size-80"
          src={media?.length ? media[0]?.src : ""}
          alt=""
          onClick={() => handleClick(product_id)}
        />
        <div className="food-item-counter absolute bottom-[15px] right-[15px] cursor-pointer rounded-full flex justify-between items-center gap-[10px] p-[6px] bg-white">
          <img
            onClick={decrementQuantity}
            className=""
            src={assets.remove_icon_red}
            alt=""
          />
          <p>{quantity}</p>
          <img onClick={incrementQuantity} src={assets.add_icon_green} alt="" />
        </div>
        {/* )} */}
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
        <p className="food-item-desc line-clamp-4 text-sm pt-1 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <p className="food-item-price mt-3 text-amber-700 font-bold text-[22px]">
            {priceProduct}
          </p>

          <button
            className="bg-amber-700 text-white mt-3 px-3 py-2 hover:bg-amber-800"
            onClick={() => handleClick(product_id)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
