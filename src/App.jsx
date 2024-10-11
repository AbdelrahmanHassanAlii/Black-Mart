/* eslint-disable react/prop-types */
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

// Pages and Components
import Sign from "./Pages/Shared/Sign";
import HomePage from "./Pages/User/HomePage";
import Cart from "./Components/Shared/Cart/Cart";
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import CategoryContent from "./Components/Shared/CategoryContent/CategoryContent";
import ProductContainer from "./Components/Shared/Products/ProductContainer";
import UserCategoryContainer from "./Components/User/userCategories";
import OrderForm from "./Components/User/OrderForm";
// Admin Components
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";
import AddProductForm from "./Components/Admin/AddProductForm";
import SideBar from "./Components/Admin/SideBar";
import Profile from "./Components/Shared/Profile/Profile";

import Categories from "./Pages/Shared/Categories";

import HomeCards from "./Components/Admin/HomeCards";
import Dashbord from "./Pages/Admin/Dashboard";
import AddCategory from "./Pages/Admin/AddCategory";
import UpdateCategory from "./Pages/Admin/UpdateCategory";
import ProductsContainer from "./Components/Admin/ProductsContainer";
import SubCategoryContent from "./Components/Shared/subcategories/subCategoryContent";
import { getRole } from "./Helper/Funcation/LocalStorage/GetRole";
import UnAuthorized from "./Components/Admin/UnAuthorized";
import UpdateProductForm from "./Components/Admin/UpdateProductForm";
import OrdersTables from "./Components/Admin/OrdersTables";
import OrderDetails from "./Components/Admin/OrderDetails";
import SubCategoriesContainer from "./Components/Admin/SubCategoriesContainer";
import AddSubCategoryForm from "./Components/Admin/AddSubCategoryForm";
import UpdateSubCategoryForm from "./Components/Admin/UpdateSubCategorie";
import { useState } from "react";
import CouponsContainer from "./Components/Admin/CouponsContainer";
import AddCouponForm from "./Components/Admin/AddCouponForm";
import UpdateCouponeForm from "./Components/Admin/UpdateCouponeForm";

// Admin Layout
const AdminLayout = ({ children }) => {
  let role = getRole(); // Get role from local storage

  // Log role for debugging purposes
  console.log("Role:", role);

  // Show UnAuthorized component if the role is "user" or invalid
  return role === "user" ? (
    <UnAuthorized />
  ) : (
    <>
      <div
        className="admin-container"
        style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}
      >
        <SideBar />
        <div className="admin-content">{children}</div>
      </div>
    </>
  );
};

function App() {
  const [data, setdata] = useState({});
  return (
    <>
      <Routes>
        {/* Shared Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin/Categories" element={<CategoryContainer />} /> */}
        <Route path="/category/:id" element={<CategoryContent />} />
        <Route
          path="/product/:id"
          element={<ProductContainer setdata={setdata} />}
        />
        <Route path="/Cart" element={<Cart data1={data} />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<UserCategoryContainer />} />
        <Route path="/category/:id" element={<Categories />} />
        <Route path="/subCategory/:id" element={<SubCategoryContent />} />
        <Route path="/order/:id" element={<OrderForm />} />
        {/* Role-Based Redirect */}
        <Route path="/sign" element={<Sign />} />

        {/* Admin Routes (with Sidebar and Header) */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashbord />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="categories/add" element={<AddCategory />} />
                <Route
                  path="update-category/:id"
                  element={<UpdateCategory />}
                />
                <Route path="/add-category" element={<AddCategoryForm />} />

                <Route
                  path="/subCategories"
                  element={<SubCategoriesContainer />}
                />
                <Route
                  path="/subCategories/add"
                  element={<AddSubCategoryForm />}
                />

                <Route
                  path="/subCategories/edit/:id"
                  element={<UpdateSubCategoryForm />}
                />

                <Route path="/products" element={<ProductsContainer />} />
                <Route path="products/add" element={<AddProductForm />} />
                <Route
                  path="/products/edit/:id"
                  element={<UpdateProductForm />}
                />

                <Route path="/orders" element={<OrdersTables />} />
                <Route path="/orders/:id" element={<OrderDetails />} />

                <Route path="/coupons" element={<CouponsContainer />} />
                <Route path="/coupons/add" element={<AddCouponForm />} />
                <Route path="/coupons/edit/:id" element={<UpdateCouponeForm />} />
              </Routes>
            </AdminLayout>
          }
        />

        {/* Catch-All Route for Undefined Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
