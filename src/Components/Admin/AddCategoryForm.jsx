/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { addCategory } from "../../Helper/Apis/Admin/Category/addCategory";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import Swal from "sweetalert2"; // Import sweetalert2
import { FaCloudUploadAlt } from "react-icons/fa";

export default function AddCategoryForm() {
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

    // Image validation
    if (!category.img) {
      validationErrors.img = "Image is required";
      formIsValid = false;
    } else if (!category.img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      validationErrors.img =
        "Please upload a valid image file (jpg, jpeg, png, gif)";
      formIsValid = false;
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
      text: "Do you want to add this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", category.name);
        formData.append("img", category.img);

        try {
          const response = await addCategory(formData);
          console.log(response);

          // SweetAlert success message
          Swal.fire({
            title: "Added!",
            text: "Category has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 198, 51)",
          });

          setCategory({
            name: "",
            img: null,
          });
          setPreviewImage(null);
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while adding the category.",
          }));
        }
      }
    });
  };

  return (
    <div className={style.AddCategoryForm}>
      <h2 className={`${style.formTitle}`}>Add Category</h2>
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
              <FaCloudUploadAlt className={style.imageIcon} />
            </div>
            <div className={style.text}>
              <p>Upload Image</p>
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
            <img src={previewImage} alt="Image Preview" />
          </div>
        )}

        <button className="add-btn" type="submit">
          Add Category
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>
    </div>
  );
}
