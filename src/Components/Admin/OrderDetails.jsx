import { useEffect, useState } from "react";
import { getOrderByID } from "../../Helper/Funcation/Order/GetOrderByID";
import { useParams } from "react-router-dom";
import style from "../../assets/CSS/Admin/OrderDetails.module.css"; // Import the CSS module

export default function OrderDetails() {
  const [orderData, setOrderData] = useState(null); // Initialize as null to handle loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrderByID(id);

      if (response && response.length > 0) {
        setOrderData(response[0]); // Set the first order object from the array
      }
    };
    fetchOrder();
  }, [id]);

  if (!orderData) {
    return <div>Loading...</div>; // Display loading state until the order is fetched
  }

  return (
    <div className={style.orderDetails}>
      <h1 className={style.heading}>Order Details</h1>
      <div className={style.orderInfo}>
        <p>
          <strong>User Name:</strong> {orderData.userName}
        </p>
        <p>
          <strong>Email:</strong> {orderData.userEmail}
        </p>
        <p>
          <strong>Phone Number:</strong> {orderData.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {orderData.address}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(orderData.date).toLocaleDateString()}
        </p>
      </div>

      <h2 className={style.subheading}>Items</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData.cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.itemImage}
                />
                  </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
