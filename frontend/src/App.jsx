import NavBar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Bill from "./pages/Bill/Bill";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import MessagePopup from "./components/MessagePopup/MessagePopup";
import { NextUIProvider } from "@nextui-org/system";
import Shop from "./pages/Shop/Shop";
import { Login } from "./pages/Authentication/Login";
import { Register } from "./pages/Authentication/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="app">
        <NextUIProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </NextUIProvider>
      </div>
      <Footer />
      <ToastContainer autoClose={3000}/>
    </>
  );
}

export default App;
