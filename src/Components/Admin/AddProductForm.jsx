/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addProduct } from '../../Helper/Apis/Admin/Product/addProduct.js';
import Header from '../Shared/Header/Header.jsx'
export default function AddProductForm() {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: "",
    category: "",
    subcategory: "",
    backEndError: "",
  });

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: null,
    category: "",
    subcategory: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgCover") {
      setProduct({
        ...product,
        imgCover: files[0],
      });
      // Set preview image
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    // Name validation
    if (!product.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }
    // Description validation
    if (!product.description) {
      validationErrors.description = "Description is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.description)) {
      validationErrors.description = "Description cannot contain only numbers";
      formIsValid = false;
    }
    // Brand validation
    if (!product.brand) {
      validationErrors.brand = "Brand is required";
      formIsValid = false;
    }
    // Price validation
    if (!product.price) {
      validationErrors.price = "Price is required";
      formIsValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
      validationErrors.price = "Price must be a valid number";
      formIsValid = false;
    }
    // Quantity validation
    if (!product.quantity) {
      validationErrors.quantity = "Quantity is required";
      formIsValid = false;
    } else if (!/^\d+$/.test(product.quantity)) {
      validationErrors.quantity = "Quantity must be a number";
      formIsValid = false;
    }
    // Image validation
    if (!product.imgCover) {
      validationErrors.imgCover = "Image is required";
      formIsValid = false;
    } else if (!product.imgCover.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      validationErrors.imgCover =
        "Please upload a valid image file (jpg, jpeg, png, gif)";
      formIsValid = false;
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // SweetAlert confirmation before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("brand", product.brand);
        formData.append("quantity", product.quantity);
        formData.append("price", product.price);
        formData.append("imgCover", product.imgCover);

        try {
          const response = await addProduct(formData);
          console.log(response);

          // SweetAlert success message
          Swal.fire({
            title: "Added!",
            text: "Product has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 198, 51)",
          });

          setProduct({
            name: "",
            description: "",
            price: "",
            quantity: "",
            brand: "",
            imgCover: null,
            category: "",
            subcategory: "",
          });
          setPreviewImage(null);
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while adding the product.",
          }));
        }
      }
    });
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <>
    <Header/>
    <div className="p-12">
      <div  className=" h-full flex   flex-col p-5 bg-gradient-to-tr from-slate-700 to-black text-white rounded-3xl ">
      <h2 className="text-3xl  font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className=" flex flex-col w-full   gap-4">
        <div className="">
          <label className="">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} required className="bg-slate-400 rounded-md p-1 flex  placeholder-white placeholder-opacity-75 text-black" placeholder="enter product name" />
        </div>
        {errors.name && <span>{errors.name}</span>}

        <div>
          <label htmlFor="description">Description</label>
          <textarea type="text" name="description" id="description" onChange={handleChange} required className=" bg-slate-400 rounded-md p-1  placeholder-white placeholder-opacity-75 flex" placeholder="Enter product description" />
        </div>
        {errors.description && <span>{errors.description}</span>}

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            required
            className="bg-slate-400 rounded-md p-1 flex placeholder-white placeholder-opacity-75"
            placeholder="Enter product price"
          />
      </div>
        {errors.price && <span>{errors.price}</span>}

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" id="quantity" onChange={handleChange} required  className="bg-slate-400 rounded-md  placeholder-white placeholder-opacity-75 p-1 flex"placeholder="Enter product Quantity"/>
        </div>
        {errors.quantity && <span>{errors.quantity}</span>}

        <div>
          <label htmlFor="brand">Brand</label>
          <input type="text" name="brand" id="brand" onChange={handleChange} required  className="bg-slate-400 rounded-md  placeholder-white placeholder-opacity-75 p-1 flex" placeholder="Enter product Brand" />
        </div>
        {errors.brand && <span>{errors.brand}</span>}

        <div className="image">
          <label htmlFor="imgCover">Image</label>
          <input type="file" name="imgCover" id="imgCover" onChange={handleChange} required  className="bg-slate-400 rounded-md p-1 flex"/>
          {previewImage && <img src={previewImage} alt="Preview" width="100" />}
        </div>
        {errors.imgCover && <span>{errors.imgCover}</span>}

        {errors.backEndError && <span>{errors.backEndError}</span>}

        <button type="submit" className="text-3xl font-bold bg-black text-white w-min pr-5 pl-5 pt-2 pb-2 rounded-3xl hover:opacity-70">Add</button>
      </form>
    </div>
    </div>
    </>
  );
}
