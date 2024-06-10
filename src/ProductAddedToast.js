import React from 'react'
import './productAddedToast.css'

const ProductAddedToast = ({addedProduct}) => {
  return (
    <div className="product_added_toast">
      <h4>Product Added to Cart</h4>
      <div className='product_card'>
        <div>
          <p>{addedProduct.title}</p>
          <p>${addedProduct.price}</p>
        </div>
        <img
          src={addedProduct.img}
          alt={addedProduct.desc}
        />
      </div>
    </div>
  );
}

export default ProductAddedToast
