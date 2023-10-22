import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import ProductsProductsDetails from "./components/ProductDeatails/ProductsProductsDetails";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Account from "./components/auth/Account";
import ForgotPassword from "./components/auth/ForgotPassword";
import "./App.css";
import ProductDetails from "./components/ProductDeatails/ProductDetails";
import Favorites from "./components/Favorites/Favorites";


function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/products:/id" element={<Products />} />
          <Route path="/favorites/:id" element={<Favorites />} />
          {/* <Route path="/products/:id" element={<ProductsProductsDetails />} /> */}
        </Routes>
    </div>
  );
}

export default App;