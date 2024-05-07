import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiConfig } from "../../config";
import ProductDetailLeft from "../../components/ProductDetail/ProductDetailLeft";
import ProductDetailRight from "../../components/ProductDetail/ProductDetailRight";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const getProductById = async (id) => {
    const res = await fetchApiConfig(`products/${id}`);
    setProduct(res.product);
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-10 mt-10">
        <ProductDetailLeft product={product} />
        <ProductDetailRight product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
