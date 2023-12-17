import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import ShippingStep from "../Components/ShippingStep";
import PaymentStep from "../Components/PaymentStep";
import ConfirmStep from "../Components/ConfirmStep";
import {
  calculatePayment,
  calculateReturnPayment,
  calculateShip,
  confirmOrder,
  confirmReturn,
  fineCalculate,
} from "../Api/OrderController";
import ResultModal from "../Components/ResultModal";
import { useUser } from "../Context/UserContext";
import { useLocation } from "react-router-dom";

const { Step } = Steps;

const Checkout = () => {
  const location = useLocation();
  const { cart, user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [errorModal, setErrorModal] = useState(false);
  const [fine, setFine] = useState(0);
  const returnBook = location.state.returnBook;
  const borrow = location.state.borrow;
  let contentModal = "!!!";

  useEffect(() => {
    console.log("shipping data", shippingData);
    console.log("payment data", paymentData);
    console.log("fine", fine);
    console.log("borrow", borrow);
    console.log(returnBook);
  }, [shippingData, paymentData, fine, borrow]);

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleShippingNext = async () => {
    console.log(shippingData);
    setCurrentStep(currentStep + 1);
  };

  const handlePaymentNext = async () => {
    setCurrentStep(currentStep + 1);
  };

  const processPayment = async (payment) => {
    if (!returnBook) {
      const input = {
        cart: cart,
        shipping: shippingData,
        payment: payment,
      };
      const res = await calculatePayment(input);
      if (res.status === 200 && res.data) {
        console.log("process payment successfully", res.data);
        setPaymentData(res.data);
      } else {
        contentModal = "Can't process payment! Please try again!";
        setErrorModal(true);
        console.log(res.status);
      }
    } else {
      const input = {
        fine: fine,
        shipping: shippingData,
        payment: payment,
      };
      const res = await calculateReturnPayment(input);
      if (res.status === 200 && res.data) {
        console.log("process payment successfully", res.data);
        setPaymentData(res.data);
      } else {
        contentModal = "Can't process payment! Please try again!";
        setErrorModal(true);
        console.log(res.status);
      }
    }
  };

  const processShip = async (input) => {
    const res = await calculateShip(input);
    if (res.status === 200 && res.data) {
      setShippingData(res.data);
      console.log("get shipping feee successfully", res.data);
    } else {
      contentModal = "Can't get shipping fee! Please try again!";
      setErrorModal(true);
      console.log(res.status);
    }
    if (returnBook) {
      const res = await fineCalculate(borrow);
      setFine(res.data);
    }
  };

  const confirmBill = async () => {
    try {
      const data = {
        cart: cart,
        reader: user,
        shipping: shippingData,
        payment: paymentData,
        borrow_day: 7,
        total_amount: paymentData.amount,
      };
      const res = await confirmOrder(data);
      if (res.status === 200 && res.data) {
        setShippingData();
        setPaymentData();
        console.log("Borrow successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnBill = async () => {
    const data = {
      borrow: borrow,
      shipping: shippingData,
      payment: paymentData,
      fine: fine,
      reader: user,
    };
    const res = await confirmReturn(data);
    if (res.status === 200 && res.data) {
      setShippingData();
      setPaymentData();
      setFine(0);
      console.log("Return successfully");
    } else {
      console.log(res);
    }
  };

  const handleFinish = async () => {
    //setCurrentStep(currentStep+1)
  };

  const steps = [
    {
      title: "Shipping",
      content: (
        <ShippingStep
          processShip={processShip}
          onNext={handleShippingNext}
          setShippingData={setShippingData}
        />
      ),
    },
    {
      title: "Choose Payment",
      content: (
        <PaymentStep
          onNext={handlePaymentNext}
          onPrev={handlePrev}
          processPayment={processPayment}
          setPaymentData={setPaymentData}
          fine={fine}
          returnBook={returnBook}
        />
      ),
    },
    {
      title: "Confirm Order",
      content: (
        <ConfirmStep
          shippingData={shippingData}
          paymentData={paymentData}
          onPrev={handlePrev}
          onFinish={handleFinish}
          confirmBill={!returnBook ? confirmBill : returnBill}
          setCurrentStep={setCurrentStep}
          cart={cart}
          borrow={borrow}
          fine={fine}
          returnBook={returnBook}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "50vh" }}>
      <Steps current={currentStep} size="medium">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <div style={{ marginTop: "16px" }}>
        {steps[currentStep] && (
          <div style={{ marginTop: "16px" }}>{steps[currentStep].content}</div>
        )}
      </div>
      <ResultModal
        visible={errorModal}
        onOk={() => setErrorModal(false)}
        onCancel={() => setErrorModal(false)}
        title="Error Modal"
        content={contentModal}
        isSuccess={false}
      />
    </div>
  );
};

export default Checkout;
