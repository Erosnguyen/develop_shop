import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { handleLogin, handleRegister, handleVerify } from "./loginServices";

const LoginPopup = ({ setShowLogin, setShowMessage }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [state, setState] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state?.isSentOtp) {

        const formData = {
          email: state?.email,
          otp: state?.otp
        }
        const data = await handleVerify(formData);

        if (data?.status === 200) {
          setShowMessage((pre) => ({ ...pre, open: true, text: "Xác thực thành công email!" }))

          setTimeout(() => {
            setShowMessage((pre) => ({ ...pre, open: false, text: "" }))
            setState((pre) => ({ ...pre, isSentOtp: false }))
            setCurrState("login")
          }, 2000)

        }

      } else if (currState === "Sign Up") {

        const formData = {
          email: state?.email,
          password: state?.password,
          password_confirm: state?.password_confirm,
        }

        const data = await handleRegister(formData);
        console.log(data)
        if (data?.status === 201) {
          setState((pre) => ({ ...pre, isSentOtp: true }))
        }

      } else {
        const formData = new FormData();
        formData.append("username", state?.email)
        formData.append("password", state?.password)
        const data = await handleLogin(formData);

        if (data?.status === 200) {
          localStorage.setItem("access_token", data?.data?.access_token);
          localStorage.setItem("token_type", data?.data?.token_type);

          setShowMessage((pre) => ({ ...pre, open: true, text: "Đăng nhập thành công!" }))

          setTimeout(() => {
            setShowMessage((pre) => ({ ...pre, open: false, text: "" }))
            setState((pre) => ({ ...pre, isSentOtp: false }))
            setShowLogin(false)
          }, 2000)
        }

      }
    } catch (error) {

    } finally {
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target;

    setState((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  return (
    <div className="login-popup absolute z-10 w-full h-full bg-[#00000090] grid">
      <form
        onSubmit={handleSubmit}
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
          {state?.isSentOtp ?
            <input
              className="outline-none border-solid border-2 rounded-[4px] py-[10px] pl-[8px]"
              type="text"
              placeholder="Your OTP code"
              required
              name="otp"
              value={state.otp}
              onChange={handleChange}
            />
            : <>

              <input
                className="outline-none border-solid border-2 rounded-[4px] py-[10px] pl-[8px]"
                type="email"
                placeholder="Your email"
                required
                name="email"
                value={state.email}
                onChange={handleChange}
              />
              <input
                className="outline-none border-solid border-2 rounded-[4px] py-[10px] pl-[8px]"
                type="password"
                placeholder="Password"
                required
                name="password"
                value={state.password}
                onChange={handleChange}
              />
              {currState === "Login" ? (
                <></>
              ) : (
                <input
                  className="outline-none border-solid border-2 rounded-[4px] py-[10px] pl-[8px]"
                  type="password"
                  placeholder="Confirm password"
                  required
                  name="password_confirm"
                  value={state.password_confirm}
                  onChange={handleChange}
                />
              )}
            </>}
        </div>
        <button type="submit" className="border-none pt-10px rounded-[4px] text-white bg-amber-700 py-3 text-[15px]">
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
