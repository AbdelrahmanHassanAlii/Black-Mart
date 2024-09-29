/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/SubCategoriesCard.module.css";

export default function SubCategoriesCard({ subCategory }) {
  console.log(subCategory);
  console.log(subCategory.img);

  return (
    <div className={style.subCategoryCard}>
      <Link to={`/subCategory/${subCategory.id}`}>
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
          <Link
            className={style.deleteBtn}
            to={`/admin/subCategories/delete/${subCategory.id}`}
          >
            {" "}
            Delete{" "}
          </Link>
        </div>
      </Link>
    </div>
  );
}
