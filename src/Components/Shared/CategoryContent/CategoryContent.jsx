import Header from '../Header/Header'
import Navbar from './Navbar'
import { useState } from 'react'
import Signupoffer from '../Signupoffer/Signupoffer'
import Footer from '../Footer/Footer'
import ProductCard from '../Products/ProductCard'
export default function CategoryContent() {
  const [Active,setActive]=useState(false)
  const [Filters,setGetFilters]=useState({})
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
       {/* products */}
        <div>
        {/* <ProductCard name={Filters.type} price={parseInt(Filters.price.split(" - ")[0], 10)} />  */}

        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
