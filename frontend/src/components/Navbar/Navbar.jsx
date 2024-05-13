import React, { useEffect, useState, useContext } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/SearchIcon";
import { useLocation } from "react-router-dom";
import { CartIcon } from "../../assets/CartIcon"

const NavBar = ({ setShowLogin }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    cartItems
  } = useContext(StoreContext);

  const token = localStorage.getItem("access_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setCart(cartItems.length);
  },[cartItems])

  const menus = [
    {
      name: "Trang chủ",
      link: "/",
      id: 1,
    },
    {
      name: "Cửa Hàng",
      link: "/shop",
      id: 2,
    },
    {
      name: "About",
      link: "/about",
      id: 3,
    },
  ];

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  return (
    // <div className="navbar pt-5 justify-between flex items-center">
    //   {/* <img src={assets.logo} alt="" className="w-[150px]" /> */}
    //   <div className="logo lg:w-[140px] md:w-[120px]">
    //     <Link to="/">
    //       <h1>HUONG VIET</h1>
    //     </Link>
    //   </div>
    //   <ul className="navbar-menu flex list-none gap-5 text-[#49557e] text-lg xl:gap-[20px] lg:gap-[15px] lg:text-[16px] max-md:hidden max-lg:hidden scroll-smooth">
    //     <a
    //       href="/"
    //       onClick={() => setMenu("home")}
    //       className={
    //         menu === "home"
    //           ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer scroll-smooth"
    //           : "cursor-pointer"
    //       }
    //     >
    //       Home
    //     </a>
    //     <a
    //       href="#explore-menu"
    //       onClick={() => setMenu("menu")}
    //       className={
    //         menu === "menu"
    //           ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
    //           : "cursor-pointer"
    //       }
    //     >
    //       Menu
    //     </a>
    //     <a
    //       href="#app-download"
    //       onClick={() => setMenu("mobile")}
    //       className={
    //         menu === "mobile"
    //           ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
    //           : "cursor-pointer"
    //       }
    //     >
    //       Mobile
    //     </a>
    //     <a
    //       href="#footer"
    //       onClick={() => setMenu("contact-us")}
    //       className={
    //         menu === "contact-us"
    //           ? "active:pb-[2px] border-b-2 border-[#49557e] cursor-pointer"
    //           : "cursor-pointer"
    //       }
    //     >
    //       Contact us
    //     </a>
    //   </ul>
    //   <div className="navbar-right flex items-center gap-10 max-xl:gap-[30px] max-lg:gap-5">
    //     <img
    //       className="max-lg:w-[22px] max-md:w-5"
    //       src={assets.search_icon}
    //       alt=""
    //     />
    //     <div className="navbar-search-icon relative max-lg:w-[22px] max-md:w-5">
    //       <Link to={"/cart"}>
    //         <img src={assets.basket_icon} alt="" />
    //       </Link>
    //       <div className="dot absolute min-w-[10px] min-h-[10px] bg-amber-700 rounded-[5px] -top-2 -right-2"></div>
    //     </div>
    //     {
    //       isLoggedIn ?
    //         <button
    //           onClick={() => handleLogout()}
    //           className="bg-transparent text-base text-[#49557e] border border-solid border-amber-700  rounded-[50px] cursor-pointer hover:bg-[#fff4f2] text-center px-[30px] py-[10px] max-xl:py-[8px] max-xl:px-[25px] max-lg:px-[20px] max-lg:py-[7px] lg:text-[15px]"
    //         >
    //           Logout
    //         </button> :
    //         <button
    //           onClick={() => setShowLogin(true)}
    //           className="bg-transparent text-base text-[#49557e] border border-solid border-amber-700  rounded-[50px] cursor-pointer hover:bg-[#fff4f2] text-center px-[30px] py-[10px] max-xl:py-[8px] max-xl:px-[25px] max-lg:px-[20px] max-lg:py-[7px] lg:text-[15px]"
    //         >
    //           sign in
    //         </button>
    //     }
    //   </div>
    // </div>
    <>
      <Navbar >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <a href="/" className="hidden sm:block font-bold text-inherit">
              HƯƠNG VIỆT
            </a>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            {menus.map((item) => (
              <NavbarItem key={item.id} isActive={currentPath === item.link}>
                <Link color="foreground" to={item.link}>
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Tìm kiếm..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Link to={"/cart"}>
              <Badge color="danger" content={cart} isInvisible={false} shape="circle">
                <CartIcon size={24} />
              </Badge>
          </Link>
          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button color="warning" variant="flat">
                Đăng nhập
              </Button>
            </Link>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default NavBar;
