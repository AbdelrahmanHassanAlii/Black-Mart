import UpdateCategoryForm from "../../Components/Admin/UpdateCategoryForm";
import style from "../../assets/CSS/Admin/UpdateCategory.module.css";

export default function UpdateCategory() {
  return (
    <div className={style.UpdateCategoryPage}>
      <p className={style.Text}>Update Category Form</p>
      <UpdateCategoryForm />
    </div>
  );
}
