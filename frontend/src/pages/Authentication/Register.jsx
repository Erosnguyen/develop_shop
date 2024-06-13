import React, { useState } from "react";
import { Button, Input, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon ";
import { handleRegister, handleVerify } from "../../components/LoginPopup/loginServices";
import OTPVerification from "./OTPVerfication";
import { toast } from "react-toastify";

export const Register = () => {

  const [isRegistered, setIsRegistered] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        role: "user",
        password: password,
        password_confirm: confirmPassword,
      }
      const data = await handleRegister(formData);
      console.log(data)
      if (data?.status === 201) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerifyOTP = async(otp) => {
    try {
      const formData = {
        email: email,
        otp: otp,
      }
      const data = await handleVerify(formData);
      if (data?.status === 200) {
        toast.success("Xác thực thành công email!");
        window.location.href = '/login';
      }
    } catch (error) {
      toast.error("OTP không chính xác", error);
      console.log(error);
    }
  }

  console.log(email, password, confirmPassword, role);

  return (
    isRegistered ? 
    <OTPVerification onVerify={handleVerifyOTP} />
    :
    <div className="flex items-center justify-center">
      <div className="flex h-screen w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <h2 className="text-2xl font-semibold">Đăng ký👋</h2>
          <form className="flex flex-col gap-3">
            <Input value={email} onValueChange={setEmail} type="email" variant="bordered" label="Email" />
            <Input
              value={password}
              onValueChange={setPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              label="Mật khẩu"
            />
            <Input
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility2}
                >
                  {isVisible2 ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible2 ? "text" : "password"}
              variant="bordered"
              label="Xác nhận mật khẩu"
            />

              {/* <Select label="Role" placeholder="Chọn quyền" variant="bordered" value={role} onChange={handleRoleChange}>
                <SelectItem key="admin" value="admin">
                  Admin
                </SelectItem>
                <SelectItem key="user" value="user">
                  User
                </SelectItem>
              </Select> */}

            <div className="flex justify-between items-center">
                <Checkbox size="sm" defaultSelected>By continuing, i agree to the terms of use & privacy policy.</Checkbox>
            </div>

            <Button onClick={handleSignUp} color="warning" variant="solid" fullWidth>
              Đăng ký
            </Button>
            <div className="text-center text-sm">
                <p>Đã tài khoản ?<a href="/login" className="text-blue-500">Đăng nhập ngay</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
