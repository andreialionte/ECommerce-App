import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Products from "../Products/Products";
import heart from "../assets/heart-svgrepo-com.svg";
import user from "../assets/user-svgrepo-com.svg";
import cart from "../assets/cart-shopping-svgrepo-com.svg";
import { auth } from "../auth/firebase";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"; 
import { addToCart, removeFromCart, setProductCount } from "../../store/store";


const Navbar = (props) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const cartProd = useSelector((state) => state.cart.cartProd);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

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

  const handleFavoritesCart = () => {
    if (auth.currentUser) {
      navigate(`/favorites/${auth.currentUser.uid}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    window.location.reload();
  };




  return (
    <div className="navbar">
      <Link to="/">
        <h1>ro collection</h1>
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
      </div>
      <div className="user-actions">
        <div className="user-link">
          <div className="user-icon-container">
            {auth.currentUser ? (
              <div onClick={handlePersonalAccount}>
                <img src={user} alt="User" className="user-icon" />
              </div>
            ) : (
              <Link to="/account">
                <img src={user} alt="User" className="user-icon" />
              </Link>
            )}
          </div>
          <div className="link-text">
            {auth.currentUser ? auth.currentUser.displayName : <Link to="/account"><h1>Account</h1></Link>}
          </div>
        </div>
        {auth.currentUser && <button onClick={handleSignOut}> | Sign Out |</button>}

        <p onClick={handleShowCart} className="cart-link">
          <div className="cart-icon-container">
            <img src={cart} alt="Cart" className="cart-icon" />
          </div>
          <div className="link-text">
            <h1>Cart</h1>
          </div>
        </p>

        <div className={`cart ${showCart ? "" : "cart-hidden"}`}>
          <div className={`cart-backdrop ${showCart ? "" : "cart-hidden"}`} onClick={handleCloseCart}></div>
          <div className="cart-items">
            <h1>Shopping Bag</h1>
            <div className="items">
              {cartProd && cartProd.length > 0 ? (
                cartProd.map((item) => (
                  <div className="shows" key={item.id}>
                    <img src={item.image} alt="product" />
                    <h1>{item.title}</h1>
                    <p>${item.price}</p>
                    <div className="buttons">
                      <button onClick={() => dispatch(addToCart(item))}>Add</button>
                      <button onClick={() => props.handleRemoveFromCart(item)}>Remove</button>
                    </div>
                    <div className="quantity">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        onChange={(event) => dispatch(setProductCount(event.target.value))}
                        value={products}
                      />
                    </div>
                    <div>
                      <button>Check out (totalPrice)</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;