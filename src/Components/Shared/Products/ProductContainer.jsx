import { useState, useEffect } from "react";
import { getAllProducts } from "../../../Helper/Apis/Shared/Product/getAllProducts";
import Loading from "../Loaders/Loading";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";

export default function ProductContainer() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products
      );
    };
  getProducts();
      
    }, []);
  console.log(Products)
  return (
    <div >
      <Header/>
      {Products.length > 0 ? (
        <div>
          {Products.map((Product, index) => (
            <ProductPage
              key={index}
              image={Product.imgCover}
              sideimages={Product.images}
              name={Product.name}
              description={Product.description}
              price={Product.price}
              priceAfterDiscount={Product.priceAfterDiscount}
              quantity={Product.quantity}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <Footer/>
    </div>
  );
}
