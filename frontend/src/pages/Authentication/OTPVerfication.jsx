import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { resendOTP } from "../../components/LoginPopup/loginServices";

const OTPVerification = ({ onVerify, onResend }) => {
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [waitTime, setWaitTime] = useState(0);

  const handleChange = (el, index) => {
    if (isNaN(el.value)) return false;
    const newOtpInput = [
      ...otpInput.map((d, i) => (i === index ? el.value : d)),
    ];
    setOtpInput(newOtpInput);
    setOtp(newOtpInput.join(""));
    if (el.nextSibling) {
      el.nextSibling.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify(otp);
  };

  const handleResend = () => {
    if (waitTime > 0) return; // Nếu thời gian đợi còn lại, không làm gì cả
  
    onResend();
  
    // Bắt đầu đếm ngược 60 giây
    setWaitTime(60);
    const intervalId = setInterval(() => {
      setWaitTime((time) => {
        if (time <= 1) {
          // Nếu thời gian đợi đã hết, dừng setInterval
          clearInterval(intervalId);
          return 0;
        } else {
          // Ngược lại, giảm thời gian đợi đi 1
          return time - 1;
        }
      });
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your email.
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {otpInput.map((data, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              pattern="\d*"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
            <Button fullWidth color="warning" type="submit">Xác nhận</Button>
        </div>
      </form>
      <div>
          <p className="text-[15px] text-slate-500 mt-4">
            Không nhận được mã OTP?{" "}
            <button onClick={handleResend} disabled={waitTime > 0} className={waitTime == 0 ? "text-primary" : "text-foreground"}>
              {waitTime > 0 ? `Gửi lại sau (${waitTime}s)` : 'Gửi lại'}
            </button>
          </p>
        </div>
    </div>
  );
};

export default OTPVerification;
