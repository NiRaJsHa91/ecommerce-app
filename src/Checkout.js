import React, { useEffect } from "react";
import "./checkout.css";
import CheckoutItem from "./CheckoutItem";
import { useDataLayerValue } from "./DataLayer";
import CurrencyFormat from "react-currency-format";
import { getBasketTotalPrice } from "./reducer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Checkout = () => {
  const [{ user, basket }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();

  return (
    <motion.div
      className="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="checkout_left">
        <h1>Shopping Cart</h1>
        {basket.length > 0 ? (
          basket.map((item) => (
            <>
              <hr />

              <CheckoutItem
                id={item.id}
                desc={item.desc}
                price={item.price}
                rating={item.rating}
                img={item.img}
                qty={item.qty}
              />
            </>
          ))
        ) : (
          <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
            {" "}
            Sorry!!!, 😞 No items in your cart
          </p>
        )}
      </div>
      <CurrencyFormat
        renderText={(value) => (
          <div className="checkout_right">
            <p>
              Subtotal ({basket.length} items): <small> ₹</small>
              <strong>{value}</strong>
            </p>
            <p>
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">
                <span> This order contains a gift</span>
              </label>
            </p>
            <button
              disabled={basket.length < 1 || !user}
              onClick={() => navigate("/payment")}
              style={{
                backgroundColor: "#FFD814",
                width: "fit-content",
                borderRadius: "10px",
                minHeight: "30px",
                marginTop: "20px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Proceed To Buy
            </button>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotalPrice(basket)}
        displayType={"text"}
        thousandSeparator={true}
      />
    </motion.div>
  );
};

export default Checkout;
