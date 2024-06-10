import React, { useEffect } from "react";
import "./checkoutItem.css";
import { useDataLayerValue } from "./DataLayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const CheckoutItem = ({ id, desc, price, rating, img, qty }) => {
  // const [quantity, setQuantity] = React.useState(1);
  const [{ basket }, dispatch] = useDataLayerValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const handleItemCountChange = (e,id) => {
    dispatch({
      type: "CHANGE_ITEM_COUNT",
      itemId: id,
      itemCount: e.target.value,
    });    
  };

  return (
    <div className="checkout_item" key={id}>
      <div className="item_img">
        <img src={img} alt="" />
      </div>
      <div className="item_info">
        <h3>{desc}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <p>
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <Box
            sx={{ minWidth: "fit-content" }}
            className="product_qty_component"
          >
            <InputLabel
              sx={{
                fontWeight: 600,
                color: "black",
                fontSize: "0.9rem",
                paddingLeft: "10px",
              }}
              id="demo-simple-select-label"
            >
              Qty
            </InputLabel>
            <Select
              sx={{
                height: 50,
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "black",
                width: "fit-content",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qty}
              label="Qty"
              onChange={(e) => handleItemCountChange(e, id)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Box>
        </div>
        <div className="product_rating">
          {Array(rating)
            .fill("⭐")
            .map((stars) => stars)}
        </div>
        <button
          onClick={removeFromBasket}
          style={{ backgroundColor: "#F7CA00", cursor: "pointer" }}
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
