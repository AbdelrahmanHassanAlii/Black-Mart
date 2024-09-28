import ProductCard from "../../Admin/ProductCard"
import Footer from "../../Shared/Footer/Footer"
import Header from "../../Shared/Header/Header"
import Wishlistcard from "./wishlistcard"
export default function Wishlist() {
    const wishlist=JSON.parse(localStorage.getItem('wishlist'))
    console.log(wishlist)
    const  loginData =JSON.parse(localStorage.getItem('loginData'))
    const id=loginData[0].Payload?.userId
    
    const userwishlist=wishlist.filter(item=>item.userId===id)
    console.log(userwishlist)
  return (
    <div>
        <Header/>
        <div className="flex flex-col p-16">
        <p className="text-3xl font-extrabold mb-10">Wishlist</p>
        <div className="flex">
            {userwishlist.map(item=>
            <Wishlistcard key={item.id} name={item.name} price={item.price} image={item.image} id={item.id}/>
            
            )}
        </div>
        </div>
        <Footer/> 
    </div>
  )
}
