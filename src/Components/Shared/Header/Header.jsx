/* eslint-disable react/prop-types */

import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";

export default function Header({ setActive }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData);
  }, []);

  const [baractive, setBarActive] = useState(false);

  const handleactive = () => {
    setBarActive(!baractive);
    setActive(!baractive); // Pass the updated state
    console.log(!baractive); // Log the new state
  };

  return (
    <div className={`flex flex-wrap sm:items-center sm:justify-around justify-between gap-1 mb-3 items-start p-3 ${isLoggedIn ? "sm:mt-0 mt-0" : "sm:mt-9 mt-3"}`}>
      <div className="flex gap-2 items-center p-2">
        <AiOutlineMenu className="text-2xl block sm:hidden font-extrabold" onClick={handleactive} />
        <Link to={`/`}>
          <h1 className="text-3xl md:text-4xl font-extrabold cursor-pointer">BlackMart.</h1>
        </Link>
      </div>
      
      <div className="hidden md:flex gap-4">
        <p className="text-md cursor-pointer">On Sale</p>
        <Link to={`/Categories`}>
        <p className="text-md cursor-pointer">Categories</p>
        </Link>
        <p className="text-md cursor-pointer"><a href="#NewArrivals">New Arrivals</a></p>
        <p className="text-md cursor-pointer"><a href="#Brands">Brands</a></p>
      </div>

      <div className='flex-grow bg-transparent w-min hidden items-center sm:bg-gray-100 sm:w-full md:w-[40rem] gap-5 md:flex rounded-full sm:items-center p-3 mt-4 md:mt-0'>
        <IoSearchOutline className="text-2xl sm:opacity-40" />
        <input 
          type="text" 
          placeholder='Search for product ...' 
          className="bg-transparent focus:outline-none w-full hidden sm:block"
        />
      </div>

      <div className="flex gap-4 mt-4 md:mt-0">
        <IoSearchOutline className="text-2xl block sm:hidden font-bold" />
        <Link to={`/Cart`}>
          <FiShoppingCart className="text-2xl md:text-3xl cursor-pointer" />
        </Link>
        <Link to={`/profile`}>
          <CgProfile className="text-2xl md:text-3xl cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
