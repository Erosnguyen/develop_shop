import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const { cartItems, products, removeFromCart } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>remove</p>
        </div>
        <br />
        <hr />
        {products.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return <div></div>;
          }
        })}
      </div>
    </div>
  );
};

export default Cart;
