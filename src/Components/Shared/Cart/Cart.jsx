import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Signupoffer from "../Signupoffer/Signupoffer.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCartCard from "./ProductCartCard.jsx";
import { Link } from "react-router-dom";
export default function Cart() {
  const [data, setData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const userData = JSON.parse(localStorage.getItem("loginData"));
  const id = userData?.[0]?.Payload?.userId || null;
  console.log("userid:", id);

  useEffect(() => {
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      console.log(parsedData);
      if (id === null) {
        const filteredData = parsedData.filter((item) => item.userid === null);
        console.log(filteredData);
        setData(filteredData);
      } else {
        const filteredData = parsedData.filter((item) => item.userid === id);
        console.log(filteredData);
        setData(filteredData);
      }
    } else {
      console.log("No cart data found in local storage.");
    }
  }, [isChange, id]);

  useEffect(() => {
    const clearGuestCart = () => {
      const cartData = JSON.parse(localStorage.getItem("Cart"));
      if (cartData) {
        const updatedCartData = cartData.filter((item) => item.userid !== null);
        localStorage.setItem("Cart", JSON.stringify(updatedCartData));
      }
    };

    if (id !== null) {
      clearGuestCart();
    }
  }, [id]);

  // Remove item from cart
  const removeItem = (productId) => {
    if (localStorage.getItem("Cart")) {
      const updatedCartData = data.filter(
        (product) => product.id !== productId
      );
      setData(updatedCartData);
      localStorage.setItem("Cart", JSON.stringify(updatedCartData));
    }
  };

  // Calculate subtotal
  useEffect(() => {
    if (data.length > 0) {
      const subtotalValue = data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      console.log("subtotal", subtotalValue);
      setSubtotal(subtotalValue);
    } else {
      setSubtotal(0);
    }
  }, [data]);

  // Calculate order summary items
  const items = [
    { name: "Subtotal", value: subtotal },
    { name: "Discount", value: data.length > 0 ? 40 : 0 },
    { name: "Delivery Fee", value: data.length > 0 ? 15 : 0 },
  ];

  const discount = items.find((item) => item.name === "Discount").value;
  const deliveryFee = items.find((item) => item.name === "Delivery Fee").value;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="block">
      <Signupoffer />
      <Header />
      <div className="h-0.5 w-full bg-black opacity-20 mt-4 mb-4"></div>
      <div className="flex flex-col gap-8 p-5">
        <p className="text-5xl font-extrabold">YOUR CART</p>

        {/* Conditional rendering based on cart data */}
        {data.length > 0 ? (
          <div className="flex flex-col sm:flex-row justify-evenly">
            <div className="flex flex-col items-center">
              <ProductCartCard
                data={data}
                removeItem={removeItem}
                setIsChange={setIsChange}
                isChange={isChange}
              />
            </div>
            <div
              className={`border sm:w-96 rounded-2xl p-10 h-[28rem] flex flex-col`}
            >
              <p className="text-xl font-bold mb-10">Order Summary</p>
              <ul className="flex flex-col gap-6">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between text-md">
                    <span className="opacity-70">{item.name}</span>
                    <span
                      className={`font-bold text-xl ${
                        item.name === "Discount" ? "text-red-100" : "text-black"
                      }`}
                    >
                      $ {item.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4"></div>
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span>$ {total}</span>
              </div>
              {/* Correctly interpolating user ID for checkout route */}
              <Link to={id ? `/order/${id}` : "/sign"}>
                <div className="bg-black text-white p-4 justify-center items-center gap-6 rounded-full mt-6 flex cursor-pointer hover:opacity-75">
                  <span>{id ? "Go To Checkout" : "Sign In to Checkout"}</span>
                  <FaArrowRightLong className="text-2xl" />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-3xl font-bold">No items in cart!</p> // Message when cart is empty
        )}
      </div>
      <Footer />
    </div>
  );
}
