import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <div className='flex flex-wrap sm:items-center sm:justify-around justify-between gap-4 sm:mt-10 mt-4 items-end p-3'>
    <h1 className="text-3xl md:text-5xl font-extrabold cursor-pointer">SHOP.CO</h1>
    
    <select className="text-md p-2 w-full md:w-auto cursor-pointer sm:block hidden">
      <option className="bg-black text-white hover:bg-white">Shop</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
      <option className="bg-black text-white">Categories</option>
    </select>
    
    <div className="hidden md:flex gap-4">
      <p className="text-md cursor-pointer">On Sale</p>
      <p className="text-md cursor-pointer">New Arrivals</p>
      <p className="text-md cursor-pointer">Brands</p>
    </div>
    
    <div className='flex-grow bg-transparent w-min hidden  sm:bg-gray-100 sm:w-full md:w-[40rem] gap-5 md:flex rounded-full sm:items-center p-3 mt-4 md:mt-0'>
      <IoSearchOutline className="text-2xl sm:opacity-40" />
      <input 
        type="text" 
        placeholder='Search for product ...' 
        className="bg-transparent focus:outline-none w-full hidden sm:block"
      />
    </div>
    
    <div className="flex gap-4 mt-4 md:mt-0">
    <IoSearchOutline className="text-2xl block  sm:hidden font-bold" />
      <FiShoppingCart className="text-2xl md:text-3xl cursor-pointer" />
      <CgProfile className="text-2xl md:text-3xl cursor-pointer" />
    </div>
  </div>
  )
}
