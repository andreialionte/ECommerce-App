import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Favorites(props) {
  const { id } = useParams();
  const favorite = useSelector((state) => state.favorite.favorite);
  const {favoriteAdd} = props; //

  console.log(favoriteAdd)

  return (
    <div>

      <h1>Favorites for User ID: {id}</h1>
      <div className="product-container">
        {favoriteAdd.map((item) => (
          <div>
          <h5>{item.category}</h5>
          <h1>{item.title}</h1>
          <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
