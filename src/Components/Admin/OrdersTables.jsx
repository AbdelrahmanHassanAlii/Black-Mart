import { useEffect, useState } from "react";
import GetAllOrders from "../../Helper/Funcation/Order/GetAllOrders";
import style from "../../assets/CSS/Admin/OrderTables.module.css";
import { Link } from "react-router-dom";

export default function OrdersTables() {
  const [orders, setOrders] = useState([]);

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchedOrders = GetAllOrders();
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, []);

  // Return JSX to render the table
  return (
    <div className={style.ordertables}>
      <h2>Order List</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  {order.cart.map((item, idx) => (
                    <div key={idx}>
                      {/* <strong>{item.name}</strong> - {item.color} {item.size} -
                      Quantity: {item.quantity}, Price: ${item.price} */}
                      {parseInt(item.quantity) === 0
                        ? item.price
                        : (
                            parseInt(item.quantity) * parseInt(item.price)
                          ).toFixed(2)}
                      <br />
                      {/* <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", height: "50px" }}
                      /> */}
                    </div>
                  ))}
                </td>
                <td>
                  <Link
                    className={style.ShowButton}
                    to={`/admin/orders/${order.id}`}
                  >
                    Show
                  </Link>
                  {/* <button>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
