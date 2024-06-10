import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AnimatePresence } from 'framer-motion';
import Popup from './Popup';

const AnimatedRoutes = () => {
    // const stripePromise = loadStripe(
    //   "pk_test_51OJVqESHLkJEIqUzCLHhvoOTgsKxXzjH2FXTaq1d6RKG4w3nRJmhwG4dSL8oSypm6i61SWP3WpJS1Wy3DXzLn4Te00xtjCKUGE"
    // );
    const location = useLocation()
  return (
    <AnimatePresence>
      <Popup/>
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />

        <Route
          exact
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <>
              <Header />
              {/* <Elements> */}
                <Payment />
              {/* </Elements> */}
            </>
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes
