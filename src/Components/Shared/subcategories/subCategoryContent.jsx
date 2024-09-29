import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import Navbar from '../CategoryContent/Navbar';
import { useEffect, useState } from 'react';
import Signupoffer from '../Signupoffer/Signupoffer';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../../Helper/Apis/Shared/Product/getAllProducts';
import ProductCard from '../Products/ProductCard';
import Loading from '../Loaders/Loading'; 

export default function SubCategoryContent() {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [filters, setGetFilters] = useState({});
  const [filters2, setGetFilters2] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        setError(null);
        const productsData = await getAllProducts();
        const filteredProducts = productsData.data.products.filter(
          (product) => product.subCategory._id === id
        );
        setProducts(filteredProducts);  
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    localStorage.removeItem("filters")
  },[])
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];
      const localStorageFilters = JSON.parse(localStorage.getItem('filters')) || {};
      if (localStorageFilters.color) {
        filtered = filtered.filter(product => product.color === localStorageFilters.color);
      }
      if (localStorageFilters.type) {
        filtered = filtered.filter(product => product.typeof === localStorageFilters.type);
      }
      if(localStorageFilters.style) {
        filtered = filtered.filter(product => product.style === localStorageFilters.style);
      }
      setFilteredProducts(filtered);
    }
  }, [products,filters]);
  if (loading) {
    return <Loading />;
  } 
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
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
              {filters.style || subCategory?.name || "Products"}
            </p>
            <select name="filter" className='font-bold text-sm cursor-pointer'>
              <option value="most">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className='flex w-[27rem] sm:w-auto flex-wrap '>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.imgCover}
                  id={item._id}
                />
              ))
            ) : (
              <p>No products available for this subcategory.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
