import React, { useEffect, useState } from "react";
import "./header.css";
import amazonlogo from "./images/Amazon-Logo-White.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = ({onSearch}) => {
  const [{ user, basket, isSidebar, popup }, dispatch] = useDataLayerValue();
  // const [isSidebar, setIsSidebar] = useState(false);

  const navigate = useNavigate();

  const handleSignIn_SignOut = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          dispatch({
            type: "SET_POPUP",
            popup: "Sign out succesfull",
          });
          })
       
        .catch((error) => {
          // An error happened.
        });
    }
  };

  

  // console.log(isSidebar);

  // const visited = window.localStorage.getItem("visited") !== null;

  // if (!visited) {
  //   // some code to run on first visit
  //   const driverObj = driver();
  //   driverObj.highlight({
  //     element: ".sign-in",
  //     popover: {
  //       title: "Sign In",
  //       description: "Don't forget to sign in to get started",
  //     },
  //   });
  // }

  // window.localStorage.setItem("visited", true);

  return (
    <>
      <Sidebar />

      <div className="header">
        <MenuOutlinedIcon
          onClick={() => dispatch({ type: "SET_IS_SIDEBAR", isSidebar: true })}
          className="menu_icon"
          style={{ cursor: "pointer" }}
        />
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="header_logo" src={amazonlogo} alt="amazonlogo" />
        </Link>
        <div className="header_searchbar">
          <input
            type="search"
            onChange={(e) => {
              dispatch({
                type: "SET_SEARCH_INPUT",
                searchInput: e.target.value,
              });
            }}
          />
          <SearchIcon className="search_icon" />
        </div>
        <div className="header_nav">
          <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
            <div onClick={handleSignIn_SignOut} className="header_option">
              <span className="header_option_1">Hello</span>
              <span className="header_option_2">
                {user ? "Sign Out ?" : "Sign In ?"}
              </span>
            </div>
          </Link>

          <div className="header_option">
            <span className="header_option_1">Returns</span>
            <span className="header_option_2">& Orders</span>
          </div>

          <div className="header_option">
            <span className="header_option_1">Your</span>
            <span className="header_option_2">Prime</span>
          </div>

          <Link
            to={user ? "/checkout" : "/login"}
            style={{ textDecoration: "none" }}
          >
            <div className="header_cart" style={{ color: "white" }}>
              <ShoppingCartIcon className="cart_icon" />
              <span className="cart_value">{basket?.length}</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
