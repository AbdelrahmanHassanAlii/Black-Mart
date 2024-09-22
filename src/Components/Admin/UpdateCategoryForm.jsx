/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificCategory } from "../../Helper/Apis/Shared/Category/getSpecificCategory";
import { updateCategory } from "../../Helper/Apis/Admin/Category/updateCategory";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import Swal from "sweetalert2";
import { RiFileCloudLine } from "react-icons/ri";

export default function UpdateCategoryForm() {
  const { id } = useParams();

  const [errors, setErrors] = useState({
    name: "",
    img: "",
    backEndError: "",
  });

  const [category, setCategory] = useState({
    name: "",
    img: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const categoryData = await getSpecificCategory(id);
      setCategory({
        name: categoryData.data.category.name,
        img: categoryData.data.category.img,
      });
      setPreviewImage(categoryData.data.category.img);
    };
    getCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setCategory({
        ...category,
        img: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    // Name validation
    if (!category.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(category.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }

    // Image validation (optional: only if user uploads a new image)
    if (category.img && typeof category.img === "object") {
      if (!category.img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        validationErrors.img =
          "Please upload a valid image file (jpg, jpeg, png, gif)";
        formIsValid = false;
      }
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // SweetAlert confirmation before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", category.name);
        if (category.img && typeof category.img === "object") {
          formData.append("img", category.img); // Append only if it's a file
        }

        try {
          const response = await updateCategory(id, formData);
          console.log(response);

          // SweetAlert success message
          Swal.fire({
            title: "Updated!",
            text: "Category has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 198, 51)",
          });

          setPreviewImage(null);
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while updating the category.",
          }));
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={`${style.formTitle}`}>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <label htmlFor="name">Name</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <SiNamecheap className={style.icon} />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Category Name"
              onChange={handleChange}
              value={category.name}
            />
          </div>
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>

        <div className={style.inputContainer}>
          <label className={style.customUpload} htmlFor="file">
            <div className={style.icon}>
              <RiFileCloudLine className={style.imageIcon} />
            </div>
            <div className={style.text}>
              <p>Upload New Image</p>
            </div>
            <input
              className={style.fileInput}
              type="file"
              id="file"
              name="image"
              onChange={handleChange}
            />
          </label>
          {errors.img && <span className={style.error}>{errors.img}</span>}
        </div>

        {previewImage && (
          <div className={style.previewImage}>
            <img src={previewImage || "/no-image.png"} alt="Image Preview" />
          </div>
        )}

        <button className="add-btn" type="submit">
          Update Category
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>
    </div>
  );
}
