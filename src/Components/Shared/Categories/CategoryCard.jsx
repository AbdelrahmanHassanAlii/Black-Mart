/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../../assets/CSS/Shared/CategoryCard.module.css";
import { deleteCategory } from "../../../Helper/Apis/Admin/Category/deleteCategory";
import Swal from "sweetalert2"; // Import SweetAlert

export default function CategoryCard({ image, name, id }) {
  const handleUpdate = () => {
    // handle update logic
  };

  const handleDelete = () => {
    // SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the category "${name}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#299fff",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteCategoryResponse = await deleteCategory(id);
          if (deleteCategoryResponse) {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete category.", "error");
        }
      }
    });
  };

  return (
    <div className={style.categoryCard}>
      <img className={style.image} src={image} alt={name} />
      <p className={style.name}>{name}</p>
      <div className={style.buttonsContainer}>
        <button
          className={`${style.button} ${style.updateButton}`}
          onClick={handleUpdate}
        >
          <Link to={`/admin/update-category/${id}`}>Update</Link>
        </button>
        <button
          className={`${style.button} ${style.deleteButton}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
