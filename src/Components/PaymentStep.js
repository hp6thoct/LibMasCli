import React from 'react';
import { Form, Select, Button, InputNumber, Descriptions } from 'antd';

const { Option } = Select;

const PaymentStep = ({ onNext, onPrev, processPayment, fine, returnBook }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Payment Form Values:', values);
    processPayment(values);
    onNext(); // Move to the next step
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: '400px', margin: 'auto' }}
    >
      <Form.Item
        label="Payment Method"
        name="paymentMethod"
        rules={[{ required: true, message: 'Please select a payment method' }]}
      >
        <Select placeholder="Select a payment method">
          <Option value="Cash">Payment by Cash</Option>
          <Option value="Paypal">Payment via Paypal</Option>
        </Select>
      </Form.Item>

      {returnBook && (
        <Descriptions title="Fine" bordered style={{margin: '0 auto' }}>
          <Descriptions.Item label="Fine">{fine.content}</Descriptions.Item>
        </Descriptions>
      )}

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' , marginTop: '30px'}}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          <Button onClick={onPrev}>Previous</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PaymentStep;
