import { useEffect, useState } from "react";
import { getAllProducts } from "../../Helper/Apis/Shared/Product/getAllProducts";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function ProductsContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products);
    };
    getProducts();
  }, [products]);
  return (
    <div className=" p-3 ">
      <div className="heading">
        <p className="title">Products</p>
        <Link className="add-btn" to={`/admin/products/add`}>
          {" "}
          Add Product{" "}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
