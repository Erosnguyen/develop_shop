import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { getVariantPrice } from "../../lib/utils";
import { Button } from "@nextui-org/react";
import { AddIcon } from "../../assets/AddIcon";

const FoodItem = (props) => {
  const {
    description,
    product_name,
    media,
    product_id,
    product,
    options,
    variants,
  } = props;
  const { handleClick, ...rest } = props;
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
  } = useContext(StoreContext);

  const [quantity, setQuantity] = useState(1);

  // const [checkedVariant, setCheckedVariant] = useState({
  //   option1: variants?.[0]?.option1,
  //   option2: variants?.[0]?.option2,
  //   option3: variants?.[0]?.option3,
  // });

  // useEffect(() => {
  //   setCheckedVariant({
  //     option1: variants?.[0]?.option1,
  //     option2: variants?.[0]?.option2,
  //     option3: variants?.[0]?.option3,
  //   });
  // }, [product]);

  // const updateVariant = (optionName, itemId) => {
  //   setCheckedVariant((prevVariant) => ({
  //     ...prevVariant,
  //     [optionName]: itemId,
  //   }));
  // };

  // const handleChecked = (itemId, optionName) => {
  //   updateVariant(optionName, itemId);
  // };

  //lấy giá tiền của variant theo màu, hình thức, kiểu

  const priceProduct = getVariantPrice(
    variants,
    options ? options[0]?.items[0]?.item_id : "",
    options ? options[1]?.items[0]?.item_id : "",
    options ? options[2]?.items[0]?.item_id : ""
  );

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div onClick={() => handleClick(product_id)} className="">
      <div className="relative overflow-hidden rounded-xl">
        {/* <img
          className="food-item-image rounded-xl max-sm:w-full max-sm:h-auto max-md:w-full max-md:h-80 max-lg:size-60 max-xl:size-60 2xl:size-80 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          src={media ? media[0]?.src : "/src/assets/No_Image.png"}
          alt=""
          onClick={() => handleClick(product_id)}
        /> */}
        <div
          className={`bg-cover bg-center rounded-xl w-full h-80 md:h-40 lg:h-60 xl:h-80 2xl:h-80 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}
          style={{
            backgroundImage: `url(${
              media ? media[0]?.src : "/src/assets/No_Image.png"
            })`,
          }}
        ></div>
        {/* <div className="food-item-counter absolute bottom-[15px] right-[15px] cursor-pointer rounded-full flex justify-between items-center gap-[10px] p-[6px] bg-white">
          <img
            onClick={decrementQuantity}
            className=""
            src={assets.remove_icon_red}
            alt=""
          />
          <p>{quantity}</p>
          <img onClick={incrementQuantity} src={assets.add_icon_green} alt="" />
        </div> */}
      </div>
      <div className="food-item-info p-3">
        <div className="food-item-name-rating mb-[10px]">
          <p
            className="text-xl font-bold py-2"
          >
            {product_name}
          </p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc text-sm pt-1 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="food-item-price text-amber-700 font-bold text-[22px]">
            ${priceProduct}
          </p>
          <div>
            <Button
              color="warning"
              startContent={<AddIcon />}
              className=" text-white"
              onClick={() => handleClick(product_id)}
            >
              Giỏ hàng
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
