import React, { useEffect, useState, useContext } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
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
import { Logo } from "../../assets/Logo";
import { getUserOrder } from "../../pages/Bill/billServices";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";


const NavBar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const currentPath = location.pathname;

  const {
    products,
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addCart,
  } = useContext(StoreContext);

  const token = localStorage.getItem("access_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [orderCount, setOrderCount] = useState(0);

  // useEffect(() => {
  //   async function fetchOrderCount() {
  //     const count = await getUserOrder(); 
  //     setOrderCount(count.data.filter((it) => it.status === "pending").length);
  //   }

  //   fetchOrderCount();
  // }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem('cartItems');
    setIsLoggedIn(false);
    setOrderCount(0);
    window.location = '/login';
  };

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
      name: "Thanh Toán",
      link: "/bill",
      id: 3,
    },
    {
      name: "Liên hệ",
      link: "/contact",
      id: 4,
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
    <>
      <Navbar >
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <a href="/" className="hidden sm:flex gap-2 items-center font-bold text-inherit">
              <Logo/>
              <p>HƯƠNG VIỆT</p>
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
              <Badge color="danger" content={cartItems?.length} isInvisible={false} shape="circle">
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
                  name="User"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">user@example.com</p>
                </DropdownItem>
                <DropdownItem key="logout" >
                  <a href="/information">User Information</a>
                  
                </DropdownItem>
                <DropdownItem onClick={handleLogout} key="logout" color="danger">
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
