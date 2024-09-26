import { useState,useEffect } from 'react'
import {getAllProducts} from '../../../../Helper/Apis/Shared/Product/getAllProducts'
import ProductCard from '../../Products/ProductCard'
export default function NewArrivals() {
  const [products,setProducts]=useState([])
  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products.slice(0));
      
    };
  getProducts();
      console.log(products)
    }, [])
  return (
    <div className='flex flex-col justify-center text-center items-center gap-4 ' id="NewArrivals">
        <h1 className='text-4xl font-extrabold'> NEW ARRIVALS</h1>
        <div className='flex gap-5'>
          {products.map((item)=>{
            return(
            <ProductCard key={item._id} name={item.name} price={item.price} image={item.imgCover} id={item.id}  />
          )})}
        </div>
        <div className="rounded-full bg-transparent border border-zinc-900 w-80 p-2 sm:w-80 cursor-pointer hover:bg-black hover:text-white duration-150">View ALL</div>
    </div>
  )
}
