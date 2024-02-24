import React from 'react'
import './product.css'
import { useDataLayerValue } from './DataLayer'

const Product = (props) => {

  const [state,dispatch]= useDataLayerValue()

  const addToBasket=()=>{
    dispatch({
       type:'ADD_TO_BASKET',
       item: {
        id: props.id,
        desc: props.desc,
        price: props.price,
        rating: props.rating,
        img: props.img,
        title: props.title
       }
    })
  }

  return (
    <div className="product" key={props.id}>
      <div className="product_info">
        <p className="product_desc">{props.desc}</p>
        <p>
          <small>₹</small>
          <strong>{props.price}</strong>
        </p>
        <div className="product_rating">
          {Array(props.rating)
            .fill("⭐")
            .map((stars) => stars)}
        </div>
      </div>
      <img src={props.img} alt="" />
      <h3>{props.title}</h3>
      <button onClick={addToBasket}>Add To Basket</button>
    </div>
  );
}

export default Product
