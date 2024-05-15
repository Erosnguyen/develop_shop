import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from "@nextui-org/react";
import React from "react";
import { StarIcon } from "../../assets/StarIcon";
import { SearchIcon } from "../../assets/SearchIcon";

export const HeroSection = () => {
  return (
    <div className="lg:flex w-full lg:gap-16 mt-6">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="mt-16 text-4xl lg:text-[40px] font-bold 2xl:text-[50px] leading-normal">
          Khám phá hương vị độc đáo của Việt Nam
        </h1>
        <p className="">
          Chúng tôi mang đến cho bạn trải nghiệm đặt đồ ăn đặc sản từ những vùng
          miền tươi đẹp của Việt Nam, giúp bạn khám phá và thưởng thức hương vị
          độc đáo của đất nước chúng tôi.
        </p>
        <Button color="warning" className="mt-6 text-white" auto>
          <a href="/shop">Khám phá ngay</a>
        </Button>
      </div>
      <div className="flex flex-col gap-4 lg:w-1/2 max-lg:mt-10">
        <Card>
          <Image
            removeWrapper
            className="z-0 w-full h-full object-cover"
            src="src\assets\pho-bo-nam-dinh.png"
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/80 to-transparent bottom-0 z-10 flex flex-col text-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Signature
            </p>
            <h4 className="text-white font-medium text-large">
              Phở Bò Nam Định
            </h4>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-between px-10 py-5 bg-black text-white rounded-2xl">
          <h3 className="font-medium text-xl">200+ Ratings</h3>
          <div className="flex gap-1">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
        <div className="flex gap-4">
          <Card>
            <Image src="src\assets\hero2.png"></Image>
            <CardFooter className="absolute bg-gradient-to-t from-black/80 to-transparent bottom-0 z-10 flex flex-col text-start">
              <h4 className="text-white font-medium text">Bún đậu mắm tôm</h4>
            </CardFooter>
          </Card>
          <Card>
            <Image src="src\assets\hero3.png"></Image>
            <CardFooter className="absolute bg-gradient-to-t from-black/80 to-transparent bottom-0 z-10 flex flex-col text-start">
              <h4 className="text-white font-medium text">Vịt quay Lạng Sơn</h4>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
