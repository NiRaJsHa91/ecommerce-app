import React, { useEffect, useLayoutEffect, useState } from "react";
import { bannerImages } from "./bannerImages";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";
import { useDataLayerValue } from "./DataLayer";
import { motion } from "framer-motion";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [{searchInput},dispatch] = useDataLayerValue();
  const [searchResults,setSearchResults] = useState([])
 
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const resJson = await res.json();
      setAllProducts(resJson?.products);
    };
    fetchProducts();
  }, []);

 useEffect(()=>{
  const filterSearch = () => {
    const filterSongs = allProducts.filter((product)=>{
    return product?.title.toString().toLowerCase().includes(searchInput?.toString().toLowerCase())
  })
    setSearchResults(filterSongs)
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

  return (
    <motion.div className="home_container" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="home_banner">
        <Slider {...settings}>
          {bannerImages.map((banner) => (
            <div className="banner_img">
              <img src={banner.img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      
          <div className="home_products">
            {searchResults.length > 0
              ? searchResults?.map((product) => (
                  <Product
                    
                    id={product.id}
                    className="product"
                    desc={product.description}
                    img={product.images[0]}
                    rating={Math.trunc(product.rating)}
                    price={product.price}
                    title={product.title}
                  />
                ))
              : allProducts?.map((product) => (
                  <Product
                    
                    id={product.id}
                    className="product"
                    desc={product.description}
                    img={product.images[0]}
                    rating={Math.trunc(product.rating)}
                    price={product.price}
                    title={product.title}
                  />
                ))}
          </div>
       
    </motion.div>
  );
};

export default Home;
