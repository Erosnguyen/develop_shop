import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      className="footer bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-[80px] justify-between text-white mt-[100px] "
      id="footer"
    >
      <div className="footer-content grid grid-cols-3 gap-[80px] max-sm:grid-cols-1">
        <div className="footer-content-left flex flex-col items-start gap-5">
          <h2>HUONG VIET</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            vero fugit omnis, delectus sequi numquam, aut obcaecati amet id
            ipsam assumenda iusto odio culpa ipsa dolorem velit quo non
            deserunt.
          </p>
          <div className="footer-social-icons flex">
            <img className="w-10 mr-[15px]" src={assets.facebook_icon} alt="" />
            <img className="w-10 mr-[15px]" src={assets.twitter_icon} alt="" />
            <img className="w-10 mr-[15px]" src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center flex flex-col items-center gap-5 max-sm:items-start">
          <h2>COMPANY</h2>
          <ul>
            <li className="mb-[10px]">Home</li>
            <li className="mb-[10px]">About us</li>
            <li className="mb-[10px]">Delivery</li>
            <li className="mb-[10px]">Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right flex flex-col items-center gap-5 max-sm:items-start">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li className="mb-[10px]">+84 356-083-698</li>
            <li className="mb-[10px]">huongviet@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] my-[20px] bg-gray-600 border-none" />
      <p className="footer-copyright">
        Copyright 2024 &copy huongviet@gmail.com
      </p>
    </div>
  );
};

export default Footer;
