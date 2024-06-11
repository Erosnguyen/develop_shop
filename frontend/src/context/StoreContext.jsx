import { createContext, useEffect, useState } from "react";
import { fetchApiConfig } from "../config";
import { getUserOrder, handleAddOrder, handleDeleteOrder } from "../pages/Bill/billServices";
import { getVariantId, getVariants } from "../lib/utils";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [stateBill, setStateBill] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState([]);
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

  function updateOption(variants, checkedVariant, currentVariantId) {
    setCartItems((prevCart) => {
      const newCart = [...prevCart];
      const existingItemIndex = newCart.findIndex(
        (product) =>
          product?.variant_product_id === currentVariantId
      );
      if (existingItemIndex !== -1) {
        const new_variant_id =  getVariantId(variants, checkedVariant);
        // console.log(getVariants(variants, new_variant_id), newCart[existingItemIndex].product.variants)
        newCart[existingItemIndex].variant_product_id = new_variant_id;
        newCart[existingItemIndex].product.variants = [getVariants(variants, new_variant_id)];
      }
      handleCartAPIChange();
      return newCart;
    });
  }

  useEffect(() => {
    // code to run when the component mounts
    const getProducts = async () => {
      const response = await fetchApiConfig("products");
      setProducts(response.products.reverse());
    };
    getProducts();
  }, []);

  //Update selected Product 
  const updateSelectedProductinCart = (itemsIndex) => {
    if(itemsIndex == "all") {
      setSelectedProduct(cartItems);
    }
    else {
      const selectedProduct = itemsIndex.map((index) => {
        return cartItems[index];
      });
      setSelectedProduct(selectedProduct);
    }
  }

  //Choose product in selected product
  const chooseProduct = (data, checkedVariant, quantity) => {
    // Thêm mới sản phẩm vào selectedProdct , thay thế select product chỉ có đúng 1 sản phẩm đó
    const product = {
      variant_product_id: getVariantId(data?.variants, checkedVariant),
      quantity: quantity,
      product: { ...data }
    }
    setSelectedProduct([product]);
  }

  const handleSetStateBill = (data) => {
    setStateBill(data);
  }

  console.log(selectedProduct)

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
        updateOption,
        selectedProduct,
        updateSelectedProductinCart,
        chooseProduct,
        stateBill,
        handleSetStateBill,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
