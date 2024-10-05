/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Signupoffer from "../Signupoffer/Signupoffer.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCartCard from "./ProductCartCard.jsx";
import { Link } from "react-router-dom";
import GetCart from "../../../Helper/Apis/User/CartAPis/GetCart.js";
import RemoveFromCart from "../../../Helper/Apis/User/CartAPis/RemoveFromCart.js";
import ClearCart from "../../../Helper/Apis/User/CartAPis/ClearCart.js";
import Swal from "sweetalert2";
export default function Cart() {
  const [data, setData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const userData = JSON.parse(localStorage.getItem("loginData"));
  const id = userData?.[0]?.Payload?.userId || null;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await GetCart();
      if (cartData && cartData.cart) {
        setData(cartData.cart.cartItems);
        setTotal(cartData.cart.totalPrice);
      }
    };
    
    fetchCartData();
  }, [isChange]);
  const ClearCartHandler = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ClearCart();
          setData([]);
          Swal.fire(
            'Deleted!',
            'Your cart has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      }
    });
  };
  

    useEffect(() => {
    if (data) {
      const subtotalValue = data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(subtotalValue);
    } else {
      setSubtotal(0);
    }
  }, [data]);

  const removeItem = async (productId) => {
    await RemoveFromCart(productId);
    const updatedCartData = await GetCart();
    if (updatedCartData && updatedCartData.cart) {
      setData(updatedCartData.cart.cartItems);
    }
  };

  const items = [
    { name: "Subtotal", value: total },
    { name: "Discount", value: data.length ? 40 : 0 },
    { name: "Delivery Fee", value: data.length ? 15 : 0 },
  ];

  const discount = items.find((item) => item.name === "Discount").value;
  const deliveryFee = items.find((item) => item.name === "Delivery Fee").value;
  const Total = subtotal - discount + deliveryFee;
  return (
    <div className="block">
      <Signupoffer />
      <Header />
      <div className="h-0.5 w-full bg-black opacity-20 mt-4 mb-4"></div>
      <div className="flex flex-col gap-8 p-5">
        <div className="w-full flex justify-between">
          <p className="text-5xl font-extrabold">YOUR CART</p>
          <div className={`bg-red-100 p-2 rounded-2xl cursor-pointer flex  items-center hover:bg-red-500 ${data.length === 0 ? "hidden" : ""}`}
           onClick={ClearCartHandler}>
            <span className="text-white font-semibold">Clear Cart</span>
          </div>
          </div>
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
            <div className="border sm:w-96 rounded-2xl p-10 h-[28rem] flex flex-col">
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
                <span>$ {Total}</span>
              </div>
              <Link to={id ? `/order/${id}` : "/sign"}>
                <div className="bg-black text-white p-4 justify-center items-center gap-6 rounded-full mt-6 flex cursor-pointer hover:opacity-75">
                  <span>{id ? "Go To Checkout" : "Sign In to Checkout"}</span>
                  <FaArrowRightLong className="text-2xl" />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-3xl font-bold">No items in cart!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
