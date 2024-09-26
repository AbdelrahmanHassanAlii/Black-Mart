
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Signupoffer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData); 
  }, []);
    return (
        <div className={`bg-black text-white fixed top-0 w-full p-2 sm:p-3 ${isLoggedIn ? 'hidden' : 'block'}`}>
        <p className="text-xs sm:text-sm text-center font-thin opacity-90">
          Sign up and get 20% off your first order. 
          <Link to={`/Sign`}>
          <span className="underline font-bold cursor-pointer">Sign Up Now</span>
          </Link>
        </p>
      </div>
      
        )
}
