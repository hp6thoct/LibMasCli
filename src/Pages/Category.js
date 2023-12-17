// Category.js
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Category = () => {
  // Dummy category data
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" },
    // Add more categories as needed
  ];

  return (
    <div className="py-4 d-flex justify-content-center align-items-center">
      <div>
        <h2 className="mb-4">Categories</h2>
        <div className="d-flex flex-wrap">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="m-2"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Link to={`/category/${category.id}`} className="btn btn-primary">
                  View Products
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
