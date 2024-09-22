import "./App.css";
import Footer from "./Components/Shared/Footer/Footer";
import ProductPage from "./Components/Shared/Products/ProductPage";

import Sign from "./Pages/Shared/Sign";
import NewArrivals from "./Components/Shared/NewArrivals/NewArrivals";
import Signupoffer from "./Components/Shared/Signupoffer/Signupoffer";
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import { Route, Routes } from "react-router-dom";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CategoryContainer />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          path="/admin/update-category/:id"
          element={<UpdateCategoryForm />}
        />
        <Route path="/add" element={<AddCategoryForm />} />
      </Routes>
    </>
  );
}

export default App;
