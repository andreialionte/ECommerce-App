import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductsProductsDetails = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
        const url = `https://fakestoreapi.com/products/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {product && ((item) => {
        <div>
          <h1>{item.title}</h1>
          <img src={item.image} alt="product" />
          <h5>{item.category}</h5>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>
      })}
    </div>
  );
};

export default ProductsProductsDetails;
