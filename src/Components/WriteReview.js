import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Review = ({ onSubmit }) => {
  const [rating, setRating] = useState(5); // Default rating value
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if the comment is not empty
    if (comment.trim() === "") {
      setShowAlert(true);
      return;
    }

    // Submit the review
    onSubmit({ rating, comment });

    // Clear the form
    setRating(5);
    setComment("");
    setShowAlert(false);
  };

  return (
    <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
      <h5>Your Review</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={handleRatingChange}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Review
        </Button>

        {/* Display an alert if the comment is empty */}
        {showAlert && (
          <Alert variant="danger" className="mt-2">
            Please enter a comment.
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Review;
