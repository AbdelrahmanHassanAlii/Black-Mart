import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addProduct } from '../../Helper/Apis/Admin/Product/addProduct.js';
import Header from '../Shared/Header/Header.jsx';
import { getAllCategories } from '../../Helper/Apis/Shared/Category/getAllCategories.js';
import { getAllSubCategories } from "../../Helper/Apis/Shared/SubCategory/getAllSub.js";

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: null,
    category: "",
    subcategory: "",
    backEndError: "",
  });
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);
  
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const response = await getAllSubCategories();
        setSubCategories(response);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    getSubCategories();
  }, []);

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
      validationErrors.imgCover = "Please upload a valid image file (jpg, jpeg, png, gif)";
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
        formData.append("category", product.category);
        formData.append("subCategory", product.subcategory);
        formData.append("imgCover", product.imgCover);

        try {
          const response = await addProduct(formData);
          console.log(response);

          Swal.fire({
            title: "Added!",
            text: "Product has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 198, 51)",
          });

          // Reset the form and preview
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

  return (
    <>
      <Header />
      <div className="p-12">
        <div className="h-full flex flex-col p-5 bg-gradient-to-tr from-slate-700 to-black text-white rounded-3xl">
          <h2 className="text-3xl font-bold mb-6">Add Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div>
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                onChange={handleChange} 
                required 
                className="bg-slate-400 rounded-md p-1 flex placeholder-white placeholder-opacity-75" 
                placeholder="Enter product name" 
              />
            </div>
            {errors.name && <span>{errors.name}</span>}

            <div>
              <label>Description</label>
              <textarea 
                type="text" 
                name="description" 
                id="description" 
                onChange={handleChange} 
                required 
                className="bg-slate-400 rounded-md p-1 placeholder-white placeholder-opacity-75 flex" 
                placeholder="Enter product description" 
              />
            </div>
            {errors.description && <span>{errors.description}</span>}

            <div>
              <label>Price</label>
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
              <label>Quantity</label>
              <input 
                type="text" 
                name="quantity" 
                id="quantity" 
                onChange={handleChange} 
                required 
                className="bg-slate-400 rounded-md p-1 flex placeholder-white placeholder-opacity-75" 
                placeholder="Enter product quantity" 
              />
            </div>
            {errors.quantity && <span>{errors.quantity}</span>}

            <div>
              <label>Brand</label>
              <input 
                type="text" 
                name="brand" 
                id="brand" 
                onChange={handleChange} 
                required 
                className="bg-slate-400 rounded-md p-1 flex placeholder-white placeholder-opacity-75" 
                placeholder="Enter product brand" 
              />
            </div>
            {errors.brand && <span>{errors.brand}</span>}

            <div>
              <label>Category</label>
              <select
                name="category"
                onChange={handleChange}
                className="bg-slate-400 rounded-md p-1"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Subcategory</label>
              <select
                name="subcategory"
                onChange={handleChange}
                className="bg-slate-400 rounded-md p-1"
                required
              >
                <option value="">Select subcategory</option>
                {subCategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Image Cover</label>
              <input 
                type="file" 
                name="imgCover" 
                id="imgCover" 
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleChange} 
                required 
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32" />}
            </div>
            {errors.imgCover && <span>{errors.imgCover}</span>}

            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
            {errors.backEndError && <span className="text-red-100">{errors.backEndError}</span>}
          </form>
        </div>
      </div>
    </>
  );
}
