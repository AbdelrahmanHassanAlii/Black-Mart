import { Link } from "react-router-dom";

export default function SubCategoriesCard({ subCategory }) {
  console.log(subCategory);
  console.log(subCategory.img);

  return (
    <div>
      <Link to={`/subCategory/${subCategory._id}`}>
        <img src={subCategory.img} alt={subCategory.name} />

        <p>{subCategory.name}</p>
      </Link>
    </div>
  );
}
