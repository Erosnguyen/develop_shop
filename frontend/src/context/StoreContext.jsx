import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { fetchApiConfig } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
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
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        food_list,
        cartItems,
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
