import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";
import { getUserOrder } from "../pages/Bill/billServices";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleGetOrder = async () => {
    try {
      const res = await getUserOrder();
      // setCartItems(res.data.filter((item) => item.status === "pending"));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  function getItemQuantity(data) {
    return (
      cartItems.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }
  function checkExistingCartItem(data, checkedVariant) {
    const item = cartItems.find(
      (item) =>
        item.data.product_id === data.product_id &&
        item.data.checkedVariant == checkedVariant
    );
    return item;
  }

  function increaseCartQuantity(data, checkedVariant) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product.data.product_id === data.product_id &&
          product.data.checkedVariant === checkedVariant
      );
      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].quantity += 1;
      }
      return newCart;
    });
  }

  function decreaseCartQuantity(data, checkedVariant) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product.data.product_id === data.product_id &&
          product.data.checkedVariant === checkedVariant
      );
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
          item.data.checkedVariant !== checkedVariant
      );
    });
  }

  function addCart(data, checkedVariant, quantity) {
    setCartItems((currItems) => {
      const existingItem = checkExistingCartItem(data, checkedVariant);
      if (existingItem) {
        return currItems.map((item) => {
          console.log(item, existingItem);
          if (
            item?.data?.product_id === existingItem?.data?.product_id &&
            item?.data?.checkedVariant === existingItem?.data?.checkedVariant
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
