import Header from '../Header/Header'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import Signupoffer from '../Signupoffer/Signupoffer'
import Footer from '../Footer/Footer'
import {getAllProducts} from '../../../Helper/Apis/Shared/Product//getAllProducts'
import ProductCard from '../Products/ProductCard'
export default function CategoryContent() {
  const[products,setProducts]=useState([])
  const [Active,setActive]=useState(false)
  const [Filters,setGetFilters]=useState({})
  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products);
    };
  getProducts();
      console.log(products)
    }, []);
  console.log(products)
  console.log(Filters)
  return (
    <> 
    <Signupoffer/>
    <Header setActive={setActive}/>
    <div className=' flex gap-10 p-6'>
      <Navbar setGetFilters={setGetFilters} Active={Active}  />
      <div className={`  flex flex-col w-full  ${Active?"hidden":"flex"} `}>
        <div className='flex gap-4  justify-between p-3 w-full '>
          <p className='text-xl font-bold' >{Filters.style}</p>
          <select name="filter" id="" className='font-bold text-sm cursor-pointer'>
            <option value="most"> Most Popular</option>
            <option value="latest"> Latest</option>
            <option value="price"> Price</option>
          </select>
        </div>
       
        <div className='flex flex-wrap gap-x-10 gap-y-5'>
        {products.map((item) => (
    <ProductCard key={item._id} name={item.name} price={item.price} image={item.imgCover} id={item.id} />
  ))}
       

        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
