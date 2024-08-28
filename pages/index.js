import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import allCounties from "@/libs/database/allCounties";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  var router = useRouter();
  const [CurrentLocation, setCurrentLocation] = useState("");
  const [Homepage, setHomepage] = useState(true);
  const [allmsg, setAllmsg] = useState([]);
  const [SendingMail, setSendingMail] = useState(false);
  const [ShowBookingForm, setShowBookingForm] = useState(false);
  var randomfloatarray = useMemo(() => ["-7rem", "-7.5rem", "56.7rem"], []);
  const [popularPrompts, setpopularPrompts] = useState([]);
  useEffect(() => {
    (async () => {
      var axres = await axios.get("/api/getPopularPrompts").then((d) => d.data);
      if (axres.status) {
        setpopularPrompts(axres.allPopularPrompts);
      } else {
        console.error("Unable to fetch popular prompts!!");
      }
    })();
  }, []);

  var randomfloatarraymobile = useMemo(
    () => ["-7rem", "-7.5rem", "56.7rem"],
    []
  );
  useEffect(() => {
    setCurrentLocation(
      new URL(document.URL).protocol + "//" + new URL(document.URL).hostname
    );
  }, []);
  function extractInputs(mainel, submitobj) {
    mainel.childNodes.forEach((el) => {
      if (el.childElementCount == 0 || el.tagName == "SELECT") {
        if (el.getAttribute("name")) {
          submitobj[el.getAttribute("name")] = el.value;
        }
      } else {
        extractInputs(el, submitobj);
      }
    });
    return submitobj;
  }
  var sendmessage = async (msg) => {
    let newArr = [...allmsg, { role: "user", content: msg.trim() }];
    // setAllmsg(newArr);
    setAllmsg((el) => {
      var newel = el.map((ell) => {
        delete ell.allowbuttons;
        // delete ell.userSpecificLink;
        return ell;
      });
      return [...newel, { role: "user", content: msg.trim() }];
    });
    document
      .querySelectorAll(".chatMessageButton")
      .forEach((htmlel) => (htmlel.disabled = true));
    // setAllmsg([...allmsg, ]);
    setShowBookingForm(false);
    var div = document.createElement("div");
    var h3 = document.createElement("div");
    div.className = "flex justify-end lpuai-response";
    h3.className =
      "text-lg max-w-[60%] bg-[#FF7E00] break-words text-white p-[0.5rem] md:p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]";
    h3.innerHTML = `<div className="flex  md:gap-[0.5rem] gap-[0.3rem] py-[0.7rem] "><div
    className="bg-[#000]  p-3   w-4 h-4 rounded-full  animate-bounce blue-circle" style="animation-delay: 0.1s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    className="bg-[#000]  p-3  w-4 h-4 rounded-full animate-bounce green-circle" style="animation-delay: 0.3s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    className="bg-[#000]  p-3   w-4 h-4 rounded-full animate-bounce red-circle" style="animation-delay: 0.5s;padding:0;width:1rem;height:1rem;"
  ></div></div>`;
    div.appendChild(h3);
    setTimeout(() => {
      document?.getElementById("lpuai-chatscreeen")?.appendChild(div);
    }, 10);
    setTimeout(() => {
      document
        ?.getElementById("lpuai-chatscreeen")
        ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    //   document.getElementById("lpuai-chatscreeen").appendChild(`<div className=" ">
    //   <h3
    //     className=""
    //     style="font-family: 'rubik'"
    //   >${msg.trim()}</h3>
    // </div>`);
    // document.getElementById("lpuai-chatscreeen")
    //   .appendChild(`<div className="flex justify-end ">
    //   <h3
    //   className="text-lg max-w-[60%] bg-[#083c83] break-words text-white p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]"
    //   style="font-family: 'rubik'"
    //   >...</h3>
    // </div>`);
    try {
      let { data } = await axios.post("/api/aiResponse", {
        transcript: [...allmsg, { role: "user", content: msg.trim() }],
      });

      // console.log(data);
      setShowBookingForm(false);
      document.querySelectorAll(".lpuai-response").forEach((el) => el.remove());
      setAllmsg((el) => {
        var newel = el.map((ell) => {
          delete ell.allowbuttons;
          // delete ell.userSpecificLink;
          return ell;
        });
        return [...newel, data.response];
      });
      setTimeout(() => {
        document
          ?.getElementById("lpuai-chatscreeen")
          ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      }, 12);
      setTimeout(() => {
        // console.log(allmsg);
        // allmsg.at(-1).allowbuttons = true;
        setAllmsg((ell) => [
          ...ell.slice(0, ell.length - 1),
          { allowbuttons: true, ...data.response },
        ]);
      }, 2000);
      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => (htmlel.disabled = false));
      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => htmlel.focus());
    } catch (error) {
      document.querySelectorAll(".lpuai-response").forEach((el) => el.remove());
      setAllmsg((el) => [
        ...el,
        {
          role: "assistant",
          content: `We Got An Technical Problem. Please Contact Us If This Problem Repeat.`,
        },
      ]);
      setTimeout(() => {
        document
          ?.getElementById("lpuai-chatscreeen")
          ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => (htmlel.disabled = false));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      document
        ?.getElementById("lpuai-chatscreeen")
        ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [ShowBookingForm]);

  return (
    <div className="min-h-[100vh] w-full bg-[#000] md:overflow-auto overflow-hidden">
      <Head>
        <title>LPU AI</title>
      </Head>

      <div className="block h-0 md:h-[5rem]" />
      <div className="group fixed bottom-5 right-5 p-2  flex items-end justify-end w-24 h-24 z-[90]">
        {/* <!-- main --> */}
        <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-l from-[#FF7E00] to-[#ac5701] z-50 absolute  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            strokeWidth="1"
            stroke="currentColor"
            className="w-6 h-6 group-hover:rotate-90   transition-all duration-[0.6s]"
          >
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
          </svg>
        </div>
        {/* <!-- sub left --> */}
        <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16   flex  p-[10px] hover:p-[14px] bg-[#EDF3F7] scale-100 hover:bg-[#0B65C2] hover:text-white text-[#0B65C2]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-linkedin w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </div>
        {/* <!-- sub top --> */}
        <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16   flex  p-[10px] hover:p-[14px] bg-[#EDF3F7] scale-100 hover:bg-[#172F63] hover:text-white text-[#172F63]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-linkedin w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </div>
        {/* <!-- sub middle --> */}
        <div className="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14 flex  p-[10px] hover:p-[14px] bg-[#EDF3F7] scale-100 hover:bg-[#DE3411] hover:text-white text-[#DE3411]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-linkedin w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
          </svg>
        </div>
      </div>
      {Homepage ? (
        <div>
          <div className="flex md:justify-between gap-[1rem]  md:flex-row flex-col-reverse w-full min-h-[54vh] mt-[2.5rem] px-3 md:px-[2rem]">
            <div className="flex flex-col justify-between w-full md:w-[31rem]">
              <div className="flex flex-col " style={{ fontFamily: "poppins" }}>
                <h3 className="text-[2rem]">LPU&apos;s First</h3>
                <h3
                  className="text-[3rem] leading-[1]"
                  style={{ fontFamily: "rubik" }}
                >
                  AI Powered
                </h3>
                <h3 className="text-[2rem]">Customised Assistant</h3>
              </div>
              <div
                className="flex flex-col gap-3 text-slate-300 text-sm md:text-base"
                style={{ fontFamily: "poppins" }}
              >
                <h3>
                  This is an UNOFFICIAL AI Assistant for Lovely Professional
                  University (LPU). All the information provided is based on
                  LPU&apos;s official websites. For the most accurate & latest
                  info refer to LPU&apos;s official channels.
                </h3>
                <span className="whitespace-nowrap flex gap-[0rem] flex-wrap mt-3">
                  <h3>{`This bot was developed by `}</h3>
                  <Link
                    href="https://sam.appambient.com"
                    className="text-blue-500 underline ml-2"
                  >
                    Sam Shubham
                  </Link>
                  <span className="flex gap-[0.5rem] flex-wrap">
                    <h3>{`and still under Testing`}</h3>
                    {/* <Link
                      href={"/Disclaimer"}
                      className="text-blue-500 underline"
                    >
                      disclaimer
                    </Link> */}
                  </span>
                </span>
              </div>
            </div>
            <div className="grid relative place-items-center md:absolute top-[38%] md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2">
              <div>
                {/* <div className="absolute rounded-full z-[1] h-[0.3rem] w-[0.3rem] bg-[#FF7E00] right-1/2 top-0 -translate-y-1/2 /-translate-x-1/2"></div> */}
                {/* <div className="absolute rounded-full z-[1] h-[0.3rem] w-[0.3rem] bg-[#FF7E00] top-1/2 right-0 -translate-y-1/2 /-translate-x-1/2"></div> */}
                <div
                  style={{
                    animation: "sparkeanim 2s infinite",
                    animationDelay: "0.1s",
                    "--topstart": "40%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.9s infinite",
                    animationDelay: "0s",
                    "--topstart": "20%",
                    "--topend": "50%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.7s infinite",
                    animationDelay: "0.8s",
                    "--topstart": "10%",
                    "--topend": "30%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.4s infinite",
                    animationDelay: "0.5s",
                    "--topstart": "50%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.2s infinite",
                    animationDelay: "0.2s",
                    "--topstart": "70%",
                    "--topend": "90%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.5s infinite",
                    animationDelay: "0.3s",
                    "--topstart": "40%",
                    "--topend": "60%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2s infinite",
                    animationDelay: "0.4s",
                    "--topstart": "20%",
                    "--topend": "40%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                {
                  // ----------------right_pane----------------------
                }
                <div
                  style={{
                    animation: "sparkeanimright 2.4s infinite",
                    animationDelay: "0.2s",
                    "--topstart": "40%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.2s infinite",
                    animationDelay: "0.1s",
                    "--topstart": "20%",
                    "--topend": "50%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.3s infinite",
                    animationDelay: "0s",
                    "--topstart": "10%",
                    "--topend": "30%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.2s infinite",
                    animationDelay: "0.8s",
                    "--topstart": "50%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2s infinite",
                    animationDelay: "0.5s",
                    "--topstart": "70%",
                    "--topend": "90%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.8s infinite",
                    animationDelay: "0.4s",
                    "--topstart": "40%",
                    "--topend": "60%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.5s infinite",
                    animationDelay: "0.3s",
                    "--topstart": "20%",
                    "--topend": "40%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#FF7E00] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                {/* <div className="absolute z-[1] h-[1rem] w-[1rem] bg-red-400 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div> */}
              </div>
              <img
                className="w-[20rem] brightness-85 contrast-125 p-8"
                src="/mainLogoCircle.png"
                alt=""
              />
            </div>
            <div className="pr-[2.5rem] md:block hidden">
              <div className="flex flex-col justify-between h-full">
                <div
                  className="flex items-end flex-col gap-1"
                  style={{ fontFamily: "rubik" }}
                >
                  <div className="flex items-center justify-center text-[4rem]">
                    <h3>60</h3>
                    <i className="text-[3rem] pt-[0.5rem] fi fi-br-plus-small flex items-center text-[#FF7E00]"></i>
                  </div>
                  <div>
                    <h3
                      className=" text-slate-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      Official Weblink Sources
                    </h3>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <div className="flex items-start justify-center text-[4rem]">
                    <h3>1</h3>
                    <h3 className="text-[1.4rem] font-semibold pt-[1.3rem] flex items-center text-[#FF7E00]">
                      st
                    </h3>
                  </div>
                  <div>
                    <h3
                      className=" text-slate-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      AI Assistant @LPU
                    </h3>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <div className="flex items-start justify-center text-[4rem]">
                    <h3>24</h3>
                    <h3 className="text-[1.4rem] font-semibold pt-[1.3rem] flex items-center text-[#FF7E00]">
                      Hours
                    </h3>
                  </div>
                  <div>
                    <h3
                      className=" text-slate-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      Support available via AI
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] w-full items-center md:mt-0 mt-[1rem]">
            <h3
              className="text-[2rem] text-[#FF7E00]"
              style={{ fontFamily: "rubik" }}
            >
              Let&apos;s Get Started
            </h3>
            <div className="flex md:flex-row flex-wrap flex-col md:pb-0 pb-[8rem] gap-[1rem] text-black">
              {popularPrompts[0] &&
                popularPrompts.map((el, idx) => (
                  <button
                    key={
                      (el.question || "") +
                      String(Math.floor(Math.random() * 99999))
                    }
                    onClick={() => {
                      setHomepage(false);
                      sendmessage(el.question);
                    }}
                    data-aos="fade-up"
                    data-aos-delay={100 * idx}
                    style={{
                      animationName: "littleanimatebg",
                      animationTimingFunction: "ease-in",
                      animationDelay: `${150 * (idx * 2)}ms`,
                      animationDuration: "1s",
                      transitionDuration: "300ms",
                    }}
                    className="p-3 /bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] /hover:bg-[#FF7E00] transition-all duration-300 cursor-pointer rounded-md"
                  >
                    {el.question}
                  </button>
                ))}

              {/* <button
                onClick={() => {
                  setHomepage(false);
                  sendmessage("How can I file for a Divorce in Pakistan?");
                }}
                className="p-3 bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] hover:bg-[#FF7E00] transition-all duration-300 cursor-pointer rounded-md"
              >
                How can I file for a Divorce in Pakistan?
              </button>
              <button
                onClick={() => {
                  setHomepage(false);
                  sendmessage(
                    "Tell me more about Child Custody Laws in Pakistan?"
                  );
                }}
                className="p-3 bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] /hover:bg-[#FF7E00] transition-all duration-300 cursor-pointer rounded-md"
              >
                Tell me more about Child Custody Laws in Pakistan?
              </button> */}
            </div>
          </div>
          {/* <div className="block h-[3.5rem] w-full" /> */}
          <div className="fixed md:fixed bottom-0 z-[2] pb-[2rem] bg-[#000] left-0 right-0 px-[0.2rem] md:px-[15rem] justify-center">
            <div className="flex flex-col gap-[2rem] w-full items-center">
              <div className="w-full">
                <form
                  onSubmit={(el) => {
                    el.preventDefault();
                    setHomepage(false);
                    sendmessage(el.target["lpuai-input"].value);
                    el.target["lpuai-input"].value = "";
                  }}
                  className="w-full"
                  id="Main-Home-Inputform-For-lpuai"
                >
                  <div className="relative mx-auto w-full md:w-[90%] flex gap-2">
                    <div className="absolute flex  inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      name="lpuai-input"
                      className="block w-full py-[1.2rem] /md:py-4  pr-2 /pr-4  pl-10 outline-none md:text-sm text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                      placeholder="Ask LPU AI  a question"
                      style={{ fontFamily: "rubik" }}
                      required
                    />
                    <button
                      type="submit"
                      style={{ fontFamily: "rubik" }}
                      className="/absolute whitespace-nowrap text-black right-2.5 md:min-w-[9rem]  bottom-2.5 md:py-[0.7rem] py-[0.5rem] bg-[#FF7E00] hover:bg-[#FF7E00] focus:ring-4 focus:outline-none  font-medium rounded-lg md:text-md text-sm px-2 min-w-[30%] md:px-4 /py-2 "
                    >
                      Ask Question
                      {/* <i className="fi fi-rs-paper-plane flex items-center"></i> */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-[0.5rem] w-full">
          <div className="pl-[0.5rem] md:pl-[6rem] md:block flex justify-start mt-[4rem] md:mt-[2rem] ">
            <div className="flex items-center gap-[0.7rem]">
              <i
                onClick={() => {
                  setHomepage(true);
                }}
                className="rotate-[180deg] text-3xl md:text-[3rem] p-0 hover:scale-[1.10] fi fi-ss-arrow-circle-right flex items-center text-[#FF7E00] transition-all duration-200 cursor-pointer"
              ></i>
              <h3
                className="block md:hidden text-xl"
                style={{ fontFamily: "rubik" }}
              >
                Go To Homepage
              </h3>
            </div>
          </div>
          <div className="w-full">
            <div
              id="lpuai-chatscreeen"
              className="h-[77vh] md:h-[74vh] pt-[0.5rem] md:pt-[5rem] md:pb-[4rem] pb-[3rem] scrollbar-hide w-full md:pl-0 pl-[0.5rem] pr-[0.5rem] md:pr-[9.7rem] flex flex-col gap-[1rem] md:gap-[2rem] overflow-y-scroll"
            >
              {/* <div className="flex justify-start ">
              <h3
                className="text-lg max-w-[60%] bg-slate-200 break-words p-[1rem] rounded-tr-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]"
                style={{ fontFamily: "rubik" }}
              >
                helo
              </h3>
            </div>
            <div className="flex justify-end ">
              <h3
                className="text-lg max-w-[60%] bg-[#083c83] break-words text-white p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]"
                style={{ fontFamily: "rubik" }}
              >
                hey
              </h3>
            </div> */}
              {allmsg.map((el) => (
                <>
                  <div
                    className={`flex ${
                      el.role == "user" ? "justify-start" : "justify-end"
                    }`}
                    key={Math.random() + JSON.stringify(el)}
                  >
                    <div
                      className={`text-sm md:text-sm max-w-[100%] md:max-w-[60%] ${
                        el.role == "user"
                          ? "bg-[#f2f2f2] rounded-tr-md"
                          : "bg-[#FF7E00]  text-black rounded-tl-md"
                      } p-[0.5rem] md:p-[0.7rem] break-words text-black  rounded-br-md rounded-bl-md border-2 border-[rgba(0,0,0,0.05)] `}
                      style={{ fontFamily: "rubik" }}
                    >
                      <h3 style={{ "white-space": "break-spaces" }}>
                        {el.content}
                      </h3>

                      {el.allowbuttons ? (
                        <div className="flex gap-[1rem] justify-end mt-[0.3rem] md:p-3 md:mt-[0.5rem]">
                          <button
                            onClick={() => {
                              setShowBookingForm(true);
                            }}
                            className="bg-black text-white p-3 text-xs md:text-xs rounded-md hover:scale-[1.03] transition-all duration-300"
                            style={{ fontFamily: "rubik" }}
                          >
                            Talk to a Counsler
                          </button>
                          {/* <button
                            onClick={() => {
                              window.open("https://adamglobal.com");
                            }}
                            className="bg-black text-white p-3 text-xs md:text-base rounded-md hover:scale-[1.03] transition-all duration-300"
                            style={{ fontFamily: "rubik" }}
                          >
                            Claim free tax guide
                          </button> */}
                        </div>
                      ) : (
                        <></>
                      )}
                      {el.role != "user" && el?.userSpecificLink[0] ? (
                        <div className="flex justify-end flex-wrap ">
                          <div className="/bg-white p-2 flex flex-col gap-3 rounded-md w-full /max-w-[60%] text-black">
                            <hr className="bg-[#a7914f] text-[#a7914f] h-[1px] border-0" />
                            <h3 className="text-md">Relevant Links</h3>
                            <div className="flex gap-2 flex-wrap">
                              {el?.userSpecificLink[0]
                                ? el?.userSpecificLink
                                    .slice(0, 4)
                                    .map((el, indexussplin) => (
                                      <span
                                        onClick={() => window.open(el)}
                                        key={Math.random() + indexussplin}
                                        className="p-2 w-fit hover:text-[#ffef77] cursor-pointer blue-600 flex gap-[0.3rem] items-center text-xs line-clamp-1 bg-[#a7914f]  text-white shadow-inner rounded-md transition-all duration-200"
                                      >
                                        {(() => {
                                          if (
                                            new RegExp(
                                              `^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\.+$`
                                            ).test(el)
                                          ) {
                                            return (
                                              <i className="fi fi-brands-youtube flex items-center text-red-500 text-xl" />
                                            );
                                          } else if (el.includes("24justice")) {
                                            return (
                                              <img
                                                src="/24justice_orignal_withoutbg.png"
                                                className="w-[2rem]"
                                              />
                                            );
                                          } else {
                                            return (
                                              <i className="fi fi-ss-globe flex items-center text-xl"></i>
                                            );
                                          }
                                        })()}
                                        <h3>{el}</h3>
                                      </span>
                                    ))
                                : ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ))}

              {ShowBookingForm ? (
                <div className={`flex justify-end`}>
                  <div className="bg-[#FF7E00] text-black w-[100%] md:w-[60%] p-6 rounded-xl">
                    <form
                      onSubmit={async (bookingform) => {
                        bookingform.preventDefault();
                        // var submitobj = {};
                        var submitobj = extractInputs(
                          bookingform.currentTarget,
                          {}
                        );
                        if (!SendingMail) {
                          var toastid = toast.loading("Sending Enquiry...");
                          setSendingMail(true);
                          var { data: axres } = await axios.post(
                            "/api/sendEmail",
                            submitobj
                          );
                          if (axres.status) {
                            setSendingMail(false);
                            toast.update(toastid, {
                              render: "Sucessfully sent",
                              type: "success",
                              isLoading: false,
                              autoClose: 1000,
                            });
                            router.push({ pathname: "/MailSent" });
                            // toast.success("Sucessfully sent");
                          } else {
                            setSendingMail(false);
                            toast.update(toastid, {
                              render: "Error occured",
                              type: "error",
                              isLoading: false,
                              autoClose: 1000,
                            });
                            // toast.error("Error occured");
                          }
                        } else {
                          toast.warning("Already In Progress");
                        }
                      }}
                      className="flex flex-col gap-[0.8rem]"
                    >
                      <div
                        className="w-full text-xl"
                        style={{ fontFamily: "rubik" }}
                      >
                        <h3>Talk to a Counselor</h3>
                      </div>
                      <div
                        className="flex flex-col gap-[1rem]"
                        style={{ fontFamily: "rubik" }}
                      >
                        <input
                          required
                          type="text"
                          className="w-full p-3 rounded-md"
                          placeholder="Name"
                          name="User Name"
                        />
                        <input
                          required
                          type="email"
                          className="w-full p-3 rounded-md"
                          placeholder="Email"
                          name="Email"
                        />
                        <input
                          required
                          type="number"
                          className="w-full p-3 rounded-md"
                          placeholder="Phone number (including country code)"
                          name="Phone number"
                        />
                        <select
                          name="Contacting from"
                          required
                          className="w-full p-3 rounded-md"
                          // defaultValue={"Your nationality"}
                        >
                          <option disabled selected value={""}>
                            Where are you currently contacting us from?
                          </option>
                          {allCounties.map((el) => (
                            <option
                              key={
                                JSON.stringify(Math.random()) +
                                el.name +
                                el.code
                              }
                              value={el.name}
                            >
                              {el.name}
                            </option>
                          ))}
                        </select>
                        {/* <input
                        type="text"
                        className="w-full p-3 rounded-md"
                      /> */}
                        {/* <select
                          name="Business"
                          required
                          className="w-full p-3 rounded-md"
                          // defaultValue={"Your nationality"}
                        >
                          <option disabled selected value={""}>
                            Type of business
                          </option>
                          <option value="Free Zones">Free Zones</option>
                          <option value="Mainland">Mainland</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Off-shore">Offshore</option>
                          <option value="Other">Other</option>
                          <option value="None">None</option>
                        </select> */}
                        <textarea
                          type="text"
                          className="w-full p-3 rounded-md"
                          placeholder="What additional information can you provide?"
                          name="Additional info"
                        />
                      </div>
                      <div className="w-full flex justify-end">
                        <button
                          className="bg-[#000] text-md px-4 py-2 rounded-md text-white"
                          style={{ fontFamily: "rubik" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="fixed md:fixed bottom-0 z-[2] mb-[2rem] bg-[#000] left-0 right-0 px-[0.2rem] md:px-[15rem] justify-center">
              <div className="flex flex-col gap-[2rem] w-full items-center">
                <div className="w-full">
                  <form
                    onSubmit={(el) => {
                      el.preventDefault();
                      setHomepage(false);
                      sendmessage(el.target["lpuai-input"].value);
                      el.target["lpuai-input"].value = "";
                    }}
                    className="w-full"
                    id="Main-Home-Inputform-For-lpuai"
                  >
                    <div className="relative mx-auto w-full md:w-[90%] flex gap-2 /m-4">
                      <div className="absolute flex  inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        name="lpuai-input"
                        className="block w-full py-[1.2rem] /md:py-4  pr-2 /pr-4  pl-10 outline-none md:text-sm text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                        placeholder="Ask LPU AI  a question"
                        style={{ fontFamily: "rubik" }}
                        required
                      />
                      <button
                        type="submit"
                        style={{ fontFamily: "rubik" }}
                        className="/absolute text-black right-2.5 md:min-w-[9rem]  bottom-2.5 md:py-[0.7rem] py-[0.5rem] bg-[#FF7E00] hover:bg-[#FF7E00] focus:ring-4 focus:outline-none  font-medium rounded-lg md:text-md text-sm px-2 min-w-[30%] md:px-4 /py-2 "
                      >
                        Ask Question
                        {/* <i className="fi fi-rs-paper-plane flex items-center"></i> */}
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="w-full flex flex-col gap-[0.5rem]">
                <hr />
                <div className="w-full flex justify-between">
                  <div>
                    <h3 className="md:max-w-max break-words text-xs my-[0.5rem]">
                      {`Experience Pakistan's first AI-powered legal platform with
                      24Justice`}
                    </h3>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
