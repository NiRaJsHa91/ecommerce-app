import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDataLayerValue } from "./DataLayer";



import AnimatedRoutes from "./AnimatedRoutes";


// const stripePromise = loadStripe(
//   "pk_test_51OJVqESHLkJEIqUzCLHhvoOTgsKxXzjH2FXTaq1d6RKG4w3nRJmhwG4dSL8oSypm6i61SWP3WpJS1Wy3DXzLn4Te00xtjCKUGE"
// );


function App() {
 
  const [{...state}, dispatch] = useDataLayerValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      // console.log('user is >>>',authUser)
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
