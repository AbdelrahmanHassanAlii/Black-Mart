/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { addCategory } from "../../Helper/Apis/Admin/Category/addCategory";

export default function AddCategoryForm() {
  const [category, setCategory] = useState({
    name: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCategory({
        ...category,
        img: files[0], 
      });
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
    <div className="addCategoryForm">
      <h2>Add Category</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
        </div>
        <div className="image">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
