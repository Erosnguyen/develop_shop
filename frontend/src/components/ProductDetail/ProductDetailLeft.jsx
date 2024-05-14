import React, { useState } from "react";
import { Image } from "@nextui-org/react";

const ProductDetailLeft = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleChangeImage = (index) => {
    setActiveImage(index);
  }

  console.log(product)
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="shrink-0 h-[400px] lg:h-[500px]" >
        <img className="rounded-2xl" style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={product.media ? product?.media?.[activeImage].src : "/src/assets/No_Image.png"} alt="" />
      </div>
      <div className="flex items-center gap-4">
        {
          product?.media?.map((media, index) => (
            <div onClick={() => handleChangeImage(index)} key={index} className={`rounded-xl cursor-pointer  ${activeImage == index ? "outline outline-3 outline-amber outline-offset-2" : ""}`}style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
              <img alt="" src={media.src} style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default ProductDetailLeft;
