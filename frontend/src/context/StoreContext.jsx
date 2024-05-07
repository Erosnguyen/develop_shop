import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  function getItemQuantity(data) {
    return (
      cartItems.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }
  function checkExistingCartItem(data, checkedVariant) {
    const { color, material, size } = checkedVariant;
    const item = cartItems.find(
      (item) =>
        item.data.product_id === data.product_id &&
        item.data.checkedVariant.color === color &&
        item.data.checkedVariant.material === material &&
        item.data.checkedVariant.size === size
    );
    return item != null;
  }

  function increaseCartQuantity(data, checkedVariant) {
    setCartItems((currItems) => {
      const existingItem = checkExistingCartItem(data, checkedVariant);
      if (existingItem) {
        return currItems.map((item) => {
          return { ...item, quantity: item.quantity + 1 };
        });
      } else {
        return [
          ...currItems,
          { data: { ...data, checkedVariant }, quantity: 1 },
        ];
      }
    });
  }

  function decreaseCartQuantity(data, checkedVariant) {
    const { variants, ...rest } = data;
    const existingItem = checkExistingCartItem(data, checkedVariant);
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (existingItem) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return { ...item, quantity: 0 };
          }
        } else {
          return item;
        }
      });
    });
  }
  function removeFromCart(data) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) => item.data.product_id !== data.product_id
      );
    });
  }

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
