import "./App.css";
import Footer from "./Components/Shared/Footer/Footer";
import ProductPage from "./Components/Shared/Products/ProductPage";

import Sign from "./Pages/Shared/Sign";
import NewArrivals from "./Components/Shared/HomePage/NewArrivals/NewArrivals";
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import { Route, Routes } from "react-router-dom";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";
import CategoryContent from "./Components/Shared/CategoryContent/CategoryContent";
import ProductContainer from "./Components/Shared/Products/ProductContainer";
import HomePage from "./Components/Shared/HomePage/HomePage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Products" element={<CategoryContent/>}/>
      <Route path="/product/:id" element={<ProductContainer/>}/>
      </Routes>
    </>
  );
}

export default App;
