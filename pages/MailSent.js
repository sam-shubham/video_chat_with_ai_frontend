import React from "react";
import Lottie from "lottie-react";
import EmailSent from "@/public/EmailSent.json";
import { useRouter } from "next/router";
const MailSent = () => {
  var router = useRouter();
  return (
    <div className="w-[100vw] bg-black h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center w-fit">
        <div className="flex flex-col items-center justify-center">
          <Lottie
            animationData={EmailSent}
            className="flex w-[14rem] /h-[5rem] justify-center items-center"
            loop={true}
          />
          <h3
            className=" mb-[2rem] md:text-2xl text-xl text-center font-semibold"
            style={{ fontFamily: "rubik" }}
          >
            Enquiry Sent!
          </h3>
          <h3
            className="max-w-[20rem] md:text-base text-xs md:max-w-[40rem] text-center"
            style={{ fontFamily: "poppins" }}
          >
            Thank you for sending us your case information. One of our
            specialists will get back to you via WhatsApp or Email. Please
            ensure your phone number is correct (including country code)
          </h3>
        </div>
        <div>
          <h3
            className="text-xl font-semibold mt-[2rem]"
            style={{ fontFamily: "rubik" }}
          >
            Additionally you can contact us on:
          </h3>
          <div className="flex items-center justify-center mt-[2rem]">
            <div className="flex gap-[1.5rem]">
              <button
                onClick={() =>
                  window.open("https://www.linkedin.com/in/itzsamshubham/")
                }
              >
                <i class="fi fi-brands-linkedin flex items-center text-3xl text-white hover:text-[#DBBE67] transition-all duration-300 cursor-pointer"></i>
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              router.push({ pathname: "/" });
            }}
            className="flex w-full p-3 items-center justify-center mt-[2rem] hover:scale-95 hover:text-[#dbbe67] gap-[0.5rem] transition-all duration-200"
          >
            <i className="text-xl fi fi-br-angle-double-left flex items-center "></i>
            <h3 className="text-xl">Go Back</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailSent;
