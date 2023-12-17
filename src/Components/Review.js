// Review.js
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Review = ({ rating, comment }) => {
  return (
    <ListGroup.Item>
      <Card>
        <Card.Body>
          <Card.Title>{`Rating: ${rating}/5`}</Card.Title>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};

export default Review;
