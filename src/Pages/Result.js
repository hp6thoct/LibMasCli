import React, { useEffect, useState } from "react";
import { Card, Button, Spin, Result as AntResult } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProduct } from "../Api/ProductController";
import ResultModal from "../Components/ResultModal";
import { useUser } from "../Context/UserContext";
import { addToCart } from "../Api/CartController";

const { Meta } = Card;

const Result = () => {
  const location = useLocation();
  const keyword = location.state.keyword
  const [searchResults, setSearchResults] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestModal, setGuestModal] = useState(false);
  const { user, cart, saveCart } = useUser();
  const navigate = useNavigate()

  useEffect(() => {
    searchProduct(keyword)
      .then((response) => {
        setSearchResults(response.data); // Assuming the response contains an array of products
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Function to handle adding a product to the cart
  const handleAddToCart = async (index) => {
    if (!user) {
        setGuestModal(true);
      } else {
        const item = {
          product: searchResults[index],
          quantity: 1,
          amount: 0,
        };
        console.log(item);
        const res = await addToCart(cart.id, item);
        console.log(res);
        if (res.status === 200 && res.data.totalItem !== 0) {
          saveCart(res.data);
          setSuccessModalVisible(true);
          setIsSuccess(true);
        } else {
          console.log("Failed to add to cart. Non-200 status code:", res.status);
          setSuccessModalVisible(true);
          setIsSuccess(false);
        }
      }
  };

  const handleGuestOk = () => {
    console.log("guest ok");
    navigate("/login");
  };


  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (searchResults.length === 0) {
    return <AntResult status="warning" title="No Results" subTitle={`No products found for "${keyword}"`} />;
  }

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      {searchResults.map((product, index) => (
        <Card
          key={product.id}
          hoverable
          style={{ width: 240, margin: "16px" }}
          cover={<img alt={product.name} src={product.image} />}
        >
          <Meta title={product.name} description={`$${product.price}`} />
          <Button type="primary" onClick={() => handleAddToCart(index)}>
            Add to Cart
          </Button>
        </Card>
      ))}
      {/*logged in state add to cart notification */}
      <ResultModal
        visible={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
        title="Result Modal"
        content={
          isSuccess
            ? "Add to cart successfully!"
            : "Failed to add to cart. Please try again."
        }
        isSuccess={isSuccess}
      />

      {/*Guest state add to cart notification */}
      <ResultModal
        visible={guestModal}
        onOk={handleGuestOk}
        onCancel={() => setGuestModal(false)}
        title="Guest Modal"
        content="Please log in"
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Result;
