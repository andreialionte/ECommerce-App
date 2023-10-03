import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import Login from "../auth/Login";
import Products from "../Products/Products";
import heart from "../assets/heart-svgrepo-com.svg";
import user from "../assets/user-svgrepo-com.svg";
import cart from "../assets/cart-shopping-svgrepo-com.svg";
import { auth } from "../auth/firebase";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handlePersonalAccount = () => {
    if (auth.currentUser) {
      navigate(`/account/${auth.currentUser.uid}`);
    }
  };


  return (
    <div className="navbar">
      <Link to="/">
        <h1>ro collection</h1>
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
        <p>Contact</p>
      </div>
      <div className="user-actions">
        <div className="user-link" onClick={handlePersonalAccount}>
          <img src={user} alt="User" className="user-icon" />
          {auth.currentUser ? auth.currentUser.displayName : <Link to="/account">Account</Link>}
        </div>
        {auth.currentUser ? (
            <button onClick={() => {auth.signOut(); window.location.reload(); }}>| Sign out |</button> 
          ) : ""}
        <Link to="/favorites" className="user-link">
          <img src={heart} alt="Favorites" className="user-icon" />
          Favorites
        </Link>
        <p onClick={handleShowCart} className="cart-link">
          <img src={cart} alt="Cart" className="cart-icon" />
          Cart
        </p>
        <div className={`cart ${showCart ? "" : "cart-hidden"}`} onClick={handleShowCart}>
          <div className={`cart-backdrop ${showCart ? "" : "cart-hidden"}`} onClick={handleCloseCart}></div>
          <div className="cart-items">
            <h1>Shopping Bag</h1>
            <div className="items">
              <img src="" alt="" />
              <h1>Product</h1>
              <p>Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
