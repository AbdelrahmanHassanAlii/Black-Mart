import  { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaHeart } from "react-icons/fa6";
import ProfileNavBar from './ProfileNavBar';
import Prof from './Prof';
import Wishlist from './wishlist/Wishlist.jsx';
import Orders from './Orders.jsx';
export default function Profile() {
  const [state,setState]  = useState("profile")
  const [loginData, setLoginData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');
    const storedOrders = localStorage.getItem('Orders');
    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
    }

    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setOrders(parsedOrders);
      
    }
  }, []);
  useEffect(() => {
    if (loginData && orders.length > 0) {
      const userId = loginData[0].Payload?.userId;
      const filteredOrders = orders.filter(order => order.userid === userId);
      setUserOrders(filteredOrders);
    }
  }, [loginData, orders]); 

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('loginData');
        localStorage.removeItem('filters');
        localStorage.removeItem('useremail');
        navigate('/login'); 
      }
    });
  };
  useEffect(() => {
    console.log(state)
  }, [state])

  if (!loginData) {
    return(<>
      <Header />
      <p className="text-center text-2xl text-red-500">
        No user data found
        <Link to="/sign" >
        <span className='text-black ml-5  underline text-md'>click here to join us!</span>
        </Link>
        </p>
      <Footer />
</>  )}

  return (
    <>
      <Header />
      <div className='flex p-8 pt-0 gap-3 '>
          <ProfileNavBar name={loginData[0]?.Payload?.username} setState={setState} logout={handleLogout} />
          {state === "profile" ? (
    <Prof  name={loginData[0]?.Payload?.username}  email={loginData[0]?.Payload?.email} role={loginData[0]?.Payload?.role} />
  ) : state === "Wishlist" ? (
    <Wishlist/>
  ) : state === "Orders" ? (
    <Orders userOrders={userOrders}/>
  ) : null}
      <div>

      </div>
      </div>
      <Footer />
    </>
  );
}
