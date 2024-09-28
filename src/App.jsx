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
import Wishlist from "./Components/User/wishlist/Wishlist";

// Admin Layout
const AdminLayout = ({ children }) => {
  return (
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
  return (
    <>
      <Routes>
        {/* Shared Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin/Categories" element={<CategoryContainer />} /> */}
        <Route path="/category/:id" element={<CategoryContent />} />
        <Route path="/product/:id" element={<ProductContainer />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<UserCategoryContainer />} />
        <Route path="/category/:id" element={<Categories />} />
        <Route path="/subCategory/:id" element={<SubCategoryContent />} />
        <Route path="/order/:id"  element={<OrderForm/>}/>
        <Route path="/wishlist"  element={<Wishlist/>}/>
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

                <Route path="/products" element={<ProductsContainer />} />
                <Route path="products/add" element={<AddProductForm />} />
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
