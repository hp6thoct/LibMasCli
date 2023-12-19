import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Product from "../Components/Product";
import { getBookByCategory } from "../Api/ProductController";

const ProductCategory = () => {
  const location = useLocation();
  const categoryId = location.state.categoryId;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        setLoading(true);
        const booksData = await getBookByCategory(categoryId); // Assuming getBookByCategory is an asynchronous function
        setBooks(booksData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [categoryId]); // Include categoryId in the dependency array to refetch books when categoryId changes
  const handleProductClick = (book) => {
    navigate(`/product/${book.name}`, { state: { book: book } });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "80vw" }}>
        <h2>Books in Category {categoryId}</h2>
        {loading && <p>Loading books...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {books.map((book) => (
              <div onClick={() => handleProductClick(book)}>
                <Product
                  imageUrl={book.image}
                  name={book.name}
                  price={book.fee}
                />
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
