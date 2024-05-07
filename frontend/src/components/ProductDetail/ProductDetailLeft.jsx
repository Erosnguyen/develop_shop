const ProductDetailLeft = ({ product }) => {
  return (
    <div className="">
      <div className="flex flex-nowrap overflow-y-auto">
        {/* {product?.media?.map((media, index) => (
          <div className="flex-1" key={index}>
            <img src={media.src} alt="" />
          </div>
        ))} */}
        <img src={product?.media?.[0].src} alt="" />
      </div>
    </div>
  );
};
export default ProductDetailLeft;
