import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "../../index.css";
import { Link } from "react-router-dom";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const token = localStorage.getItem("access_token")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [token])
  return (
    <div className="navbar pt-5 justify-between flex items-center">
      {/* <img src={assets.logo} alt="" className="w-[150px]" /> */}
      <div className="logo lg:w-[140px] md:w-[120px]">
        <Link to="/">
          <h1>HUONG VIET</h1>
        </Link>
      </div>
      <ul className="navbar-menu flex list-none gap-5 text-[#49557e] text-lg xl:gap-[20px] lg:gap-[15px] lg:text-[16px] max-md:hidden max-lg:hidden scroll-smooth">
        <a
          href="/"
          onClick={() => setMenu("home")}
          className={
            menu === "home"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer scroll-smooth"
              : "cursor-pointer"
          }
        >
          Home
        </a>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={
            menu === "menu"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile")}
          className={
            menu === "mobile"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Mobile
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={
            menu === "contact-us"
              ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
              : "cursor-pointer"
          }
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right flex items-center gap-10 max-xl:gap-[30px] max-lg:gap-5">
        <img
          className="max-lg:w-[22px] max-md:w-5"
          src={assets.search_icon}
          alt=""
        />
        <div className="navbar-search-icon relative max-lg:w-[22px] max-md:w-5">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot absolute min-w-[10px] min-h-[10px] bg-amber-700 rounded-[5px] -top-2 -right-2"></div>
        </div>
        {
          isLoggedIn ?
            <button
              onClick={() => handleLogout()}
              className="bg-transparent text-base text-[#49557e] border border-solid border-amber-700  rounded-[50px] cursor-pointer hover:bg-[#fff4f2] text-center px-[30px] py-[10px] max-xl:py-[8px] max-xl:px-[25px] max-lg:px-[20px] max-lg:py-[7px] lg:text-[15px]"
            >
              Logout
            </button> :
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent text-base text-[#49557e] border border-solid border-amber-700  rounded-[50px] cursor-pointer hover:bg-[#fff4f2] text-center px-[30px] py-[10px] max-xl:py-[8px] max-xl:px-[25px] max-lg:px-[20px] max-lg:py-[7px] lg:text-[15px]"
            >
              sign in
            </button>
        }
      </div>
    </div>
  );
};

export default NavBar;
