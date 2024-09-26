/* eslint-disable react/prop-types */

import { Link, useParams } from 'react-router-dom';
export default function ProductCard({ image, price, name ,id }) {
  console.log(id)
  return (<>
  <Link to={`/product/${id}`} >
  <div className='flex  items-center p-3 cursor-pointer duration-150 hover:scale-105 hover:shadow-xl '  >
    <div className="max-w-xs  overflow-hidden items rounded-2xl  bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="py-4">
        <p className="font-bold text-xl mb-2">{name}</p>
        <div className='flex gap-4 items-center'> 
            <p className="font-bold text-xl ">{price}</p>
            <div className="bg-rose-200 text-xs rounded-full  items-center flex w-12 h-5   justify-center pr-2 pl-2 text-red-100"> - 40% </div>
      </div>
      </div>
      
    </div>
    </div>
    </Link>
    </>
  )
}
