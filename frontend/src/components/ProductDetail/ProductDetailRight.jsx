import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChangeCount from "./ChangeCount";
import { StoreContext } from "../../context/StoreContext";
import { getVariantPrice } from "../../lib/utils";

const ProductDetailRight = ({ product }) => {
  const variants = product?.variants;
  const options = product?.options;

  const {
    products,
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(StoreContext);

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

  return (
    <div>
      <div className="text-[30px]">{product.product_name}</div>
      <div className="divide-solid text-amber-700 mt-10 text-[30px]">
        {priceProduct}
      </div>
      <div className="flex mt-10 flex-col gap-2">
        {options?.map((option) => (
          <div className="flex gap-2 items-center" key={option.options_id}>
            <div className="">{option.option_name}:</div>
            <div className="flex items-center gap-2">
              {option.items.map((item) => (
                <button
                  className={`border border-gray-300 px-4 hover:border-amber-700 ${
                    item.item_id === checkedVariant.color ||
                    item.item_id === checkedVariant.size ||
                    item.item_id === checkedVariant.material
                      ? "text-red-500"
                      : ""
                  }`}
                  key={item.item_id}
                  onClick={() =>
                    handleChecked(item.item_id, option.option_name)
                  }
                >
                  {item.item_name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ChangeCount />

      <div className="pt-10">
        <Link to="/Bill">
          <button
            className="bg-amber-700 text-white mt-3 px-4 py-3 hover:bg-amber-800"
            onClick={() => increaseCartQuantity(product, checkedVariant)}
          >
            tang
          </button>
          <button
            className="bg-amber-700 text-white mt-3 px-4 py-3 hover:bg-amber-800"
            onClick={() => decreaseCartQuantity(product, checkedVariant)}
          >
            giam
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductDetailRight;
