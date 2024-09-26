/* eslint-disable react/prop-types */
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

// Pages and Components
import Sign from "./Pages/Shared/Sign";
import HomePage from "./Components/Shared/HomePage/HomePage";
import Cart from "./Components/Shared/Cart/Cart";
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import CategoryContent from "./Components/Shared/CategoryContent/CategoryContent";
import ProductContainer from "./Components/Shared/Products/ProductContainer";

// Admin Components
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";
import AddProductForm from "./Components/Admin/AddProductForm";
import SideBar from "./Components/Admin/SideBar";

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
        <Route path="/Categories" element={<CategoryContainer />} />
        <Route path="/Products" element={<CategoryContent />} />
        <Route path="/product/:id" element={<ProductContainer />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Sign" element={<Sign />} />

        {/* Role-Based Redirect */}
        <Route
          path="/sign"
          element={<Sign />}
        />

        {/* Admin Routes (with Sidebar and Header) */}
        <Route
          path="/dashboard/*"
          element={
            
              <AdminLayout>
                <Routes>
                  <Route
                    path="update-category/:id"
                    element={<UpdateCategoryForm />}
                  />
                  <Route path="add-category" element={<AddCategoryForm />} />
                  <Route path="add-product" element={<AddProductForm />} />
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
