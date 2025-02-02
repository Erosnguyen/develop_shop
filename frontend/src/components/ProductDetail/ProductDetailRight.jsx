import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChangeCount from "./ChangeCount";
import { StoreContext } from "../../context/StoreContext";
import { getVariantPrice, getVariantPriceDetail } from "../../lib/utils";
import { Button } from "@nextui-org/react";
import { AddIcon } from "../../assets/AddIcon";
import { toast } from "react-toastify";
import { AddCart } from "../../context/CartStoreContext";
import { useNavigate } from "react-router-dom";
import { AddToCartIcon } from "../../assets/AddToCartIcon";


const ProductDetailRight = ({ product }) => {
  const variants = product?.variants;
  const options = product?.options;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const {
    products,
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addCart,
    updateSelectedProductinCart,
    chooseProduct,
    handleSetStateBill,
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

  const priceProduct = getVariantPriceDetail(
    variants,
    checkedVariant.option1,
    checkedVariant.option2,
    checkedVariant.option3
  );

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddCart = async() => {
    // AddCart(product, checkedVariant, quantity);
    addCart(product, checkedVariant, quantity);
  };

  const handleBill = () => {
    chooseProduct(product, checkedVariant, quantity);
    handleSetStateBill("buynow");
    navigate("/Bill");
  }

  console.log(cartItems)

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[30px] font-medium">{product?.product_name}</div>
      <div className="divide-solid text-amber-700 text-[25px] font-medium">
        ${priceProduct}
      </div>
      <div className="text-sm line-clamp-3 font-normal text-gray-400">{product?.description}</div>
      <div className="flex flex-col gap-2">
        {options?.map((option, idx) => (
          <div className="flex gap-4 flex-wrap " key={option.options_id}>
            <div className="">{option.option_name}:</div>
            <div className="flex items-center gap-4 flex-wrap">
              {option.items.map((item, index) => (
                <Button
                  size="sm"
                  variant={"flat"}
                  color={
                    item.item_id === checkedVariant.option1 ||
                    item.item_id === checkedVariant.option2 ||
                    item.item_id === checkedVariant.option3
                    ? "warning" : "default"
                  }
                  className={`px-4 hover:border-amber-700 ${
                    item.item_id === checkedVariant.option1 ||
                    item.item_id === checkedVariant.option2 ||
                    item.item_id === checkedVariant.option3
                      ? ""
                      : "text-gray-500 bg-gray-100"
                  }`}
                  key={item.item_id}
                  onClick={() =>
                    handleChecked(item.item_id, "option" + (idx + 1))
                  }
                >
                  {item.item_name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ChangeCount
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      <div className="">
        <div className="flex space-x-8 items-center">
          <Button
            color="warning"
            variant="bordered"
            startContent={<AddToCartIcon />}
            onClick={() => handleAddCart()}
          >
            <p>Add to cart</p>
          </Button>
          <Button startContent={<AddIcon/>} color="warning" className="text-white" onPress={() => handleBill()}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailRight;
