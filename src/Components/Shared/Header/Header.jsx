import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import {Link} from 'react-router-dom'

export default function Header({setActive}) {
  const[baractive,setbaractive]=useState(false)
  const handleactive=()=>{
    setbaractive(!baractive)
    setActive(baractive)
    console.log(baractive)
  }
  return (
    <div className='flex flex-wrap sm:items-center sm:justify-around justify-between gap-1 sm:mt-9 mt-3 mb-3 items-start p-3'>
      <div className="flex  gap-2 items-center p-2">
      <AiOutlineMenu className="text-2xl block sm:hidden font-extrabold" onClick={handleactive}  />
      <Link to={`/`}>
      <h1 className="text-3xl md:text-4xl font-extrabold cursor-pointer ">BlackMart.</h1>
      </Link>
    </div>
    <select className="text-md p-1 w-full md:w-auto cursor-pointer sm:block hidden">
      <option className="bg-black text-white hover:bg-white">Shop</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
    </select>
    
    <div className="hidden md:flex gap-4">
      <p className="text-md cursor-pointer">
        On Sale</p>
      <p className="text-md cursor-pointer"> <a href="#NewArrivals">New Arrivals</a></p>
      <p className="text-md cursor-pointer" > <a href="#Brands">Brands</a></p>
    </div>
    
    <div className='flex-grow bg-transparent w-min hidden items-center  sm:bg-gray-100 sm:w-full md:w-[40rem] gap-5 md:flex rounded-full sm:items-center p-3 mt-4 md:mt-0'>
      <IoSearchOutline className="text-2xl sm:opacity-40" />
      <input 
        type="text" 
        placeholder='Search for product ...' 
        className="bg-transparent focus:outline-none w-full hidden sm:block"
      />
    </div>
    
    <div className="flex gap-4 mt-4 md:mt-0">
    <IoSearchOutline className="text-2xl block  sm:hidden font-bold" />
    <Link to={`/Cart`}>
      <FiShoppingCart className="text-2xl md:text-3xl cursor-pointer" />
      </Link>
      <CgProfile className="text-2xl md:text-3xl cursor-pointer" />
    </div>
  </div>
  )
}
