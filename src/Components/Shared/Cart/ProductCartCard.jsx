import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ProductCartCard({ removeItem }) {
  const [cartData, setCartData] = useState([]);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCartData = localStorage.getItem("Cart");
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, [cartData]);

  // Function to update quantity in localStorage and state
  const updateItemQuantity = (productId, newQuantity) => {
    let updatedCartData = cartData.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity }; // Update quantity
      }
      return product;
    });

    setCartData(updatedCartData); // Update state

    // Save updated cart data back to localStorage
    localStorage.setItem("Cart", JSON.stringify(updatedCartData));
  };

  return (
    <div >
      {cartData.length > 0 ? (
        cartData.map((product, index) => (
          <div key={product.id} className="sm:w-[40rem] sm:h-48  border pt-5 p-2 gap-3 sm:p-5 sm:gap-5 rounded-3xl flex  sm:W-10 mb-10">
            <img
              src={product.image}
              alt={product.name}
              className="h-28 w-28  rounded-3xl sm:border-2 border-black"
            />

            <div className="flex justify-between flex-col gap-3 w-full">
              <div className="flex justify-between gap-5 items-center">
                <p className="sm:text-2xl font-bold">{product.name}</p>
                <RiDeleteBin6Fill
                  className="hover:text-red-100 text-black text-xl cursor-pointer"
                  onClick={() => removeItem(product.id)} // Trigger removeItem function
                />
              </div>
              <p>
                <span className="font-bold">Size:</span>{" "}
                <span className="opacity-65">{product.size}</span>
              </p>
              <p>
                <span className="font-bold">Color:</span>{" "}
                <span className="opacity-65">{product.color}</span>
              </p>
              <div className="flex justify-between items-center">
                <p className="sm:text-3xl font-bold">${product.price}</p>

                <div className="rounded-full gap-7 items-center bg-slate-300 p-2 cursor-pointer flex">
                  <FaMinus
                    onClick={() => {
                      if (product.quantity > 1) {
                        updateItemQuantity(product.id, product.quantity - 1); // Decrease quantity
                      }
                    }}
                  />
                  <p className="text-xl font-bold">{product.quantity}</p>
                  <FaPlus
                    onClick={() =>
                      updateItemQuantity(product.id, product.quantity + 1) // Increase quantity
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-3xl font-bold">No items in cart !</p>
      )}
    </div>
  );
}
