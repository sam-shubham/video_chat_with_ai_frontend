import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="hidden bg-[#f4f4f4] z-[10] md:flex fixed left-[50%] translate-x-[-50%] w-[100%] justify-center py-[0.6rem] /w-[70%]">
        <div className="flex bg-[#f4f4f4] gap-[5rem] justify-center items-center mt-[0.5rem]">
          <div className="flex flex-col items-center justify-center">
            <Link href={"/"}>
              <img
                alt="AdamGlobal"
                src="/ADAM Global.png"
                className="h-[3.5rem] /tracking-wider"
              />
            </Link>
            {/* <h3
          style={{ fontFamily: "kanit" }}
          className="text-4xl bg-black text-white px-[1rem] /tracking-wider"
        >
          BIZGPT
        </h3> */}
            {/* <h3
          className="text-[8px] tracking-wider"
          style={{ fontFamily: "rubik" }}
        >
          BUSINESS SETUP WITH NO REGRETS
        </h3> */}
          </div>
          <div
            className="font-semibold flex gap-[2rem]"
            style={{ fontFamily: "rubik" }}
          >
            <Link href={"/"}>
              <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
                Home
              </h3>
            </Link>
            <Link href={"/Testimonials"}>
              <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
                Disclaimer
              </h3>
            </Link>
            <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
              Contact
            </h3>
            <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
              About Us
            </h3>
          </div>
          <div className="mx-[2rem] flex gap-[1rem]">
            <div className="flex gap-[0.7rem] items-center cursor-pointer">
              <i className="fi fi-sr-circle-phone flex items-center text-3xl text-blue-700"></i>
              <h3 className="" style={{ fontFamily: "rubik" }}>
                +971 50 911 0516
              </h3>
            </div>
            <div
              onClick={() => window.open("https://wa.me/+971509110516")}
              className="flex hover:outline-offset-[10px] hover:outline-2 hover:outline-gray-300 outline-none rounded-full gap-[0.7rem] items-center cursor-pointer transition-all duration-200"
            >
              <i className="fi fi-brands-whatsapp flex items-center text-3xl text-blue-700"></i>
              <h3 className="" style={{ fontFamily: "rubik" }}>
                Whatsapp
              </h3>
            </div>
            <div
              onClick={() => window.open("https://t.me/AdamGlobalDubai")}
              className="flex hover:outline-offset-[10px] hover:outline-2 hover:outline-gray-300 outline-none rounded-full gap-[0.7rem] items-center cursor-pointer transition-all duration-200"
            >
              <i className="fi fi-brands-telegram flex items-center text-3xl text-blue-700"></i>
              <h3 className="" style={{ fontFamily: "rubik" }}>
                Telegram
              </h3>
            </div>
            {/* <div className="flex gap-[0.7rem] items-center">
              <button
                style={{ fontFamily: "kanit" }}
                className=" px-[1.4rem] py-[0.8rem] hover:scale-[1.05] transition-all duration-200 text-white rounded-md bg-[#083c83]  "
              >
                Free Tax Consultation
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="block md:hidden bg-[#f4f4f4] pt-[1rem]">
        <div className="flex gap-[5rem] justify-center items-center mt-[0.5rem]">
          <div className="flex  flex-col items-center justify-center">
            <img
              alt="AdamGlobal"
              src="/ADAM Global.png"
              className="h-[3.5rem] /tracking-wider"
            />
          </div>
        </div>
      </div>
      <div className="block h-[3rem] md:h-[5rem] w-full bg-[#f4f4f4]" />
    </div>
  );
};

export default Navbar;
