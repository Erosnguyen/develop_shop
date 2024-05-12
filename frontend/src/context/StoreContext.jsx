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


  // function decreaseCartQuantity(data, checkedVariant) {
  //   const { variants, ...rest } = data;
  //   const existingItem = checkExistingCartItem(data, checkedVariant);
  //   setCartItems((currItems) => {
  //     return currItems.map((item) => {
  //       if (existingItem) {
  //         if (item.quantity > 1) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return { ...item, quantity: 0 };
  //         }
  //       } else {
  //         return item;
  //       }
  //     });
  //   });
  // }
  function decreaseCartQuantity(data, checkedVariant) {
    const { variants, ...rest } = data;
    const existingItem = checkExistingCartItem(data, checkedVariant);
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (
          existingItem &&
          item.data.product_id === existingItem.data.product_id &&
          item.data.checkedVariant.option1 === existingItem.data.checkedVariant.option1 &&
          item.data.checkedVariant.option2 === existingItem.data.checkedVariant.option2 &&
          item.data.checkedVariant.option3 === existingItem.data.checkedVariant.option3 &&
          item.quantity > 1
        ) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
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
