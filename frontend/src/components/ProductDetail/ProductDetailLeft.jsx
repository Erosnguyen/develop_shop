import React, { useState } from "react";
import { Image } from "@nextui-org/react";

const ProductDetailLeft = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleChangeImage = (index) => {
    setActiveImage(index);
  }

  console.log(product)
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="shrink-0 h-[400px] lg:h-[500px]" >
        <img className="rounded-2xl" style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={product.media ? product?.media?.[activeImage].src : "/src/assets/No_Image.png"} alt="" />
      </div>
      <div className="flex items-center gap-4 overflow-x-auto m-3 p-2">
        {
          product?.media?.map((media, index) => (
            <div onClick={() => handleChangeImage(index)} key={index} className={`rounded-xl cursor-pointer relative flex-none w-24 h-24 overflow-visible ${activeImage == index ? "outline outline-3 outline-amber outline-offset-2" : ""}`}>
              <img alt="" src={media.src} className="relative rounded-xl" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default ProductDetailLeft;
