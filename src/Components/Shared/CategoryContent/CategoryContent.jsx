import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Signupoffer from '../Signupoffer/Signupoffer';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../../Helper/Apis/Shared/Product/getAllProducts';
import { getSpecificCategory } from '../../../Helper/Apis/Shared/Category/getSpecificCategory';
import ProductCard from '../Products/ProductCard';
import Loading from '../Loaders/Loading'; 

export default function CategoryContent() {
  const { id } = useParams(); 
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [filters, setGetFilters] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 

        const categoryData = await getSpecificCategory(id);
        setCategory(categoryData.category);

        const productsData = await getAllProducts();
        const filteredProducts = productsData.data.products.filter(
          (product) => product.category._id === id
        );
        setProducts(filteredProducts);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]); 

  // Render a loading state until the data is fetched
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
              {filters.style || "Products"} {/* Fallback if no filter is applied */}
            </p>
            <select name="filter" className='font-bold text-sm cursor-pointer'>
              <option value="most">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className='flex gap-5 flex-wrap'>
            {products.length > 0 ? (
              products.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.imgCover}
                  id={item._id}
                />
              ))
            ) : (
              <p>No products available for this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
