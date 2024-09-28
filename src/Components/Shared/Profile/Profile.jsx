import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';

export default function Profile() {
  const [loginData, setLoginData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');
    const storedOrders = localStorage.getItem('Orders');
    console.log(JSON.parse(localStorage.getItem('Orders')))
    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
    }
   
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setOrders(parsedOrders);
      
    }
  }, []);
console.log(loginData)
console.log(orders)
  useEffect(() => {
    if (loginData && orders.length > 0) {
      const userId = loginData[0].Payload?.userId;
      console.log(userId)
      const filteredOrders = orders.filter(order => order.userid === userId); // Filter orders by user ID
      setUserOrders(filteredOrders); // Update state with user-specific orders
    }
  }, [loginData, orders]); // Dependency on loginData and orders

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
        // localStorage.removeItem('Cart');
        navigate('/login'); 
      }
    });
  };

  if (!loginData) {
    return <p className="text-center text-red-500">No user data found</p>;
  }

  return (
    <>
      <Header />
      <div className="flex gap-10 justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-6">
          <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
          <div className="space-y-4">
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
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Log Out
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
          {userOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found for this user</p>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm">
                  <p><strong>Order #{index + 1}</strong></p>
                  <p><strong>Username:</strong> {order.userName}</p>
                  <p><strong>Email:</strong> {order.userEmail}</p>
                  <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Card Number:</strong> {order.cardNumber}</p>
                  <p><strong>CVV:</strong> {order.cvv}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
