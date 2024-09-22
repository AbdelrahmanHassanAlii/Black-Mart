/* eslint-disable no-unused-vars */
import  { useState } from "react";
import {addProduct} from '../../Helper/Apis/Admin/Product/addProduct.js'

export default function AddProductForm() {
  const [product, setProduct] = useState({
    name: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({
        ...product,
        img: files[0], 
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("img", product.img); 

    const response = await addProduct(formData);
    console.log(response);
  };

  return (
    <div className="addProductForm">
      <h2>Add Product</h2>
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
