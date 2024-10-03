export default function Orders({userOrders}) {
  return (
    <div className="bg-white p-16 rounded-lg w-full">
          <h2 className="text-3xl font-extrabold text-start mb-6">Your Orders</h2>
          {userOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found for this user</p>
          ) : (
            <div className="space-y-4 flex  hover:scale-105 duration-150 cursor-pointer">
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
  )
}
