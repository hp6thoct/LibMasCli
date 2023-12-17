import React from "react";
import {
  Navbar,
  Nav,
  Container,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useState } from "react";

const Header = () => {
  const { user, logoutUser, cart } = useUser();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  // Function to handle click on account icon
  const handleAccountClick = () => {
    if (user) {
      // If user is logged in, log them out
      logoutUser();
      navigate('/')
    } else {
      // If user is not logged in, navigate to the login page
      navigate("/login");
    }
  };

  const handleSearch = () => {
    navigate(`/search/${keyword}`, { state: { keyword: keyword } });
  };

  // Function to handle click on cart icon
  const handleCartClick = () => {
    navigate(`/cart/${cart.id}`);
  };

  const handleOrderClick = ()=>{
    navigate('/order')
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        {/* Brand/logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://cdn2.vectorstock.com/i/1000x1000/26/91/online-shop-logo-template-icon-vector-30562691.jpg"
            alt="Online Shop Logo"
            height="40"
          />
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/category">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Search form */}
        <div className="ml-3 d-flex align-items-center">
          <FormControl
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            variant="outline-success"
            className="ml-2"
            onClick={handleSearch}
          >
            <FaSearch size={20} />
          </Button>
        </div>

        {/* Account and Cart icons */}

        {user ? (
          <div className="mx-2 d-flex ">
            <NavDropdown
              title={<FaUser className="icon mx-2" size={30} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                {" "}
                {/* Update this line */}
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleAccountClick}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
            <FaShoppingCart
              className="icon mx-2"
              size={30}
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            />
            <IoBagCheckOutline
              className="icon mx-2"
              size={30}
              onClick={handleOrderClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <NavDropdown title={<FaUser className="icon mx-2" size={30} />}>
            <NavDropdown.Item as={Link} to="/login">
              Login
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/signup">
              Sign Up
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
