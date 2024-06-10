import React, { useEffect, useState } from "react";
import { bannerImages } from "./bannerImages";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";
import { useDataLayerValue } from "./DataLayer";
import { motion } from "framer-motion";
import { ToastContainer, toast, Zoom, Flip } from "react-toastify";
import ProductAddedToast from "./ProductAddedToast";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  // const [allProducts, setAllProducts] = useState([]);
  const [{searchInput, products},dispatch] = useDataLayerValue();
  const [searchResults,setSearchResults] = useState([])
 
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const resJson = await res.json();
      dispatch({type:"SET_PRODUCTS",products:resJson?.products})
    };
    fetchProducts();
  }, []);

 useEffect(()=>{
  const filterSearch = () => {
    const filterProducts = products.filter((product) => {
      return product?.title
        .toString()
        .toLowerCase()
        .includes(searchInput?.toString().toLowerCase());
    });
    setSearchResults(filterProducts);
  }
  
  filterSearch()
 },[searchInput])

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    swipe: false,
    pauseOnHover: false,
    arrows: true,
    lazyLoad: true,
    adaptiveHeight: true,
    // centerMode: true,
    className: "slides",
  };

  const onAddToBasket = (addedProduct) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: addedProduct.id,
        desc: addedProduct.desc,
        price: addedProduct.price,
        rating: addedProduct.rating,
        img: addedProduct.img,
        title: addedProduct.title,
        qty: 1,
      },
    });

    // dispatch({
    //   type: "UPDATE_PRODUCT",
    //   product_details: {
    //     id: addedProduct.id,
    //     qty: 1,
    //   },
    // });
    toast.success(<ProductAddedToast addedProduct={addedProduct} />);
  };


  return (
    <motion.div
      className="home_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home_banner">
        <Slider {...settings}>
          {bannerImages.map((banner) => (
            <div key={banner.id} className="banner_img">
              <img src={banner.img} alt="" />
            </div>
          ))}
        </Slider>
      </div>

      <div className="home_products">
        {searchResults.length > 0
          ? searchResults?.map((product) => (
              <Product
               key={product.id}
                id={product.id}
                className="product"
                desc={product.description}
                img={product.images[0]}
                rating={Math.trunc(product.rating)}
                price={product.price}
                title={product.title}
                // qty={product.qty}
              />
            ))
          : products?.map((product) => (
              <Product
               key={product.id}
                id={product.id}
                className="product"
                desc={product.description}
                img={product.images[0]}
                rating={Math.trunc(product.rating)}
                price={product.price}
                title={product.title}
                onAddToBasket={onAddToBasket}
                // qty={product.qty}
              />
            ))}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
        transition={Flip}
      />
    </motion.div>
  );
};

export default Home;
