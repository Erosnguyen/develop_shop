import React, { useState } from "react";
import { Button, Input, Checkbox } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon ";
import { handleLogin } from "../../components/LoginPopup/loginServices";
import { toast } from "react-toastify";

export const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("username", email)
        formData.append("password", password)
    const data = await handleLogin(formData);
    if (data?.status === 200) {
      toast.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", data?.data?.access_token);
      localStorage.setItem("token_type", data?.data?.token_type);
      window.location.href = "/";
    }
  };

  console.log(email, password)

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-screen w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <h2 className="text-2xl font-semibold">Đăng nhập👋</h2>
          <form className="flex flex-col gap-3">
            <Input
              value={email}
              onValueChange={setEmail}
              type="email"
              variant="bordered"
              label="Email"
            />
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
            <div className="flex justify-between items-center">
              <Checkbox size="sm" defaultSelected>
                Nhớ mật khẩu
              </Checkbox>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Quên mật khẩu?
              </a>
            </div>

            <Button
              onClick={handleSignIn}
              color="warning"
              variant="solid"
              fullWidth
            >
              Đăng nhập
            </Button>
            <div className="text-center text-sm">
              <p>
                Chưa có tài khoản ?
                <a href="/register" className="text-blue-500">
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
