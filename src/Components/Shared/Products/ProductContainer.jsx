import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Loading from "../Loaders/Loading";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";
import Signupoffer from "../Signupoffer/Signupoffer";
import { getSpecificProduct } from '../../../Helper/Apis/Shared/Product/getSpecificProducts';

export default function ProductContainer() {
  const [product, setProduct] = useState(null); // Set initial state to null to handle loading
  const { id } = useParams(); 
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getSpecificProduct(id); // Pass 'id' directly
        setProduct(productData); // Update state with the fetched product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    getProduct(); // Call the function when component mounts
  }, [id]); // Include 'id' as a dependency to re-fetch if the id changes
  
  if (!product) {
    // Show a loading spinner or message while the product data is being fetched
    return <Loading />;
  }

  return (
    <div>
      <Signupoffer />
      <Header />
      <div>
        <ProductPage
          image={product.imgCover} // Render the product's main image
          sideimages={product.images} // Render the product's side images
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
