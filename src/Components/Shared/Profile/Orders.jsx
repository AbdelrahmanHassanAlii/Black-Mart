import { useEffect, useState } from "react"
import GetUserOrders from "../../../Helper/Apis/Shared/Orders/GetUserOrders"
export default function Orders({userOrders}) {
  const [data,setData]=useState([])

  useEffect(()=>{
      const fetchdata=async()=>{ 
        const response=await GetUserOrders()
      console.log(response.data.order.orderItems)
      setData(response.data.order.orderItems)
    }
    fetchdata()
     
  },[])
  return (
    <div className="bg-white p-16 rounded-lg w-full">
          <h2 className="text-3xl font-extrabold text-start mb-6">Your Orders</h2>
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No orders found for this user</p>
          ) : (
            <div className="space-y-4 flex  flex-col w-96 gap-3 ">
              {data.map((order, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm flex flex-col hover:scale-105 duration-150 cursor-pointer">
                  <p className='font-bold mb-4 '> Order {index + 1}</p>
                  <div className='flex  gap-5'>
                  <img src={order.product.imgCover} alt="img"  className='w-32 h-32  rounded-2xl '/>
                  <div className='flex flex-col'>
                  <p>name: {order.product.name}</p>
                  <p>quantity: {order.quantity}</p>
                  <p>price: {order.product.price}</p>
                  <p>total: {`${order.quantity*order.product.price}`}</p>
                  <p>Date: {new Date().toLocaleString()}</p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  )
}
