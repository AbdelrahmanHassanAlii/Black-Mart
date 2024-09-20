import "./App.css";
<<<<<<< HEAD
import "./index.css"
import CategoryContainer from './Components/Shared/Categories/CategoryContainer';
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
      <Header/>
      {/* <CategoryContainer /> */}
      <Contentphoto/>
      <BrandsBar/>
      <NewArrivals/>
      <ProductContainer/>
      <Topselling/>
      <Footer/>
    </div>
=======
import CategoryContainer from "./Components/Shared/Categories/CategoryContainer";
import Sign from "./Pages/Shared/Sign";

function App() {
  return (
    <>
      {/* <h1>hello</h1> */}
      <Sign />
    </>
>>>>>>> 8b34033c77a2e389ff5d5203fcba17a276dd1346
  );
}

export default App;
