import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { fetchApiConfig } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // code to run when the component mounts
    const getProducts = async () => {
      const response = await fetchApiConfig("products");
      setProducts(response.products);
    };
    getProducts();
  }, []);

  return (
    <StoreContext.Provider value={{ products }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
