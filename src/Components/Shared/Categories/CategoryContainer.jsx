import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";
import style from "../../../assets/CSS/Shared/CategoriesContainer.module.css";
import Loading from "../Loaders/Loading";

export default function CategoryContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      let categoriesData = await getAllCategories();
      setCategories(categoriesData.data.categories);
    };
    setTimeout(() => {
      getCategories();
    }, 1000);
    // getCategories();
  }, [categories]);

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
