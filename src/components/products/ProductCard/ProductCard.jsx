import React, { useContext } from 'react';
import { productsContext } from '../../../contexts/productContext';

const ProductCard = ({ item }) => {
  const { deleteProduct, toggleLike } = useContext(productsContext);

  return (
    <div>
      Title: {item.title}
      Price: ${item.price}
      Category: {item.category.title}
      Reviews: {item.reviews.length}
      Like: {item.likes}
      <button>Details</button>
      <button onClick={() => toggleLike(item.id)}>Like</button>
      {item.is_author ? (
        <>
          <button>Edit</button>
          <button onClick={() => deleteProduct(item.id)}>Delete</button>
        </>
      ) : (
        null
      )}
    </div>
  )
}

export default ProductCard