import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";
import { getAllProducts } from "../../../Helper/Apis/Shared/Product/getAllProducts"; 
export default function Header({ setActive }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData);

    getAllCategories()
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    getAllProducts()
      .then((response) => {
        setProducts(response.data.products || []);
        console.log(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const [baractive, setBarActive] = useState(false);

  const handleactive = () => {
    setBarActive(!baractive);
    setActive(!baractive);
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

      <div className={`flex-grow relative bg-transparent items-center sm:bg-gray-100 sm:w-full md:w-[40rem] gap-5 md:flex rounded-full sm:items-center p-3 mt-4 md:mt-0 ${open ? "block" : "hidden"}`}>
  <IoSearchOutline className={`text-2xl sm:opacity-40 hidden sm:block`} />
  <input 
    type="text" 
    placeholder='Search for product ...' 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className={`bg-transparent focus:outline-none w-full sm:block ${open ? "block " : "hidden"}`}
  />
  {filteredProducts.length > 0 && (
    <div className="absolute top-full left-0 w-full mt-2 z-50">
      <ul className="bg-white border border-gray-200 rounded-md max-h-60 overflow-auto">
        {filteredProducts.map((product) => (
          <li key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
            <Link to={`/product/${product.id}`} className="flex items-center gap-3">
              <img 
                src={product.imgCover} 
                alt={product.name} 
                className="w-8 h-8 object-cover rounded-md"
              />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

      <div className="flex gap-4 mt-4 md:mt-0 ">
        <IoSearchOutline className={`text-2xl block sm:hidden font-bold`} onClick={() => { setOpen(!open) }} />
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
