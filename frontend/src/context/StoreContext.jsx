import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

  function getItemQuantity(data) {
    return (
      cartItems.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }

  function increaseCartQuantity(data) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.data.product_id === data.product_id) ==
        null
      ) {
        return [...currItems, { data, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.data.product_id === data.product_id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(data) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.data.product_id === data.product_id)
          ?.quantity === 1
      ) {
        return currItems.filter(
          (item) => item.data.product_id !== data.product_id
        );
      } else {
        return currItems.map((item) => {
          if (item.data.product_id === data.product_id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(data) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) => item.data.product_id !== data.product_id
      );
    });
  }

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  // const contextValues = {
  //   food_list,
  //   cartItems,
  //   setCartItems,
  //   addToCart,
  //   removeFromCart,
  // };

  useEffect(() => {
    // code to run when the component mounts
    const getProducts = async () => {
      const response = await fetchApiConfig("products");
      setProducts(response.products);
    };
    getProducts();

    const getOrder = async () => {
      const response = await fetchApiConfig("order");
      setOrder(response.order);
    };
    getOrder();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        order,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
