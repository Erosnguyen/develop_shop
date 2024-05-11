import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Bill = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);
  console.log("Cart Items: ", cartItems);

  const handleDeleteProductInCart = (data) => {
    removeFromCart(data);
  };

  return (
    <div className="bill mt-10 grid grid-cols-2 gap-20">
      <div className="bill-left">
        <h2 className="bill-title font-semibold text-[40px] mb-5">
          Billing Information
        </h2>
        <form action="">
          <div className="">
            <input
              type="text"
              className="border divide-solid border-gray-500 leading-10 w-full"
              placeholder="Name"
            />
          </div>

          <div className=" mt-8">
            <input
              type="text"
              className="border divide-solid border-gray-500 leading-10 w-full"
              placeholder="Address"
            />
          </div>

          <div className=" mt-8">
            <input
              type="text"
              className="border divide-solid border-gray-500 leading-10 w-full"
              placeholder="Enter your phone number"
            />
          </div>

          <div className=" mt-8">
            <input
              type="text"
              className="border divide-solid border-gray-500 leading-10 w-full"
              placeholder="Enter your email address"
            />
          </div>

          <div className=" mt-8">
            <textarea
              className="border divide-solid border-gray-500 leading-10 w-full"
              name="Notes about orders"
              id=""
              placeholder="Notes about orders"
            ></textarea>
          </div>
        </form>
      </div>

      <div className="bill-right">
        <h2 className="font-semibold text-[40px] mb-5">Your order</h2>
        <div>
          {cartItems?.map((item) => (
            <div>{item.data.product_name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bill;
