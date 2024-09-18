import { useState } from "react";
import CategoryCard from "./CategoryCard";
import { useEffect } from "react";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";

export default function CategoryContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      let categoriesData = await getAllCategories();
      setCategories(categoriesData.data.categories);
    };
    getCategories();
  }, []);
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <CategoryCard key={index} image={category.img} name={category.name} />
      ))}
    </div>
  );
}
