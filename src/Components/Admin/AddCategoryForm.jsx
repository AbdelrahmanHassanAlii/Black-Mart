/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { addCategory } from "../../Helper/Apis/Admin/Category/addCategory";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";

import { SiNamecheap } from "react-icons/si";

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

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("img", category.img);

    try {
      const response = await addCategory(formData);
      console.log(response);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        backEndError: "An error occurred while adding the category.",
      }));
    }
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            placeholder="Upload Image"
            id="image"
            onChange={handleChange}
          />
          {errors.img && <span className={style.error}>{errors.img}</span>}
        </div>
        {previewImage && (
          <div className={style.previewImage}>
            <img src={previewImage} alt="Image Preview" style={{}} />
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
