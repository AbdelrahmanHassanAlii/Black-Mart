import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Signupoffer from '../Signupoffer/Signupoffer';
import Footer from '../Footer/Footer';
import { getAllSubCategories } from '../../../Helper/Apis/Shared/subCategory/getAllSub.js';
import SubCategoryCard from '../subcategories/SubCategoriesCard.jsx'; // Correct import for the card component
import Loading from '../Loaders/Loading'; 

export default function CategoryContent() {
  const { id } = useParams(); 
  
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]); // Using subcategories instead of products
  const [active, setActive] = useState(false);
  const [filters, setGetFilters] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log("useEffect is running"); 
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the subcategories data
        const subcategoryData = await getAllSubCategories();
        console.log("API Response:", subcategoryData); // Corrected API response
  
        // Filter subcategories by category ID
        const filteredSubcategories = subcategoryData.filter(
          (subcategory) => subcategory.category === id
        );
        
        // Log the filtered subcategories
        console.log("Filtered Subcategories:", filteredSubcategories);
  
        // Set state with the filtered subcategories
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]); // Make sure useEffect runs when `id` changes
  
  useEffect(() => {
    console.log(active)
  },[active])


  if (loading) {
    return <Loading />;
  }
  console.log(subcategories);

  
  return (
    <> 
      <Signupoffer />
      <Header setActive={setActive} />
      <div className='flex gap-10 p-6'>
        <Navbar setGetFilters={setGetFilters} active={active} />

        <div className={`flex flex-col w-full ${active ? "hidden" : "flex"}`}>
          <div className='flex gap-4 justify-between p-3 w-full'>
            <p className='text-xl font-bold'>
              {filters.style || "Subcategories"} {/* Fallback if no filter is applied */}
            </p>
            <select name="filter" className='font-bold text-sm cursor-pointer'>
              <option value="most">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className='flex gap-5 flex-wrap'>
            {subcategories.length > 0 ? (
              subcategories.map((item) => (
                <SubCategoryCard
                  key={item._id}
                  name={item.name}
                  image={item.img || "defaultImage.jpg"} 
                  id={item._id} 
                />
              ))
            ) : (
              <p>No subcategories available for this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
