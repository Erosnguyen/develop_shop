import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { handleUpdateEmail, handleVerifyOTP } from "./userInfomationServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ChangeEmail = () => {
    const navigate = useNavigate();

  const [isOTP, setIsOTP] = useState(false);
  const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOTP = (e) => {
        setOTP(e.target.value);
    }

  

  const handleSubmit = async() => {
    if (isOTP) {
      // handle submit OTP
      try {
        await handleVerifyOTP(
            {
                otp: otp
            }
        )
        setIsOTP(false);
        toast.success('Changed email successfully!');
        navigate('/information');
      } catch (error) {
        console.log(error);
      }
    } else {
        // handle submit email
        try {
            await handleUpdateEmail(
                {
                    new_email: email
                }
            )
            setIsOTP(true);
        } catch (error) {
            console.log(error);
        }
    }
  }

  console.log(isOTP, email, otp);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        {isOTP ? (
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
            <h2 className="text-2xl font-semibold">OTP</h2>
            <form className="flex flex-col gap-4">
              <Input value={otp} onChange={handleOTP} name="otp" label="OTP" />
              <Button color="warning" className="text-white" onClick={()=> handleSubmit()}>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
            <h2 className="text-2xl font-semibold">Change Email</h2>
            <form className="flex flex-col gap-4">
              <Input value={email} onChange={handleEmail} name="email" type="email" label="Email" />
              <Button onClick={() => handleSubmit()} color="warning" className="text-white">
                Send OTP
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
