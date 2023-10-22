import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import { Link } from "react-router-dom";
import cart from "../assets/cart-shopping-svgrepo-com.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addToCart, removeFromCart } from "../../store/store";

import "./Home.css";

const Home = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const cartProd = useSelector((state) => state.cart.cartProd);
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://fakestoreapi.com/products?limit=10";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const existingIteminCart = cartProd.find((cartItem) => cartItem.id === item.id);
    console.log(item);
    dispatch(addToCart(item)); 
    // if (existingIteminCart) {
    //   return dispatch({ type: "ADD_TO_CART", payload: item });
    // }
    // dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success('🛒 Product added to cart !', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };


  const handleRemoveFromCart = (item) => {
    const hasOnItem = cartProd.some((cartItem) => cartItem.id === item.id);
    dispatch(removeFromCart(item));

    if (hasOnItem) {
      dispatch({ type: "SET_PRODUCT_COUNT", payload: products - 1 });
    }

    if (products < 2) {
      // const updatedCart = cartProd.filter((cartItem) => cartItem.id !== item.id);
      // dispatch({ type: "REMOVE_FROM_CART", payload: item });
      dispatch(removeFromCart(item));
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Navbar handleRemoveFromCart={handleRemoveFromCart} />
      <Banner />
      <div className="center">
        <h1>Latest Products</h1>
        <div className="underline"></div>
      </div>
      <div className="itemsOrder">
        {data.map((item) => (
          <div className="items" key={item.id}>
            <img src={item.image} alt="product" />
            <img src={cart} alt="cart" className="cart" onClick={() => handleAddToCart(item)}></img>
            <h5>{item.category}</h5>
            <h1>{item.title}</h1>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      {error && <p>{error.message}</p>}
    </Fragment>
  );
};

export default Home;
