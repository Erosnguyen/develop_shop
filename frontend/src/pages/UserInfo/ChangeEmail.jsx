import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { handleUpdateEmail } from "./userInfomationServices";

export const ChangeEmail = () => {
  const [isOTP, setIsOTP] = useState(false);
  const [state, setState] = useState({});

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async() => {
    if (isOTP) {
      // handle submit OTP
    } else {
        // handle submit email
        try {
            await handleUpdateEmail(
                {
                    new_email: state.email
                }
            )
            setIsOTP(true);
        } catch (error) {
            console.log(error);
        }
    }
  }

  console.log(isOTP, state);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        {isOTP ? (
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
            <h2 className="text-2xl font-semibold">OTP</h2>
            <form className="flex flex-col gap-4">
              <Input label="OTP" />
              <Button color="warning" className="text-white" onClick={()=> handleSubmit()}>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
            <h2 className="text-2xl font-semibold">Change Email</h2>
            <form className="flex flex-col gap-4">
              <Input onChange={handleChange} name="email" type="email" label="Email" />
              <Button color="warning" className="text-white">
                Send OTP
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
