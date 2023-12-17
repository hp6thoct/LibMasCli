import React, { useEffect, useState } from "react";
import { List, Typography, Button, Space } from "antd";
import { getUserOrder } from "../Api/OrderController";
import { useUser } from "../Context/UserContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Order = () => {
  const { user } = useUser();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOrder(user)
      .then((response) => {
        setUserOrders(response.data); // Assuming the response contains an array of user orders
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.id]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  const handleViewOrder = (order) => {
    // Navigate to the order detail page with state
    navigate(`/order/${order.id}`, { state: { order: order } });
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={userOrders}
          renderItem={(order) => (
            <List.Item style={{ padding: "16px" }}>
              <List.Item.Meta
                title={`Order Date: ${formatDate(order.orderDate)}`}
                description={`Total: $${order.totalAmount.toFixed(2)}`}
              />
              <Space>
                <Button type="primary" onClick={() => handleViewOrder(order)}>
                  View
                </Button>
              </Space>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Order;
