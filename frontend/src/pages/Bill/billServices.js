import axiosCuston from "../../config/axios-custom.js";

const baseURL = "http://127.0.0.1:8000";

const API_PATH = baseURL + "/orders";

export const handleAddOrder = (payload) => {
  return axiosCuston.post(API_PATH, payload);
};

export const getUserOrder = () => {
  return axiosCuston.post(API_PATH + "/customer_id");
};

export const handleProcessingOrder = (order_id) => {
  const payload = {
    status: "processing",
  };
  return axiosCuston.put(API_PATH + `/${order_id}`, payload);
}

export const handleGetProductDetails = async(variant_id) => {
  try {
    const res = await axiosCuston.get(baseURL + `/products/variants/${variant_id}`);
    const product_id = res.data.variant.product_id;
    const response = await axiosCuston.get(baseURL + `/products/${product_id}`);
    return response.data.product
  } catch (error) {
    console.error(error);
  }
}
