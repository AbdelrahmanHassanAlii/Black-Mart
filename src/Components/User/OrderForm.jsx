import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function OrderForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const cartData = JSON.parse(localStorage.getItem("Cart"));

  const userName = loginData[0].Payload?.username || "Guest"; 
  const userEmail = loginData[0].Payload?.email || "";
  const userid=loginData[0].Payload?.userId;
  const handleSubmit = (e) => {
    e.preventDefault();

    // Updated validation regex
    const phoneRegex = /^\d{10,}$/; // Validate for at least 10 digits
    const cardRegex = /^\d{16}$/; // Validate for exactly 16 digits
    const cvvRegex = /^\d{3,4}$/; // Validate for 3 or 4 digits

    if (!phoneRegex.test(phoneNumber)) {
      Swal.fire({
        title: "Invalid Phone Number!",
        text: "Phone number must be at least 10 digits long.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (address.trim() === "") {
      Swal.fire({
        title: "Invalid Address!",
        text: "Address cannot be empty.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!cardRegex.test(cardNumber)) {
      Swal.fire({
        title: "Invalid Card Number!",
        text: "Card number must be exactly 16 digits long.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!cvvRegex.test(cvv)) {
      Swal.fire({
        title: "Invalid CVV!",
        text: "CVV must be 3 or 4 digits long.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to place this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, place it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate CVV check
        Swal.fire({
          title: "Checking CVV...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        setTimeout(() => {
          const newOrder = {
            userName,
            userEmail,
            phoneNumber,
            address,
            cardNumber,
            userid,
            cvv: "checked",
            cart: cartData,
            date: new Date().toISOString(),
          };

          // Retrieve existing orders from localStorage
          const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];
          // Add the new order to the existing orders
          existingOrders.push(newOrder);
          // Save the updated orders array back to localStorage
          localStorage.setItem("Orders", JSON.stringify(existingOrders));
          // Remove the cart after placing the order
          localStorage.removeItem("Cart");

          Swal.fire({
            title: "Order Submitted!",
            text: "Your order has been successfully placed.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });

          // Reset the input fields
          setPhoneNumber("");
          setAddress("");
          setCardNumber("");
          setCvv("");
        }, 2000); // Simulate a delay for checking the CVV
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Order Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text" // Change type to text to hide up/down buttons
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            style={{ 
              '-moz-appearance': 'textfield', // For Firefox
              '-webkit-appearance': 'none', // For Chrome, Safari, and Edge
            }}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            maxLength="4" // Limit input length to 4
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}
