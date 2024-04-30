import React from "react";

const Header = () => {
  return (
    <div className="header h-[34vw] mt-[30px] m-auto bg-header bg-no-repeat bg-contain relative">
      <div className="header-contents absolute flex flex-col items-start gap-6 max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className="font-medium text-white text-[40px] max-sm:text-[20px] max-md:text-[30px] max-lg:text-[40px] 2xl:text-[30px]">
          Order your favorite food here
        </h2>
        <p className="text-white text-base max-sm:hidden max-md:hidden max-lg:hidden">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
          tempora tempore cupiditate esse ut quos nesciunt quisquam molestiae
          facere, distinctio aliquid, error inventore non. Molestiae quisquam
          corrupti ab dolorem iusto?
        </p>
        <button className="border-none text-[#747474] font-medium bg-white rounded-[50px] max-sm:px-4 max-sm:py-2 max-md:px-4 max-md:py-2 max-lg:px-6 max-lg:py-4 max-2xl:px-4 max-2xl:py-4 px-6 py-4">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
