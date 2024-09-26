import { useState, useEffect } from "react";
import CategoryCard from "../User/categoryCard";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories";
import Loading from "../Shared/Loaders/Loading";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
export default function CategoryContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await getAllCategories(); // Function already returns categories
        setCategories(categoriesData); // Set the fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []); // No need to add categories in the dependency array

  return (
    <div >
        <Header/>
        <div className="p-10">
      <p className="text-3xl font-bold mb-5 underline underline-offset-8">Categories</p>
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-5 " >
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.img}
              name={category.name}
              id={category._id}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      </div>
      <Footer/>
    </div>
  );
}
