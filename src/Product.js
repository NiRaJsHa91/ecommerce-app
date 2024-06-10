import React from 'react'
import './product.css'
import { Button, TextField, Box } from "@mui/material";
import { useDataLayerValue } from './DataLayer';
import { isItemInCart } from './reducer';

const Product = (props) => {

  const { onAddToBasket, ...remainingProps } = props;
  const [{basket}, dispatch] = useDataLayerValue();

  const isItemInBasket = isItemInCart(basket, props.id);

  const handleDecrease = (id, qty ) => {
    dispatch({
      type: "CHANGE_ITEM_COUNT",
      itemId: id,
      itemCount: qty - 1,
    });
  };

  const handleIncrease = (id, qty ) => {
    dispatch({
      type: "CHANGE_ITEM_COUNT",
      itemId: id,
      itemCount: qty + 1,
    });
  };

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
      {isItemInBasket ? (
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            onClick={() => handleDecrease(props.id, isItemInBasket.qty)}
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
              backgroundColor: "#61AA1F",
            }}
          >
            -
          </Button>
          <TextField
            value={isItemInBasket.qty}
            inputProps={{
              readOnly: true,
              style: { textAlign: "center", width: 8, height: 8 },
            }}
            sx={{ mx: 2 }}
          />
          <Button
            variant="contained"
            onClick={() => handleIncrease(props.id, isItemInBasket.qty)}
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
              backgroundColor: "#61AA1F",
            }}
          >
            +
          </Button>
        </Box>
      ) : (
        <button onClick={() => props.onAddToBasket({ ...remainingProps })}>
          Add To Basket
        </button>
      )}
    </div>
  );
}

export default Product
