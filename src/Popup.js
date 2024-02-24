import React, {useEffect, useState} from "react";
import "./popup.css";
import { motion } from "framer-motion";
import { useDataLayerValue } from "./DataLayer";

const Popup = () => {
  const [{ popup }, dispatch] = useDataLayerValue();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
   setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  },[popup]);

  return (
    
        popup && isVisible && (
        <motion.div
        className="popup"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        {popup}
        </motion.div>
        )
    
  );
};

export default Popup;
