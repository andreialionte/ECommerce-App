import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file
import { Link } from "react-router-dom";
import Login from "../auth/Login";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="navbar">
      <h1>ro collection</h1>
      <div className="navbar-links">
        <p>Home</p>
        <p>Product</p>
        <p>About</p>
        <p>Contact</p>
      </div>
      <div className="user-actions">
        <Link to="/login">Login</Link>
        <p>Register</p>
        <p onClick={handleShowCart}>Cart</p>
        {/* Use the showCart state to conditionally apply the CSS class */}
        <div
  className={`cart ${showCart ? "" : "cart-hidden"}`}
  onClick={handleShowCart}
>
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