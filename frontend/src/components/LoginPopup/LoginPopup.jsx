import React, { useState } from "react";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="login-popup absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        action=""
        className="login-popup-container place-self-center w-max-[23vw,330px] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-[8px] text-[14px]"
      >
        <div className="login-popup-title flex justify-between items-center text-black cursor-pointer w-auto">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs flex flex-col gap-5">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              className="outline-none border-solid border-2 rounded-[4px] py-[10px]"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            className="outline-none border-solid border-2 rounded-[4px] py-[10px]"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            className="outline-none border-solid border-2 rounded-[4px] py-[10px]"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="border-none pt-10px rounded-[4px] text-white bg-amber-700 py-3 text-[15px]">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition flex items-start gap-2 -mt-[15px]">
          <input className="mt-[5px]" type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-amber-700 font-medium cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-amber-700 font-medium cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
