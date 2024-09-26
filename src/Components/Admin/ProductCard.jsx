/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/ProductCard.module.css";
import { deleteProduct } from "../../Helper/Apis/Admin/Product/deleteProduct";
import Swal from "sweetalert2";

export default function ProductCard({ product }) {
  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(productId);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Product deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          // Optionally, you might want to refresh the list of products or redirect the user.
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className={style.ProductCard}>
      <div className="image">
        <img src={product.imgCover} alt={product.name} />
      </div>

      <div className={style.info}>
        <h1 className={style.name}>{product.name}</h1>
        <p className={style.description}>{product.description}</p>
      </div>

      <div className={style.actions}>
        <Link className={style.view} to={`/product/${product._id}`}>
          View
        </Link>
        <Link
          className={style.delete}
          onClick={(e) => {
            e.preventDefault();
            handleDelete(product._id);
          }}
        >
          Delete
        </Link>
        <Link className={style.edit} to={`/admin/products/edit/${product._id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
}
