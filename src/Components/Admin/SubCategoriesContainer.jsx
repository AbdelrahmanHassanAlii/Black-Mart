import { useEffect, useState } from "react";
import { getAllSubCategories } from "../../Helper/Apis/Shared/subCategory/getAllSub";
import SubCategoriesCard from "./SubCategoriesCard";
import { Link } from "react-router-dom";

export default function SubCategoriesContainer() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getSubCategories = async () => {
      let subCategoriesData = await getAllSubCategories();
      console.log(subCategoriesData);
      setSubCategories(subCategoriesData);
    };
    getSubCategories();
  }, []);
  return (
    <div className="p-3">
      <div className="heading">
        <p className="title">Sub Categories</p>
        <Link className="add-btn" to={`/admin/subCategories/add`}>
          {" "}
          Add Sub Category{" "}
        </Link>
      </div>

      {subCategories.length > 0 ? (
        <div key={subCategories.id}>
          {subCategories.map((subCategory) => (
            <SubCategoriesCard key={subCategory.id} subCategory={subCategory} />
          ))}
        </div>
      ) : (
        <p>No sub categories found</p>
      )}
    </div>
  );
}
