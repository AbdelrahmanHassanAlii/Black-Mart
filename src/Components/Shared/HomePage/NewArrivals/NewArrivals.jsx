import { useState,useEffect } from 'react'
import {getAllProducts} from '../../../../Helper/Apis/Shared/Product/getAllProducts'
import ProductCard from '../../Products/ProductCard'
import { Link } from 'react-router-dom'
export default function NewArrivals() {
  const [products,setProducts]=useState([])
  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products.slice(6));
      
    };
  getProducts();
      console.log(products)
    }, [])
  return (<>
    <div className='flex flex-col justify-center text-center overflow-y-auto  items-start items-center gap-4 ' id="NewArrivals">
        <h1 className='text-4xl font-extrabold '> NEW ARRIVALS</h1>
        <div className='flex gap-5 '>
          {products.map((item)=>{
            return(
            <ProductCard key={item._id} name={item.name} price={item.price} image={item.imgCover} id={item.id}  />
          )})}
        </div>
        <Link to={`/categories`}>
        <div className="rounded-full bg-transparent border text-center border-zinc-900 w-80 p-2 sm:w-80 cursor-pointer hover:bg-black hover:text-white duration-150">View ALL</div>
        </Link>
    </div>
    </>
  )
}
