import React from "react";
import { Typography, List, Space, Button } from "antd";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const { Text } = Typography;

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const order = location.state.order;

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  const handleReturnButtonClick = () => {
    // Navigate to the return book page
    navigate(`/checkout/${user.id}/${order.id}`, {
      state: { borrow: order, returnBook: true },
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Borrow Detail</h2>
      <div>
        <Text strong>Date: {formatDate(order.borrow_date)}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Day: {formatDate(order.borrow_day)}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Due: {formatDate(order.due)}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Status: {order.status} </Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Cart Items:</Text>
        <List
          itemLayout="horizontal"
          dataSource={order.cart.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.book.name}
                description={`Quantity: ${item.quantity}, Price: $${item.book.fee}`}
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Payment Method: {order.payment.paymentMethod}</Text>
      </div>
      <div style={{ marginTop: "16px" }}>
        <Text strong>Total: ${order.totalAmount.toFixed(2)}</Text>
      </div>
      <Space>
        <Button
          style={{ marginTop: "16px" }}
          type="primary"
          onClick={handleReturnButtonClick}
          disabled={order.status !== "borrow"}
        >
          {order.status === "return" ? "Returned" : "Return"}
        </Button>
      </Space>
    </div>
  );
};

export default OrderDetail;
