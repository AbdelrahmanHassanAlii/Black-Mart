import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartCirclePlus, FaHeartCircleCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import { getSpecificProduct } from '../../../Helper/Apis/Shared/Product/getSpecificProducts';

export default function ProductCard({ id, image, price, name, description }) {
  const [added, setAdded] = useState(false);  
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // Check if loginData exists in local storage before parsing
  const loginData = localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : {};
  const userid = loginData[0]?.Payload?.userId || null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSpecificProduct(id);
        console.log(productData.data.product); 
        setProduct(productData.data.product);
        setLoading(false);

        // Check if wishlist exists in local storage before parsing
        const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
        const isProductInWishlist = wishlist.some(item => item.id === id); 
        setAdded(isProductInWishlist);  
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWishlistClick = () => {
    // Initialize wishlist if not found
    let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

    if (!added) {
      // Adding product to wishlist
      Swal.fire({
        title: 'Add to Wishlist?',
        text: `Do you want to add ${product?.name} to your wishlist?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Add the product and user ID to the wishlist
          wishlist.push({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.imgCover,
            userId: userid, 
          });
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          setAdded(true);
          Swal.fire('Added!', `${product?.name} has been added to your wishlist.`, 'success');
        }
      });
    } else {
      // Removing product from wishlist
      Swal.fire({
        title: 'Remove from Wishlist?',
        text: `Do you want to remove ${product?.name} from your wishlist?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Filter out the product by ID
          wishlist = wishlist.filter(item => item.id !== product._id);
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          setAdded(false);
          Swal.fire('Removed!', `${product?.name} has been removed from your wishlist.`, 'success');
        }
      });
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex items-center p-3 justify-center  cursor-pointer duration-150 hover:scale-105 hover:shadow-xl min-w-60">
      <div className="max-w-xs overflow-hidden rounded-2xl bg-white">
        <Link to={`/product/${id}`}>
          <img className="w-full h-48 object-cover" src={image} alt={name} />
        </Link>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <Link to={`/product/${id}`}>
              <p className="font-bold text-lg mb-2">{name}</p>
            </Link>
            {added ? (
              <FaHeartCircleCheck
                className="text-xl text-green-100"
                onClick={handleWishlistClick}  
              />
            ) : (
              <FaHeartCirclePlus
                className="text-xl"
                onClick={handleWishlistClick} 
              />
            )}
          </div>
          <Link to={`/product/${id}`}>
            <div className="flex gap-4 items-center">
              <p className="font-bold text-xl">{price}</p>
              <div className="bg-rose-200 text-xs rounded-full items-center flex w-12 h-5 justify-center pr-2 pl-2 text-red-100">
                - 40%
              </div>
            </div>
          </Link>
          <Link to={`/product/${id}`}>
            <p className="text-xs">{description}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
