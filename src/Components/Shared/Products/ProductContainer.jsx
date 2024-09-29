import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Loading from "../Loaders/Loading";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";
import Signupoffer from "../Signupoffer/Signupoffer";
import { getSpecificProduct } from '../../../Helper/Apis/Shared/Product/getSpecificProducts';

export default function ProductContainer() {
  const [product, setProduct] = useState(null); 
  const { id } = useParams(); 
  console.log(id); 
 
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getSpecificProduct(id); 
        console.log(productData.data.product);
        setProduct(productData.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    getProduct(); 
  }, [id]); 
  
  if (!product) {
    return <Loading />;
  }

  return (
    <div>
      <Signupoffer />
      <Header />
      <div>
        <ProductPage
          image={product.imgCover}
          sideimages={product.images}
          name={product.name}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
        />
      </div>
      <Footer />
    </div>
  );
}
