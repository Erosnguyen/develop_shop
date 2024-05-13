const ProductDetailLeft = ({ product }) => {

  console.log(product)
  return (
    <div className="">
      <div className="flex flex-nowrap overflow-y-auto">
        {/* {product?.media?.map((media, index) => (
          <div className="flex-1" key={index}>
            <img src={media.src} alt="" />
          </div>
        ))} */}
        <img src={product.media ? product?.media?.[0].src : "/src/assets/No_Image.png"} alt="" />
      </div>
    </div>
  );
};
export default ProductDetailLeft;
