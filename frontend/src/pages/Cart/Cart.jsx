import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = ({ product }) => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);

  console.log("Cart Items: ", cartItems);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleDeleteProductInCart = (data) => {
    removeFromCart(data);
  };

  return (
    <div className="cart mt-10 w-full">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-[#49557e]">
            <th className="border divide-solid border-amber-700">PRODUCT</th>
            <th className="border divide-solid border-amber-700">IMAGE</th>
            <th className="border divide-solid border-amber-700">QUANTILY</th>
            <th className="border divide-solid border-amber-700">PRICE</th>
            <th className="border divide-solid border-amber-700">REMOVE</th>
          </tr>
        </thead>

        <tbody className="">
          {cartItems?.map((item) => (
            <tr className="text-center">
              <td className="border divide-solid border-amber-700">
                <div>{item.data.product_name}</div>
              </td>
              <td className="border divide-solid border-amber-700 bg-no-repeat bg-center px-6 py-6">
                <img
                  className="w-full h-40 "
                  src={item.data.media[0]?.src}
                  alt=""
                />
              </td>
              <td className="border divide-solid border-amber-700">
                <div className="flex justify-center">
                  <button
                    className="font-bold text-[25px]"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <div className="pl-5 pr-5 text-[25px]">{quantity}</div>
                  <button
                    className="font-bold text-[25px]"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="border divide-solid border-amber-700">{61.17}$</td>
              <td className="border divide-solid border-amber-700">
                <div>
                  <button
                    className="text-red-700 font-bold"
                    onClick={() => handleDeleteProductInCart(item.data)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-10">
        <Link to="/Bill">
          <button className="bg-amber-700 px-5 py-4 text-white">
            PURCHASE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
