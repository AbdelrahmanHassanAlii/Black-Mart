import "./App.css";

import Sign from "./Pages/Shared/Sign";
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import { Route, Routes } from "react-router-dom";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";
import CategoryContent from "./Components/Shared/CategoryContent/CategoryContent";
import ProductContainer from "./Components/Shared/Products/ProductContainer";
import HomePage from "./Components/Shared/HomePage/HomePage";
import Cart from "./Components/Shared/Cart/Cart";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/Products" element={<CategoryContent/>}/>
      <Route path="/product/:id" element={<ProductContainer/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/sign" element={<Sign/>}/>
      <Route path="/UpdateCategory" element={<UpdateCategoryForm/>}/>
      <Route path="/AddCategory" element={<AddCategoryForm/>}/>

      </Routes>
    </>
  );
}

export default App;
