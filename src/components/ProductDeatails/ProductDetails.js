import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
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
      <h1>{product.title}</h1>
      <img src={product.image} alt="product" />
      <h5>{product.category}</h5>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductDetail;
