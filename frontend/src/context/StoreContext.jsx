import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function getItemQuantity(data) {
    return (
      cartItems.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }
  function checkExistingCartItem(data, checkedVariant) {
    const { option1, option2, option3 } = checkedVariant;
    const item = cartItems.find(
      (item) =>
        item.data.product_id === data.product_id &&
        item.data.checkedVariant.option1 === option1 &&
        item.data.checkedVariant.option2 === option2 &&
        item.data.checkedVariant.option3 === option3
    );
    return item != null;
  }

  function increaseCartQuantity(data, checkedVariant) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(product => product.data.product_id === data.product_id && product.data.checkedVariant.option1 === checkedVariant.option1 && product.data.checkedVariant.option2 === checkedVariant.option2 && product.data.checkedVariant.option3 === checkedVariant.option3);
      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].quantity += 1;
      }
      return newCart;
    });
  }

  function decreaseCartQuantity(data, checkedVariant) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(product => product.data.product_id === data.product_id && product.data.checkedVariant.option1 === checkedVariant.option1 && product.data.checkedVariant.option2 === checkedVariant.option2 && product.data.checkedVariant.option3 === checkedVariant.option3);
      if (existingItemIndex !== -1) {
        if (newCart[existingItemIndex].quantity > 1) {
          newCart[existingItemIndex].quantity -= 1;
        } else {
          newCart.splice(existingItemIndex, 1);
        }
      }
      return newCart;
    });
  }


  function removeFromCart(data, checkedVariant) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) =>
          item.data.product_id !==
            (data.product_id || data?.data?.product_id) ||
          item.data.checkedVariant.option1 !== checkedVariant.option1 ||
          item.data.checkedVariant.option2 !== checkedVariant.option2 ||
          item.data.checkedVariant.option3 !== checkedVariant.option3
      );
    });
  }

  function addCart(data, checkedVariant, quantity) {
    setCartItems((currItems) => {
      const existingItem = checkExistingCartItem(data, checkedVariant);
      if (existingItem) {
        return currItems.map((item) => {
          if (
            item.data.product_id === existingItem.data.product_id &&
            item.data.checkedVariant.color ===
              existingItem.data.checkedVariant.color &&
            item.data.checkedVariant.size ===
              existingItem.data.checkedVariant.size
          ) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...currItems,
          { data: { ...data, checkedVariant }, quantity: quantity },
        ];
      }
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
        addCart,
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
