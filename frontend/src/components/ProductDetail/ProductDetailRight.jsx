import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChangeCount from "./ChangeCount";
import { StoreContext } from "../../context/StoreContext";
import { getVariantPrice } from "../../lib/utils";
import { Button } from "@nextui-org/react";
import { AddIcon } from "../../assets/AddIcon";
import { toast } from "react-toastify";

const ProductDetailRight = ({ product }) => {
  const variants = product?.variants;
  const options = product?.options;

  const [quantity, setQuantity] = useState(1);

  const {
    products,
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addCart
  } = useContext(StoreContext);

  const [checkedVariant, setCheckedVariant] = useState({
    option1: variants?.[0]?.option1,
    option2: variants?.[0]?.option2,
    option3: variants?.[0]?.option3,
  });

  useEffect(() => {
    setCheckedVariant({
      option1: variants?.[0]?.option1,
      option2: variants?.[0]?.option2,
      option3: variants?.[0]?.option3,
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
    checkedVariant.option1,
    checkedVariant.option2,
    checkedVariant.option3,
    quantity
  );

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = async () => {
    addCart(product, checkedVariant, quantity)
    toast.success("Thêm vào giỏ hàng thành công")
  }

  return (
    <div>
      <div className="text-[30px]">{product.product_name}</div>
      <div className="divide-solid text-amber-700 mt-10 text-[30px]">
        {priceProduct}
      </div>
      <div className="flex mt-10 flex-col gap-2">
        {options?.map((option, idx) => (
          <div className="flex gap-2 items-center" key={option.options_id}>
            <div className="">{option.option_name}:</div>
            <div className="flex items-center gap-2">
              {option.items.map((item, index) => (
                <button
                  className={`border border-gray-300 px-4 hover:border-amber-700 ${item.item_id === checkedVariant.option1 ||
                    item.item_id === checkedVariant.option2 ||
                    item.item_id === checkedVariant.option3
                    ? "text-red-500"
                    : ""
                    }`}
                  key={item.item_id}
                  onClick={() =>
                    handleChecked(item.item_id, "option" +(idx+1))
                  }
                >
                  {item.item_name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ChangeCount quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />

      <div className="pt-10">
        <Link to="/cart">
          <button
            className="bg-amber-700 text-white flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-amber-800"
            onClick={() => handleAddToCart()}
          >
            <AddIcon />
            Giỏ hàng
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductDetailRight;
