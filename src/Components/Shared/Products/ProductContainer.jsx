import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Loading from "../Loaders/Loading";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";
import Signupoffer from "../Signupoffer/Signupoffer";
import {getSpecificProduct} from '../../../Helper/Apis/Shared/Product/getSpecificProducts'
export default function ProductContainer() {
  const [Product, setProduct] = useState({});
  const { id } = useParams(); 

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getSpecificProduct();
      setProduct(ProductsData.data.products);
    };
  getProducts();
      console.log(Product)
    }, []);
  console.log(Product)
  return (
    <div >
      <Signupoffer/>
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
