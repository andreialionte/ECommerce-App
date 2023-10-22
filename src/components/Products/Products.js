import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heart from "../assets/heart-svgrepo-com.svg";
import cart from "../assets/cart-shopping-svgrepo-com.svg";
import heart_red from "../assets/heart-red.svg";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://fakestoreapi.com/products";
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await res.json();
        setProducts(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleChecked = (event) => {
    event.preventDefault();
    setChecked(!checked);
    if(checked === true){
      event.target.src = heart_red;
    }else if(checked === false){
      event.target.src = heart;
    }
  }

  return (
    <div>
      <div className="itemsOrder2">
        {error && <p>Error: {error}</p>}
        {products.length > 0 ? (
          products.map((item, index) => (
            <Link to={`/products/${item.id}`} key={item.id}>
              <div className="items2">
                <img
                  src={heart}
                  alt="heart"
                  className="heart"
                  onClick={handleChecked}
                />
                <img src={cart} alt="cart" className="cart" />
                <img src={item.image} alt="product" />
                <h5>{item.category}</h5>
                <h1>{item.title}</h1>
                <p>${item.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Products;