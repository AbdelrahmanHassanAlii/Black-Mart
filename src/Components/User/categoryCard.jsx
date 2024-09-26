/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function CategoryCard({ image, name, id }) {
  return (
    <Link to={`/category/${id}`} className="group">
      <div className="bg-white flex flex-col justify-between shadow-lg w-72 rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
        <img src={image} alt={name} className="rounded-t-lg w-full  object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-200">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
