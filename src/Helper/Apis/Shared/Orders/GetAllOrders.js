import axios from "axios"

const GetAllOrders =async () => {
    const response=await axios.get("http://localhost:3000/api/v1/order/allorder")
    
  return response
}

export default GetAllOrders
