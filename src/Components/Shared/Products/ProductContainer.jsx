import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../Helper/Apis/Shared/Product/getAllProducts";
import Loading from "../Loaders/Loading";

export default function ProductContainer() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.categories);
    };
    setTimeout(() => {
        getProducts();
    }, 3000);
    // getProducts();
  }, []);
  console.log(Products)
  return (
    <div >
      <p className="title">Categories</p>
      {Products.length > 0 ? (
        <div>
          {Products.map((Product, index) => (
            <ProductCard
              key={index}
              image={Product.img}
              name={Product.name}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
