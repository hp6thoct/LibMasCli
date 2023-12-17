import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const ShippingStep = ({ onNext,  processShip }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Shipping Form Values:", values);
    processShip(values);
    onNext(); // Move to the next step
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <Form.Item
        label="Shipping Method"
        name="method"
        rules={[{ required: true, message: "Please select a shipping method" }]}
      >
        <Select placeholder="Select a shipping method">
          <Option value="GHTK">GHTK</Option>
          <Option value="GHST">GHST</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Shipping Address"
        name="shippingAddress"
        rules={[
          { required: true, message: "Please input the shipping address" },
        ]}
      >
        <Input.TextArea placeholder="Enter shipping address" />
      </Form.Item>

      <Form.Item
        label="Receiver Phone"
        name="receiverPhone"
        rules={[
          { required: true, message: "Please input the receiver phone number" },
        ]}
      >
        <Input placeholder="Enter receiver phone number" />
      </Form.Item>

      <Form.Item>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ShippingStep;
