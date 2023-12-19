import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getCategory } from "../Api/ProductController";
import { Button } from "antd";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategory(); // Assuming getCategory is an asynchronous function
        setCategories(categoriesData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleView = (id)=>{
    navigate(`/category/${id}`,{state : {categoryId : id}})
  }

  return (
    <div className="py-4 d-flex justify-content-center align-items-center">
      <div>
        <h2 className="mb-4">Categories</h2>
        {loading && <p>Loading categories...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <div className="d-flex flex-wrap">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="m-2"
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Button type="primary" onClick={()=>handleView(category.id)}>
                    View Products
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
