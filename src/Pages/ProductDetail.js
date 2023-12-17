// ProductDetail.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import Review from "../Components/Review";
import WriteReview from "../Components/WriteReview";
import ResultModal from "../Components/ResultModal";
import { useUser } from "../Context/UserContext";
import { addToCart } from "../Api/CartController";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state.book;
  const [quantity, setQuantity] = useState(1);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, cart, saveCart } = useUser();
  const [guestModal, setGuestModal] = useState(false);

  const reviews = [
    { rating: 5, comment: "Great book!" },
    { rating: 4, comment: "Good value for money." },
    // Add more reviews as needed
  ];

  useEffect(() => {
    console.log("console log cart", cart);
  }, [cart]);
  useEffect(() => {
    // This will be called whenever your component re-renders
    // You can add conditions here to determine when to scroll to the top
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      setGuestModal(true);
    } else {
      const item = {
        book: book,
        quantity: quantity,
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

  return (
    <Container className="py-4">
      <Row>
        {/* Product Image and Quantity Section */}
        <Col md={6}>
          <Image src={book.image} alt={book.name} />
        </Col>

        {/* Product Information Section */}
        <Col md={6}>
          <h2>{book.name}</h2>
          <p className="text-muted">{book.des}</p>
          <p>
            <strong>Fee: ${book.fee}</strong>
          </p>
        </Col>
      </Row>

      <Form className="mt-3 d-flex align-items-end" onSubmit={handleAddToCart}>
        <Form.Group controlId="quantity" className="mr-3 mb-0">
          <Form.Label className="mb-0">Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add to Cart
        </Button>
      </Form>

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

      {/* Reviews Section */}
      <div className="mt-4">
        <WriteReview />
        <ListGroup>
          {reviews.map((review, index) => (
            <Review
              key={index}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default ProductDetail;
