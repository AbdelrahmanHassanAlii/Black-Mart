import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addProduct } from "../../Helper/Apis/Admin/Product/addProduct.js";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories.js";
import { getAllSubCategories } from "../../Helper/Apis/Shared/SubCategory/getAllSub.js";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { RiFileCloudLine } from "react-icons/ri";

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
    // images: [],
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
    // images: [],
    category: "",
    subcategory: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  // const [previewImages, setPreviewImages] = useState([]);

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
        formData.append("subcategory", product.subcategory);
        formData.append("imgCover", product.imgCover);

        try {
          const response = await addProduct(formData);
          console.log(formData);
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
            images: [],
            category: "",
            subcategory: "",
          });
          setPreviewImage(null);
        } catch (error) {
          console.error("Error adding product:", error);
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
      <div className={style.formContainer}>
        <h2 className={`${style.formTitle}`}>Add Product</h2>
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
                placeholder="Enter Product Name"
                onChange={handleChange}
                value={product.name}
              />
            </div>

            {errors.name && <span className={style.error}>{errors.name}</span>}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="description">Description</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter Product Description"
                onChange={handleChange}
                value={product.description}
              />
            </div>

            {errors.description && (
              <span className={style.error}>{errors.description}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="price">Price</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <MdOutlinePriceChange className={style.icon} />
              </div>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Enter Product Price"
                onChange={handleChange}
                value={product.price}
              />
            </div>

            {errors.price && (
              <span className={style.error}>{errors.price}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="quantity">Quantity</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <MdLocalGroceryStore className={style.icon} />
              </div>
              <input
                type="text"
                name="quantity"
                id="quantity"
                placeholder="Enter Product Quantity"
                onChange={handleChange}
                value={product.quantity}
              />
            </div>

            {errors.quantity && (
              <span className={style.error}>{errors.quantity}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="brand">Brand</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Enter Product Brand"
                onChange={handleChange}
                value={product.brand}
              />
            </div>

            {errors.brand && (
              <span className={style.error}>{errors.brand}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="category">Category</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <TbCategoryFilled className={style.icon} />
              </div>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={product.category}
                className={style.selectInput}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.category && (
              <span className={style.error}>{errors.category}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="subcategory">Subcategory</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <select
                name="subcategory"
                id="subcategory"
                onChange={handleChange}
                value={product.subcategory}
                className={style.selectInput}
                required
              >
                <option value="">Select subcategory</option>
                {subCategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.subcategory && (
              <span className={style.error}>{errors.subcategory}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label className={style.customUpload} htmlFor="imgCover">
              <div className={style.icon}>
                <RiFileCloudLine className={style.imageIcon} />
              </div>
              <div className={style.text}>
                <p>Upload Cover Image</p>
              </div>
              <input
                className={style.fileInput}
                type="file"
                id="imgCover"
                name="imgCover"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleChange}
                required
              />
            </label>
            {errors.imgCover && (
              <span className={style.error}>{errors.imgCover}</span>
            )}
          </div>

          {previewImage && (
            <div className={style.previewImage}>
              <img
                src={previewImage}
                alt="Image Preview"
                className={style.imagePreview}
              />
            </div>
          )}
          {errors.imgCover && <span>{errors.imgCover}</span>}

          <button className="add-btn" type="submit">
            Add Product
          </button>

          {errors.backEndError && (
            <span className={style.error}>{errors.backEndError}</span>
          )}
        </form>
      </div>
    </>
  );
}
