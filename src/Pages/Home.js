import React, { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import Product from "../Components/Product";
import Slider from "react-slick";
import {  useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProduct } from "../Api/ProductController";
import { useUser } from "../Context/UserContext";
import { getCart } from "../Api/CartController";

const Home = () => {
  const navigate = useNavigate();
  const { user,  cart, saveCart } = useUser();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res.data);
    } catch (e) {
      console.log("error fetching products", e);
    }
  };
  const getUserCart = async (userId) => {
    try {
      const res = await getCart(userId);
      saveCart(res.data);
    } catch (e) {
      console.log("error getting cart", e);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      if(user){
        await getUserCart(user.id);
      }
    };

    // Initial load
    loadData();
    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    console.log("products: ", products);
    console.log("user", user);
    console.log("cart", cart);
  }, [products, user, cart]);

  const featuredSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Settings for react-slick slider (Promotion Banner)
  const promotionSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust the speed as needed (milliseconds)
  };

  const handleProductClick = (book) => {
    navigate(`/product/${book.name}`, { state: { book: book } });
  };

  return (
    <>
      {/* Banner Section */}
      <div className="banner-section">
        <Carousel {...promotionSliderSettings}>
          <Carousel.Item>
            <img
              className="d-block w-50 mx-auto"
              src="https://m.media-amazon.com/images/I/71pv8TCWnxS._SY466_.jpg"
              alt="Hyouka Collection"
              style={{ objectFit: "contain", height: "100vh" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-50 mx-auto"
              src="https://m.media-amazon.com/images/I/817BpyzG6xL._SY466_.jpg"
              alt="Demon"
              style={{ objectFit: "contain", height: "100vh" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Featured Product Section */}
      <Container className="py-4">
        <h2 className="mb-4">Featured Product</h2>
        <Slider {...featuredSliderSettings}>
          {products.map((product) => (
            <div key={product.id}>
              {/* Pass the product id to the handleProductClick function */}
              <div onClick={() => handleProductClick(product)}>
                <Product
                  imageUrl={product.image}
                  name={product.name}
                  price={product.fee}
                />
              </div>
            </div>
          ))}
        </Slider>
      </Container>

      <div className="video-section">
        <video autoPlay loop muted className="w-100">
          <source
            src="https://mdbootstrap.com/img/video/animation-intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Home;
