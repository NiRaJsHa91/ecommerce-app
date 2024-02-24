import React from 'react'
import './payment.css'
import { useDataLayerValue } from './DataLayer';
import CheckoutItem from './CheckoutItem';
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getBasketTotalPrice } from './reducer';
import CurrencyFormat from 'react-currency-format';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import DeliveryAddress from './DeliveryAddress';


const Payment = () => {

    const [{basket},dispatch] = useDataLayerValue()

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    
  return (
    <motion.div className="payment">
      <h1>Checkout ({basket?.length + " items"}) </h1>
      <div className="payment_container">
        <div className="payment_section">
          <div className="title">
            <h4>Delivery Address</h4>
          </div>
          <DeliveryAddress/>
        </div>
        <hr />
        <div className="payment_section added_products_section">
          <div className="title">
            <h4>Review items and delivery</h4>
          </div>
          <div className="details ">
            {basket.length > 0 ? (
              basket.map((item) => (
                <>
                  <CheckoutItem
                    id={item.id}
                    desc={item.desc}
                    price={item.price}
                    rating={item.rating}
                    img={item.img}
                  />
                  <hr />
                </>
              ))
            ) : (
              <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
                {" "}
                Sorry!!!, 😞 No items in your cart
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="payment_section">
          <div className="title">
            <h4>Payment Method</h4>
          </div>
          <div  className="details">
            <form action="">
              <CardElement />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <div className="checkout_right">
                      <p>
                        Order Total : <small> ₹ </small>
                        <strong>{value}</strong>
                      </p>
                      
                      <button
                        disabled
                        style={{
                          backgroundColor: "#FFD814",
                          width: "fit-content",
                          borderRadius: "10px",
                          minHeight: "30px",
                          marginTop: "20px",
                          padding: "10px",
                          
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                  decimalScale={2}
                  value={getBasketTotalPrice(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Payment
