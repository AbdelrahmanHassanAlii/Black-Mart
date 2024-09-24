import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Signupoffer from "../Signupoffer/Signupoffer.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCartCard from "./ProductCartCard.jsx";

export default function Cart() {
  const [data, setData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart data from localStorage
  useEffect(() => {
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      setData(parsedData);
    }
  }, [data]);

  const removeItem = (productId) => {
    const updatedCartData = data.filter((product) => product.id !== productId);
    setData(updatedCartData); // Update state
    localStorage.setItem("Cart", JSON.stringify(updatedCartData)); // Update localStorage
  };

  // Update subtotal whenever the cart data changes
  useEffect(() => {
    if (data.length > 0) {
      const subtotalValue = data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(subtotalValue);
    } else {
      setSubtotal(0);
    }
  }, [data]);

  // Function to remove item from cart
 
  // Conditionally apply discount and delivery fee only if there are items in the cart
  const items = [
    { name: "Subtotal", value: subtotal },
    { name: "Discount", value: data.length > 0 ? 40 : 0 },
    { name: "Delivery Fee", value: data.length > 0 ? 15 : 0 },
  ];

  const discount = items.find((item) => item.name === "Discount").value;
  const deliveryFee = items.find((item) => item.name === "Delivery Fee").value;
  const total = subtotal - discount + deliveryFee;
  console.log(data)
  return (
    <div>
      <Signupoffer />
      <Header />
      <div className="h-0.5 w-full bg-black opacity-20 mt-4 mb-4"></div>
      <div className="flex flex-col gap-8 p-5">
        <p className="text-5xl font-extrabold">YOUR CART</p>
        <div className="flex flex-col sm:flex-row justify-evenly">
          <div className="flex flex-col items-center">
            {/* Pass removeItem as a prop to ProductCartCard */}
            <ProductCartCard cartData={data} removeItem={removeItem} />
          </div>
          <div className={` border sm:w-96 rounded-2xl p-10 h-[28rem] ${data[0]?"flex flex-col":"hidden"}`}>
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
            <div className="bg-black text-white p-4 justify-center items-center gap-6 rounded-full mt-6 flex cursor-pointer hover:opacity-75">
              <span>Go To Checkout</span>
              <FaArrowRightLong className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
