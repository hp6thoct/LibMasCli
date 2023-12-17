import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import Order from "./Pages/Order";
import Header from "./Components/Header";
import ProductDetail from "./Pages/ProductDetail";
import Footer from "./Components/Footer";
import Category from "./Pages/Category";
import ProductCategory from "./Pages/ProductCategory";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./Context/UserContext";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import 'antd/dist/reset.css';
import Result from "./Pages/Result";
import OrderDetail from "./Pages/OrderDetail";


function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout/:userid/:cartid" element={<Checkout />} /> 
          <Route path="/product/:productName" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<ProductCategory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart/:cartid" element={<Cart />} />
          <Route path="/search/:keyword" element={<Result />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </UserProvider>
  );
}

export default App;
