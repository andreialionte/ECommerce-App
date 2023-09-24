import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import "./Home.css";

const Home = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

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
        const responseData = await response.json(); // Await the JSON parsing
        setData(responseData); // Set the data in state
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Banner />
      <h1>Latest Products</h1>
      <div className="itemsOrder">
        {data.map((item) => {
          return (
            <div className="items" key={item.id}>
              {/* <h1>{item.id}</h1> */}
              <img src={item.image} alt="product" />
              <h5>{item.category}</h5>
              <h1>{item.title}</h1>
              <p>${item.price}</p>
            </div>
          );
        })}
      </div>
      {error && <p>{error.message}</p>}
    </Fragment>
  );
};

export default Home;
