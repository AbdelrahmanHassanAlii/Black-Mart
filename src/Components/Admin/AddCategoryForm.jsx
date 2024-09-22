/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { addCategory } from "../../Helper/Apis/Admin/Category/addCategory";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";

export default function AddCategoryForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("img", category.img);

    const response = await addCategory(formData);
    console.log(response);
  };

  return (
    <div className={style.container}>
      <h2>Add Category</h2>
      <form>
        <div className={style.inputContainer}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={category.name}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={handleChange} />
        </div>
        {previewImage && (
          <div className="image-preview">
            <img
              src={previewImage}
              alt="Image Preview"
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
          </div>
        )}
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
