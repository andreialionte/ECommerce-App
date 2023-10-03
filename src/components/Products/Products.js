import React, { useEffect, useState } from "react";

const Products = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://fakestoreapi.com/products";
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            try {
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <img src={item.image} alt="product" />
                        <h1>{item.price}</h1>
                        <p>{item.description}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Products;
