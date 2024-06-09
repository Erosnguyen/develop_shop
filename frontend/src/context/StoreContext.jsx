import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";
import { getUserOrder, handleAddOrder, handleDeleteOrder } from "../pages/Bill/billServices";
import { getVariantId } from "../lib/utils";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [orders, setOrders] = useState([]);

  const isUser = localStorage.getItem("access_token") != null;

  useEffect(() => {
    if(cartItems != null) localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCartAPIChange = async (data=cartItems) => {
    try {
      console.log(2)
      if (isUser) {
        // xoá tâst cả order cũ
        await orders.forEach(async (order) => {
          await handleDeleteOrder(order.order_id);
        });
        handleCreateOrder(data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleFetchOrderToCart = async() => {
    if (isUser == false) return;
    if (localStorage.getItem("access_token") == null) return;
    const res = await getUserOrder();
    setOrders(res.data.filter((item) => item.status === "pending"));
    const order = res.data.filter((item) => item.status === "pending");
    // const order = orders[0];
    const items = order[0]?.items;
    if (items) setCartItems(items);
    else setCartItems([]);
  }


  const handleCreateOrder = async (data) => {
    try {
      const convertData = {
        order: {
          items: data
        },
        address: {
          street: "",
          city: "",
          state: "",
          country: ""
        }
      }
      await handleAddOrder(convertData);
      console.log(convertData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchOrderToCart();
  }, []);

  function getItemQuantity(data) {
    return (
      cartItems?.find((item) => item.data.product_id === data.product_id)
        ?.quantity || 0
    );
  }
  function checkExistingCartItem(data, variant_product_id) {
    const item = cartItems?.find(
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
      handleCartAPIChange();
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
      handleCartAPIChange();
      return newCart;
    });
    
  }

  function removeFromCart(data, variant_product_id) {
    setCartItems((currItems) => {
      const updatedCartItems = currItems.filter(
        (item) => item?.variant_product_id !== variant_product_id
      );
      console.log(1)
      handleCartAPIChange(updatedCartItems);
      return updatedCartItems;
    });
    
  }

  function addCart(data, checkedVariant, quantity) {
    setCartItems((currItems) => {
      let updatedCartItems;
      const existingItem = checkExistingCartItem(data, getVariantId(data?.variants, checkedVariant));
      if (existingItem) {
        updatedCartItems = currItems.map((item) => {
          if (item?.variant_product_id === existingItem?.variant_product_id) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
      } else {
        updatedCartItems = [
          ...currItems,
          { variant_product_id: getVariantId(data?.variants, checkedVariant), quantity: quantity, product: { ...data } },
        ];
      }
      handleCartAPIChange(updatedCartItems);
      toast.success("Đã thêm vào giỏ hàng!");
      return updatedCartItems;
    });
  }

  //Tôi muốn hàm thay đổi option đã chọn
  const updateVariant = (data, checkedVariant, currentVariantId) => {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product?.variant_product_id === currentVariantId
      );
      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].variant_product_id = getVariantId(data?.variants, checkedVariant);
      }
      handleCartAPIChange();
      return newCart;
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

  console.log(cartItems)

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
        handleFetchOrderToCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
