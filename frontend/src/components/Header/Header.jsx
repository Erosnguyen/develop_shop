import React from "react";

const Header = () => {
  return (
    <div className="header h-[34vw] mt-[30px] m-auto bg-header bg-no-repeat bg-contain relative">
      <div className="header-contents absolute flex flex-col items-start gap-6 max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className="font-medium text-white text-[50px]">
          Order your favorite food here
        </h2>
        <p className="text-white text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
          tempora tempore cupiditate esse ut quos nesciunt quisquam molestiae
          facere, distinctio aliquid, error inventore non. Molestiae quisquam
          corrupti ab dolorem iusto?
        </p>
        <button className="border-none text-[#747474] font-medium px-8 py-4 bg-white rounded-[50px]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
