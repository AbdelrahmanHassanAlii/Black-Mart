/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/SubCategoriesCard.module.css";
import { deleteSubCategory } from "./../../Helper/Apis/Admin/SubCategory/deleteSub";
import Swal from "sweetalert2";

export default function SubCategoriesCard({ subCategory }) {
  console.log(subCategory);
  console.log(subCategory.img);

  return (
    <div className={style.subCategoryCard}>
      <Link to={`/admin/subCategories`}>
        <img src={subCategory.img} alt={subCategory.name} />

        <p className={style.subCategoryName}>{subCategory.name}</p>
        <div className={style.subCategoryBtns}>
          <Link
            className={style.editBtn}
            to={`/admin/subCategories/edit/${subCategory._id}`}
          >
            {" "}
            Edit{" "}
          </Link>
          {/* <Link
            className={style.deleteBtn}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteSubCategory(subCategory.id);
                }
              });
            }}
          >
            {" "}
            Delete{" "}
          </Link> */}
        </div>
      </Link>
    </div>
  );
}
