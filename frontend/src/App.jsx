import NavBar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Bill from "./pages/Bill/Bill";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import MessagePopup from "./components/MessagePopup/MessagePopup";
import { NextUIProvider } from "@nextui-org/system";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showMessage, setShowMessage] = useState({});

  return (
    <>
      {showLogin ? (
        <LoginPopup
          setShowLogin={setShowLogin}
          setShowMessage={setShowMessage}
        />
      ) : (
        <></>
      )}
      {showMessage?.open && <MessagePopup showMessage={showMessage} />}
      <div className="app">
        <NextUIProvider>
          <NavBar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </NextUIProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
