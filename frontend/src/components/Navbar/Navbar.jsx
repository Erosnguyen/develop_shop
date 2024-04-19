import React, { useState } from "react";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar pt-5 justify-between flex items-center">
      {/* <img src={assets.logo} alt="" className="w-[150px]" /> */}
      <div className="">
        <h1>HUONG VIET</h1>
      </div>
      <ul className="navbar-menu flex list-none gap-5 text-[#49557e] text-lg">
        <li
          onClick={() => setMenu("home")}
          className={
            menu === "home"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={
            menu === "menu"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("mobile")}
          className={
            menu === "mobile"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Mobile
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={
            menu === "contact-us"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Contact us
        </li>
      </ul>
      <div className="navbar-right flex items-center gap-10">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon relative">
          <img src={assets.basket_icon} alt="" />
          <div className="dot absolute min-w-[10px] min-h-[10px] bg-amber-700 rounded-[5px] -top-2 -right-2"></div>
        </div>
        <button className="bg-transparent text-base text-[#49557e] border border-solid border-amber-700  rounded-[50px] cursor-pointer hover:bg-[#fff4f2] text-center px-[30px] py-[10px]">
          sign in
        </button>
      </div>
    </div>
  );
};

export default NavBar;
