import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";
import { getUserOrder, handleAddOrder } from "../pages/Bill/billServices";
import { getVariantId } from "../lib/utils";

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

  const handleCart = async() => {
    //Xem có order nào của user không
    //Nếu có thì lấy ra

  }

  const handleGetOrder = async () => {
    try {
      const res = await getUserOrder();
      // setCartItems(res.data.filter((item) => item.status === "pending"));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      if (cartItems.length === 0) return;
      const convertData = {
        order: {
          items: cartItems
        },
        address: {
          street: "",
          city: "",
          state: "",
          country: ""
        }
      }
      const res = await handleAddOrder(convertData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetOrder();
  }, []);

  function getItemQuantity(data) {
    return (
      cartItems.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }
  function checkExistingCartItem(data, variant_product_id) {
    const item = cartItems.find(
      (item) =>
        item.variant_product_id == variant_product_id
    );
    return item;
  }

  function increaseCartQuantity(data) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product?.variant_product_id === data?.variant_product_id
      );
      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].quantity += 1;
      }
      return newCart;
    });
  }

  function decreaseCartQuantity(data) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product.variant_product_id === data.variant_product_id
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

  function removeFromCart(data, variant_product_id) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) =>
          item?.variant_product_id !== variant_product_id
      );
    });
  }

  function addCart(data, checkedVariant, quantity) {
    setCartItems((currItems) => {
      const existingItem = checkExistingCartItem(data, getVariantId(data?.variants, checkedVariant));
      if (existingItem) {
        return currItems.map((item) => {
          if (
            item?.variant_product_id === existingItem?.variant_product_id
          ) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...currItems,
          { variant_product_id: getVariantId(data?.variants, checkedVariant) , quantity: quantity, product: { ...data}  },
        ];
      }
    });
    handleCreateOrder();
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
