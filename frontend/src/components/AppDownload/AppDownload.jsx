import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="app-download m-auto mt-[100px] font-semibold items-center"
      id="app-download"
    >
      <p className="font-bold text-center text-[40px]">
        For Better Experience Download
        <br /> Huong Viet
      </p>
      <div className="app-download-platforms flex justify-center mt-10">
        <img
          className="cursor-pointer max-w-[180px]"
          src={assets.play_store}
          alt=""
        />
        <img
          className="cursor-pointer max-w-[180px]"
          src={assets.app_store}
          alt=""
        />
      </div>
    </div>
  );
};

export default AppDownload;
