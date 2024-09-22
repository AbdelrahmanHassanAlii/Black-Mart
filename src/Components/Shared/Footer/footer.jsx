import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className=" relative mt-20  font-satoshi bg-gray-100 w-full p-4 sm:p-6 md:p-8    pt-52  md:pt-24 pb-16">
      {/* Black Section */}
      <div className="bg-black rounded-xl w-[90%] max-w-5xl mx-auto gap-5 text-white py-6 px-4 sm:px-8 absolute top-[-70px] left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center justify-between gap-4  md:flex-row">
          <p className="text-xl sm:text-4xl font-bold mb-4 md:mb-0 text-center md:text-left  w-auto">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS .
          </p>
          <form className="flex flex-col gap-3  space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <div className="flex rounded-full bg-white items-center p-2 w-full sm:w-auto">
              <MdEmail className="text-black text-xl" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-full text-black w-full sm:w-64 focus:outline-none px-2 py-1 text-sm"
              />
            </div>
            <button className="bg-white text-black text-sm px-4 py-2 rounded-full font-semibold whitespace-nowrap w-full sm:w-auto">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
      {/* footer section */}
      <div className="flex flex-col md:flex-row gap-8 mt-8 w-full">
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <p className="text-black font-extrabold text-3xl">SHOP.CO</p>
          <p className="text-black opacity-80">
            We have clothes that suit your style and which you're proud to wear.
            From women to men.
          </p>
          <div className="flex gap-3">
            <div className="bg-white text-black w-10 h-10 flex items-center justify-center border cursor-pointer hover:-translate-y-1 border-slate-900 rounded-full transition-transform">
              <FaTwitter />
            </div>

            <div className="bg-black text-white w-10 h-10 flex items-center justify-center border cursor-pointer hover:-translate-y-1 border-slate-900 rounded-full transition-transform">
              <FaFacebookF />
            </div>

            <div className="bg-white text-black w-10 h-10 flex items-center justify-center border cursor-pointer hover:-translate-y-1 border-slate-900 rounded-full transition-transform">
              <FaInstagram />
            </div>

            <div className="bg-white text-black w-10 h-10 flex items-center justify-center border cursor-pointer hover:-translate-y-1 border-slate-900 rounded-full transition-transform">
              <a href="https://github.com/AbdelrahmanHassanAlii/Black-Mart.git">
                {" "}
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
          {["COMPANY", "HELP", "FAQ", "RESOURCES"].map((title, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-medium text-lg tracking-widest mb-4">
                {title}
              </p>
              <ul className="opacity-80 space-y-2">
                {["About", "Features", "Works", "Career"].map((item, idx) => (
                  <li key={idx} className="cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black opacity-15 w-full h-0.5 my-8"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="opacity-75 text-center sm:text-left">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <img
            src="/logos/visa.png"
            alt=""
            className="w-10 cursor-pointer hover:-translate-y-0.5 transition-transform"
          />
          <img
            src="/logos/card.png"
            alt=""
            className="w-10 cursor-pointer hover:-translate-y-0.5 transition-transform"
          />
          <img
            src="/logos/paypal.png"
            alt=""
            className="w-10 cursor-pointer hover:-translate-y-0.5 transition-transform"
          />
          <img
            src="/logos/apple-pay.png"
            alt=""
            className="w-10 cursor-pointer hover:-translate-y-0.5 transition-transform"
          />
          <img
            src="/logos/google-pay.png"
            alt=""
            className="w-10 cursor-pointer hover:-translate-y-0.5 transition-transform"
          />
        </div>
      </div>
    </div>
  );
}
