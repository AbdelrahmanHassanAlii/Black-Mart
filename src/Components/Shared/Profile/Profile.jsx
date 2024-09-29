import  { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaHeart } from "react-icons/fa6";
export default function Profile() {
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
      <div className="flex flex-col sm:flex-row gap-10 pt-2 h-screen  ">
        <div className="bg-white p-8 rounded-lg border-r-2git w-96 mb-6">
          <h2 className="text-2xl font-bold  underline mb-6">Profile</h2>
          <div className="space-y-4 h-3/4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{loginData[0].Payload.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{loginData[0].Payload.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-lg font-semibold text-gray-900">{loginData[0].Payload.role}</p>
            </div>
          </div>
          <div className='w-full flex gap-4 justify-between'>
            <Link to={`/wishlist`} className='w-full'>
          <button className='mt-6 min-w-2/3 bg-blue-500 flex items-center  gap-3  text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200'>
            Wishlist
            <FaHeart  className='text-lg'/>
          </button>
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 w-2/3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Log Out
          </button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg border-l-2 w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
          {userOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found for this user</p>
          ) : (
            <div className="space-y-4 flex">
              {userOrders.map((order, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm flex flex-col">
                  <p className='font-bold '> Order {index + 1}</p>
                  <div className='flex  gap-5'>
                  <img src={order.cart[index].image} alt="img"  className='w-32  rounded-2xl '/>
                  <div className='flex flex-col'>
                  <p>Username: {order.userName}</p>
                  <p>Email: {order.userEmail}</p>
                  <p>Phone Number: {order.phoneNumber}</p>
                  <p>Address: {order.address}</p>
                  <p>Date: {new Date(order.date).toLocaleString()}</p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
