import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Profile() {
  const [loginData, setLoginData] = useState(null);
  const navigate = useNavigate(); // To redirect the user after logout

  // Retrieve login data from local storage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      setLoginData(JSON.parse(storedData));
    }
  }, []);

  // Log out function to clear local storage and redirect
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
        navigate('/login'); 
      }
    })
  };

  if (!loginData) {
    return <p className="text-center text-red-500">No user data found</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
    </div>
  );
}


