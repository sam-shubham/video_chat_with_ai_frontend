import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  var router = useRouter();
  return (
    <div>
      <div className=" bg-[#000] z-[10] md:flex fixed left-[50%] translate-x-[-50%] w-[100%] justify-center py-[0.6rem] /w-[70%]">
        <div className="flex bg-[#000] md:gap-[5rem] px-[2rem] w-full justify-center md:justify-between items-center mt-[0.5rem]">
          <div
            className="font-semibold hidden md:flex gap-[2rem]"
            style={{ fontFamily: "rubik" }}
          >
            <img asrc="/dxb.png" alt="" />
            <Link href={"/"}>
              <h3 className="cursor-pointer text-[#DBBE67] hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
                Home
              </h3>
            </Link>
            <Link href={"/Disclaimer"}>
              <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
                Disclaimer
              </h3>
            </Link>
            <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
              Contact
            </h3>
            <Link href={"/PrivacyPolicy"}>
              <h3 className="cursor-pointer hover:border-opacity-100 border-opacity-0 transition-all duration-300 border-black border-b-2 border-transparent">
                {`Privacy policy`}
              </h3>
            </Link>
          </div>
          <div>
            <div
              onClick={() => {
                window.open("/", "_self");
              }}
              className="flex gap-[0.5rem] justify-center items-center md:hidden  mr-[2rem]"
            >
              <img src="/24justice_orignal.png" className="w-[2rem]" alt="" />
              <h3 className="text-[#DBBE67]" style={{ fontFamily: "rubik" }}>
                24Justice
              </h3>
            </div>
          </div>
          <div className="md:mx-[2rem] flex gap-[1rem]">
            <button
              onClick={() => {
                window.open("https://wa.me/+923085510031");
              }}
            >
              <i className="fi fi-brands-whatsapp flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>
            <button
              onClick={() =>
                window.open("https://pk.linkedin.com/company/24justice.pk")
              }
            >
              <i className="fi fi-brands-linkedin flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>
            <button
              onClick={() =>
                window.open("https://m.facebook.com/24Justice.pk/")
              }
            >
              <i className="fi fi-brands-facebook flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>
            <button
              onClick={() => window.open("https://twitter.com/24Justicepk")}
            >
              <i className="fi fi-brands-twitter flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>
            <button
              onClick={() =>
                window.open("https://www.instagram.com/24justice.pk/")
              }
            >
              <i className="fi fi-brands-instagram flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://youtube.com/c/24JusticeLawyersandLegalServices"
                )
              }
            >
              <i className="fi fi-brands-youtube flex items-center text-xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
            </button>

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
      {/* <div className="block md:hidden bg-[#000] pt-[1rem]">
        <div className="flex gap-[5rem] justify-center items-center mt-[0.5rem]">
          <div className="flex  flex-col items-center justify-center">
            <img
              alt=""
              src="/24justice.png"
              className="h-[3.5rem] /tracking-wider"
            />
          </div>
        </div>
      </div> */}
      {/* <div className="block h-[3rem] md:h-[5rem] w-full bg-[#f4f4f4]" /> */}
    </div>
  );
};

export default Navbar;
