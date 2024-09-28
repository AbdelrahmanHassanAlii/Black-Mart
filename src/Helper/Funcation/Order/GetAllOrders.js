
export default function GetAllOrders() {
const orders=JSON.parse(localStorage.getItem('Orders'))
console.log(orders)
  return (orders)
 
}
