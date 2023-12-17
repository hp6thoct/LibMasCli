import React, { useEffect, useState } from "react";
import { List, Typography, Button, Divider, Pagination } from "antd";
import ProductInCart from "../Components/ProductInCart";
import { useUser } from "../Context/UserContext";
import { deleteItem, getCart, updateCartItem } from "../Api/CartController";
import ResultModal from "../Components/ResultModal";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Cart = () => {
  const { cart, saveCart, user } = useUser();
  const [errorModal, setErrorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Set the number of items per page
  let contentModal = "!";
  const navigate = useNavigate();

  const handleQuantityChange = async (index, newQuantity) => {
    const res = await updateCartItem(
      cart.id,
      cart.items[index].id,
      newQuantity
    );

    if (res.status === 200 && res.data) {
      // If the API call is successful, update the local cart state
      saveCart(res.data);
      console.log("update item quantity successfully!");
    } else {
      console.log(
        "Failed to update item quantity. Non-200 status code:",
        res.status
      );
      setErrorModal(true);
      contentModal = "Update cart item quantity failed! Please try again!";
    }
  };

  const handleDelete = async (index) => {
    const res = await deleteItem(cart.id, cart.items[index].id);
    if (res.status === 200 && res.data) {
      // If the API call is successful, update the local cart state
      saveCart(res.data);
      console.log("Delete item quantity successfully!");
    } else {
      console.log(
        "Failed to delete item quantity. Non-200 status code:",
        res.status
      );
      setErrorModal(true);
      contentModal = "Delete cart item failed! Please try again!";
    }
  };

  const fetchCart = async () => {
    const res = await getCart(user.id);
    if (res.status === 200 && res.data) {
      saveCart(res.data);
      console.log("get cart successfully: ", res.data);
    } else {
      console.log("unable to get cart", res.status, res.data);
    }
  };

  useEffect(() => {
    console.log("console log cart", cart);
  }, [cart]);

  useEffect(() => {
    fetchCart();
    console.log(cart);
  }, []);

  const handleCheckout = () => {
    if (cart.totalItem) {
      navigate(`/checkout/${user.id}/${cart.id}`);
    } else {
      setErrorModal(true);
      contentModal = "Cart is empty! Please go buy something!";
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Shopping Cart</h2>

      <List
        itemLayout="horizontal"
        dataSource={cart.items.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        renderItem={(item, index) => (
          <List.Item>
            <ProductInCart
              book={item.book}
              quantity={item.quantity}
              onDelete={() => {
                handleDelete(index);
              }}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(index, newQuantity)
              }
            />
          </List.Item>
        )}
      />
      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={cart.items.length}
        onChange={handleChangePage}
        style={{ marginTop: "16px", textAlign: "right" }}
      />
      <Divider />
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <Text strong>Total Price: ${cart.total.toFixed(2) || 0}</Text>
      </div>

      <div style={{ textAlign: "right" }}>
        <Button type="primary" onClick={handleCheckout}>
          Place Order
        </Button>
      </div>

      <ResultModal
        visible={errorModal}
        onOk={() => {
          navigate("/");
        }}
        onCancel={() => setErrorModal(false)}
        title="Error Modal"
        content={contentModal}
        isSuccess={false}
      />
    </div>
  );
};

export default Cart;
