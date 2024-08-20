/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { PaystackButton } from "react-paystack";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const publicKey = "your-paystack-public-key"; // Replace with your Paystack public key
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
    const total = cartItems.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotalPrice(total);
  }, []);

  const componentProps = {
    email: "test@test.com", // Replace with actual email, can be an input field
    amount: totalPrice * 100, // Paystack expects amount in kobo
    metadata: {
      name: "UserName", // Replace with actual user's name
      phone: "0000000000", // Replace with actual phone number
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Payment Successful!");
      localStorage.removeItem("cart"); // Clear cart after successful payment
    },
    onClose: () => alert("Payment closed!"),
  };

  return (
    <div className="mb-5">
      <h3>Total Amount to be paid: #{totalPrice}</h3>
      <PaystackButton {...componentProps} className="btn btn-primary" />
    </div>
  );
};

export default CheckoutForm;
