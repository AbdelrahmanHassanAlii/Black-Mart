import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";
import style from "../../../assets/CSS/Shared/CategoriesContainer.module.css";
import Loading from "../Loaders/Loading";

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
  }, [categories]); // No need to add categories in the dependency array

  return (
    <div className={style.Categories}>
      <p className="title">Categories</p>
      {categories.length > 0 ? (
        <div className={style.categoriesCardsContainer}>
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
  );
}
