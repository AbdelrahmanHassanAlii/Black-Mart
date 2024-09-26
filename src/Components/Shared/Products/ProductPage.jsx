/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import ProductCard from "./ProductCard";
import { FaCheck } from "react-icons/fa";
import Swll from "sweetalert2";
import {addToCart} from "../../../Helper/Funcation/Addtocart"
export default function ProductPage({
  image,
  name,
  sideimages,
  description,
  price,
  quantity,
}){
  const [data,setData]=useState({
    name:name,
    color:"",
    size:"",
    quantity:0,
    image:image,
    price:price

  })
  
  const [counter, setcounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [img, setImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState(null);
  const handelimg = (e) => {
    setImage(e.target.src);
  };
  const handleClick = (size) => {
    setIsActive(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  
  const datahandler = (key, item) => {
    setData((prevData) => ({
      ...prevData,
      [key]: item,
    }));
    
  };
  useEffect(()=>{
    console.log(data)
  },[data])
  const sendDataHandler=()=>{
    Swll.fire("Good job!", "You clicked the button!", "success").then(addToCart(data))
    
  }

  return (
    <div className="flex flex-col sm:gap-5 justify-center ">
      <div className="sm:flex sm:p-6 sm:gap-7 ">
        {/*display images part */}
        <div className="items-center flex flex-col sm:flex-row-reverse  gap-5    ">
          <img
            src={img}
            alt={name}
            className=" rounded-3xl w-3/4 sm:w-[27 rem] sm:h-[33rem] "
          />
          <div className="flex sm:flex-col  gap-10">
            <img
              src={image}
              alt="name"
              className="min-w-24 h-24 sm:w-40 sm:h-40  rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
            <img
              src={sideimages[0]}
              alt="name"
              className="min-w-24  h-24 sm:w-40 sm:h-40 rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
            <img
              src={sideimages[1]}
              alt="name"
              className="min-w-24  h-24 sm:w-40 sm:h-40 rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
          </div>
        </div>
        {/*title&desc part */}
        <div className="">
          <div className="flex flex-col gap-5 p-3 ">
            <p className="text-3xl font-extrabold h-14 w-72 text-start ">
              {name}
            </p>
            <div className="flex gap-5">
              <p className=" text-3xl font-bold">{`$${price}`}</p>
              <p className=" text-3xl font-bold opacity-40 line-through ">{`$240`}</p>
              <div className="bg-rose-200 text-lg rounded-full  items-center flex  justify-center pr-2 pl-2 text-red-100">
                {" "}
                - 40%{" "}
              </div>
            </div>
            <p className="opacity-70">{description}</p>
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-0.5 sm:w-full bg-black opacity-20"></div>
          </div>
          {/*Select Colors part */}
          <div className="flex flex-col gap-4 p-3">
            <p className="opacity-75">Select Colors</p>
            <div className="flex gap-3">
                {[
                  { name: "lime", bgColor: "bg-lime-800" },
                  { name: "orange", bgColor: "bg-orange-700" },
                  { name: "sky", bgColor: "bg-sky-950" },
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`relative rounded-full h-10 w-10 cursor-pointer ${color.bgColor}`}
                    onClick={() =>{ handleColorClick(color.name)
                                    datahandler("color",color.name)}
                    }
                  >
                    {selectedColor === color.name && (
                      <FaCheck className="text-white absolute inset-0 m-auto flex justify-center items-center" />
                    )}
                  </div>
                ))}
          </div>
            {/*Choose Size part */}
            <div className="flex flex-col gap-4 p-3">
              <p className="opacity-75">Choose Size</p>
              <div className="flex gap-3">
                {["Small", "Medium", "Large", "XLarge"].map((size) => (
                  <div
                    key={size}
                    className={`rounded-full text-md w-20 h-10 flex items-center justify-center cursor-pointer hover:scale-105 ${
                      isActive === size
                        ? "bg-black text-white"
                        : "bg-slate-300 text-black"
                    }`}
                    onClick={() => {handleClick(size)
                      datahandler("size",size)}
                      
                  }
                  >
                    <span>{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-0.5 bg-black opacity-20"></div>
            </div>
            {/*Add to Cart part */}
            <div className="flex gap-6">
              <div className=" rounded-full gap-7  items-center bg-slate-300 p-4 cursor-pointer flex">
                <FaMinus
                  onClick={() => {counter > 0 && setcounter(counter - 1)
                    datahandler("quantity",counter-1)
                  }}
                />
                <p className="text-xl font-bold">{counter}</p>
                <FaPlus onClick={() => {setcounter(counter + 1)
                                        datahandler("quantity",counter+1)
                }} />
              </div>
              <div className=" rounded-full  bg-black text-xl text-center text-white w-72  p-4 cursor-pointer" onClick={sendDataHandler}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*review&&comments part */}
      <div className="w-96 h-0.5 sm:w-3/4 hidden sm:block sm:ml-40 bg-black opacity-20"></div>
      <div className="flex justify-between  items-center p-6">
        <p className="text-3xl font-bold sm:ml-7">All Reviews</p>
        <div className="flex gap-3 items-center">
          <GiSettingsKnobs className="h-10 text-3xl pt-0.5 pb-0.5 pl-2 pr-2 cursor-pointer hover:scale-105 duration-150  bg-slate-200 rounded-full w-10  " />
          <div className="bg-black p-3 text-white rounded-full cursor-pointer hover:scale-105 duration-150 min-w-[140px] ">
            Write a Review
          </div>
        </div>
      </div>

      {/*comments part */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto  items-start ">
        <div className="flex gap-4">
          <div className="p-3 flex flex-col gap-3  border border-slate-300 rounded-2xl  w-96">
            <p className="text-3xl font-bold">Samantha D.</p>
            <p className="opacity-50">
              "I absolutely love this t-shirt! The design is unique and the
              fabric feels so comfortable. As a fellow designer, I appreciate
              the attention to detail. It's become my favorite go-to shirt."
            </p>
            <p>Posted on August 14,2023</p>
          </div>
          <div className="p-3 flex flex-col gap-3  border border-slate-300 rounded-2xl  w-96">
            <p className="text-3xl font-bold">Samantha D.</p>
            <p className="opacity-50">
              "I absolutely love this t-shirt! The design is unique and the
              fabric feels so comfortable. As a fellow designer, I appreciate
              the attention to detail. It's become my favorite go-to shirt."
            </p>
            <p>Posted on August 14,2023</p>
          </div>
        </div>
        <div className="flex w-full sm:justify-center">
          <div className=" p-3 text-center rounded-full border  border-slate-300 w-full sm:w-1/4 mt-3 cursor-pointer hover:bg-black hover:text-white ease-linear duration-150">
            Load More Reviews
          </div>
        </div>
      </div>
      <p className="text-3xl font-extrabold text-center w-full sm:mb-10">
        YOU MIGHT ALSO LIKE
      </p>
      <div className=" flex  overflow-y-auto sm:overflow-y-hidden sm:justify-center ">
        <div className="flex gap-2 ">
          {[
            {
              image: "/Products/Product1/Mightlike/1.jpg",
              name: "Polo with Contrast Trims",
              price: "$212",
            },
            {
              image: "/Products/Product1/Mightlike/2.jpg",
              name: "Polo with Contrast Trims",
              price: "$212",
            },
            {
              image: "/Products/Product1/Mightlike/3.jpg",
              name: "Polo with Contrast Trims",
              price: "$212",
            },
            {
              image: "/Products/Product1/Mightlike/4.jpg",
              name: "Polo with Contrast Trims",
              price: "$212",
            },
          ].map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );

}