import "./App.css";
import "./index.css"
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import Sign from "./Pages/Shared/Sign";
import Footer from "./Components/Shared/Footer/Footer";
import Signupoffer from "./Components/Shared/Signupoffer/Signupoffer";
import Header from "./Components/Shared/Header/Header";
import BrandsBar from "./Components/Shared/BrandsBar/BrandsBar";
import Contentphoto from "./Components/Shared/Contentphoto/Contentphoto";
import NewArrivals from "./Components/Shared/NewArrivals/NewArrivals";
import Topselling from "./Components/Shared/TopSelling/Topselling";
import ProductContainer from "./Components/Shared/Products/ProductContainer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Signupoffer/>
      {/* <Header/> */}
      {/* <CategoryContainer /> */}
      {/* <Contentphoto/> */}
      {/* <BrandsBar/> */}
      {/* <NewArrivals/> */}
      <ProductContainer/>
      {/* <Topselling/> */}
      {/* <Footer/> */}
      {/* <Sign /> */}
    </div>

  );
}

export default App;
