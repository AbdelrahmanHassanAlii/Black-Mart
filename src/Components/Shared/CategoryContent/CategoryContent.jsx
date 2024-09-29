import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Signupoffer from '../Signupoffer/Signupoffer';
import Footer from '../Footer/Footer';
import { getAllSubCategories } from '../../../Helper/Apis/Shared/subCategory/getAllSub.js';
import SubCategoryCard from '../subcategories/SubCategoriesCard.jsx'; 
import Loading from '../Loaders/Loading'; 

export default function CategoryContent() {
  const { id } = useParams(); 
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [active, setActive] = useState(false);
  const [filters, setGetFilters] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subcategoryData = await getAllSubCategories();
        const filteredSubcategories = subcategoryData.filter(
          (subcategory) => subcategory.category === id
        );
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]); 
  



  if (loading) {
    return <Loading />;
  }

  
  return (
    <> 
      <Signupoffer />
      <Header setActive={setActive} />
      <div className='flex gap-10 p-6'>
        <Navbar setGetFilters={setGetFilters} active={active} />

        <div className={`flex flex-col w-full ${active ? "hidden" : "flex"}`}>
          <div className='flex gap-4 justify-between p-3 w-full'>
            <p className='text-xl font-bold'>
              {filters.style || "Subcategories"} 
            </p>
            <select name="filter" className='font-bold text-sm cursor-pointer'>
              <option value="most">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className='flex gap-5 justify-center flex-wrap'>
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
