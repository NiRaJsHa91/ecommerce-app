import React, { useState } from "react";
import "./sidebar.css";
import flag from "./images/indianFlag.svg";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = (props) => {
  const [{ user, isSidebar }, dispatch] = useDataLayerValue();
  const handleSignIn_SignOut = () => {
    if (user) {
      signOut(auth)
        .then(() => {
           dispatch({
            type: "SET_POPUP",
            popup: "Sign out succesfull",
          })
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  

  return (
    <AnimatePresence>
      {isSidebar && (
        <motion.div
        
          className="sidebar"
          // initial={{ x: "-100%"}}
          // animate={{ x: 0 }}
          // exit={{ x: "-100%" }}
          // transition={{ duration: 0.3 }}
          
        >
          <div className="sidebar_content">
            <div className="top_div">
              <div
                style={{ cursor: "pointer" }}
                className="close_sidebar"
                onClick={() => {
                  // console.log('clicked')
                  // props.handleSidebar(false);
                  dispatch({ type: "SET_IS_SIDEBAR", isSidebar: false });
                }}
              >
                <CloseIcon />
              </div>

              <Link
                to={!user && "/login"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "auto",
                }}
              >
                <div className="signIn" onClick={handleSignIn_SignOut}>
                  {user
                    ? "Welcome " +
                      user.email.substring(0, user.email.indexOf("@")) +
                      ", SignOut?"
                    : "Sign In"}
                  <Person2OutlinedIcon />
                </div>
              </Link>

              <div className="browse">
                <span>Browse</span>
                <p>Amazon</p>
              </div>
            </div>
            <div className="bottom_div">
              <div className="home_div">
                <h3>Amazon Home</h3>
                <HomeOutlinedIcon />
              </div>
              <hr />
              <div className="trending">
                <h3>Trending</h3>
                <p>Best Sellers</p>
                <p>New Releases</p>
                <p>Movers and Shakers</p>
              </div>
              <hr />
              <div className="top_categories">
                <h3>Top Categories For You</h3>
                <p>Mobiles</p>
                <p>Computers</p>
                <p>Books</p>
                <p>Amazon Fashion</p>
                <p>See All Categories</p>
              </div>
              <hr />
              <div className="sidebar_footer">
                <h3>Settings</h3>
                <div className="align">
                  <LanguageOutlinedIcon id="language_icon" />
                  <p>English</p>
                </div>
                <div className="align">
                  <img src={flag} alt="" />
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
