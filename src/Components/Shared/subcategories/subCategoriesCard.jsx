/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';
export default function subCategoryCard({ image, name ,id }) {
  return (<>
  <Link to={`/subCategory/${id}`} >
  <div className='flex  items-center p-3 cursor-pointer duration-150 hover:scale-105 hover:shadow-xl '  >
    <div className="max-w-xs  overflow-hidden items rounded-2xl  bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="py-4">
        <p className="font-bold text-xl mb-2">{name}</p>
        <div className='flex gap-4 items-center'> 
      </div>
      </div>
      
    </div>
    </div>
    </Link>
    </>
  )
}
