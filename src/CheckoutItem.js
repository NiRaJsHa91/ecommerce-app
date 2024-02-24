import React from 'react'
import './checkoutItem.css'
import { useDataLayerValue } from './DataLayer';

const CheckoutItem = ({id,desc,price,rating,img}) => {

  const [{basket}, dispatch] = useDataLayerValue();
  const removeFromBasket = ()=>{
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id: id,
    })
  }

  return (
    <div className="checkout_item" key={id}>
      <div className="item_img">
        <img
          src={img}
          alt=""
        />
      </div>
      <div className="item_info">
        <h3 >
          {desc}
        </h3>
        <p>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating).fill('⭐').map((stars)=>(
            stars
          ))}
        </div>
        <button onClick={removeFromBasket} style={{ backgroundColor: "#F7CA00", cursor:'pointer' }}>
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutItem
