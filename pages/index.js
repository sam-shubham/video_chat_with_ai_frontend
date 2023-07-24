import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import allCounties from "@/libs/database/allCounties";
import { toast } from "react-toastify";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [CurrentLocation, setCurrentLocation] = useState("");
  const [Homepage, setHomepage] = useState(true);
  const [allmsg, setAllmsg] = useState([]);
  const [ShowBookingForm, setShowBookingForm] = useState(false);
  var randomfloatarray = useMemo(() => ["-7rem", "-7.5rem", "56.7rem"], []);
  var randomfloatarraymobile = useMemo(
    () => ["-7rem", "-7.5rem", "56.7rem"],
    []
  );
  useEffect(() => {
    setCurrentLocation(
      new URL(document.URL).protocol + "//" + new URL(document.URL).hostname
    );
  }, []);

  var sendmessage = async (msg) => {
    let newArr = [...allmsg, { role: "user", content: msg.trim() }];
    // setAllmsg(newArr);
    setAllmsg((el) => {
      var newel = el.map((ell) => {
        delete ell.allowbuttons;
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
    div.className = "flex justify-end bizgpt-response";
    h3.className =
      "text-lg max-w-[60%] bg-[#083c83] break-words text-white p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]";
    h3.innerHTML = `<div class="flex  gap-[0.5rem] py-[0.7rem] "><div
    class="bg-[#f4f4f4]  p-3   w-4 h-4 rounded-full  animate-bounce blue-circle" style="animation-delay: 0.1s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    class="bg-[#f4f4f4]  p-3  w-4 h-4 rounded-full animate-bounce green-circle" style="animation-delay: 0.3s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    class="bg-[#f4f4f4]  p-3   w-4 h-4 rounded-full animate-bounce red-circle" style="animation-delay: 0.5s;padding:0;width:1rem;height:1rem;"
  ></div></div>`;
    div.appendChild(h3);
    setTimeout(() => {
      document?.getElementById("bizgpt-chatscreeen")?.appendChild(div);
    }, 10);
    setTimeout(() => {
      document
        ?.getElementById("bizgpt-chatscreeen")
        ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    //   document.getElementById("bizgpt-chatscreeen").appendChild(`<div class=" ">
    //   <h3
    //     class=""
    //     style="font-family: 'rubik'"
    //   >${msg.trim()}</h3>
    // </div>`);
    // document.getElementById("bizgpt-chatscreeen")
    //   .appendChild(`<div class="flex justify-end ">
    //   <h3
    //   class="text-lg max-w-[60%] bg-[#083c83] break-words text-white p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]"
    //   style="font-family: 'rubik'"
    //   >...</h3>
    // </div>`);
    try {
      let { data } = await axios.post("/api/aiResponse", {
        transcript: [...allmsg, { role: "user", content: msg.trim() }],
      });

      // console.log(data);
      setShowBookingForm(false);
      document
        .querySelectorAll(".bizgpt-response")
        .forEach((el) => el.remove());
      setAllmsg((el) => {
        var newel = el.map((ell) => {
          delete ell.allowbuttons;
          return ell;
        });
        return [...newel, data.response];
      });
      setTimeout(() => {
        document
          ?.getElementById("bizgpt-chatscreeen")
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
      document
        .querySelectorAll(".bizgpt-response")
        .forEach((el) => el.remove());
      setAllmsg((el) => [
        ...el,
        {
          role: "assistant",
          content: `We Got An Technical Problem. Please Contact Us If This Problem Repeat.`,
        },
      ]);
      setTimeout(() => {
        document
          ?.getElementById("bizgpt-chatscreeen")
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
        ?.getElementById("bizgpt-chatscreeen")
        ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [ShowBookingForm]);

  return (
    <div className="min-h-[100vh] w-full bg-[#f4f4f4] md:overflow-auto overflow-hidden">
      <div className="block h-0 md:h-[5rem]" />
      {Homepage ? (
        <div className="">
          <div className="/overflow-y-scroll /overflow-x-hidden ">
            <div className="flex md:flex-row md:gap-0 gap-[5rem] flex-col-reverse /justify-between justify-center w-full /mt-[4rem] /mt-[2.5rem] /md:mt-[5rem] relative">
              <div className="flex flex-col justify-center gap-[0rem] md:gap-[1rem] items-center ml-0 mt-[1rem] /md:ml-[10%]  z-[1]">
                <h3
                  className="text-lg md:text-[2.5rem] leading-[1rem] font-semibold"
                  style={{ fontFamily: "kanit" }}
                >
                  Got questions about UAE’s Corporate Tax?
                </h3>
                <div
                  className="text-[2rem] md:text-[4rem] flex font-semibold gap-[0.5rem] md:gap-[0.5rem]"
                  style={{ fontFamily: "kanit" }}
                >
                  <h3>Just ask</h3>
                  <h3 className="text-[#083c83] font-semibold">BizGPT</h3>
                </div>
                <h3
                  className="md:text-start text-center text-[0.8rem] md:text-[1rem] /max-w-[35rem]"
                  style={{ fontFamily: "kanit" }}
                >
                  BizGPT is a the first All in One Business Solution Assistant
                  Ever (Brought to you by Adam Global)
                </h3>
              </div>
              {/* <div className="relative flex items-center justify-center">
                <img
                  className="md:mr-[10rem] w-[30rem]"
                  src="/Chatbot.png"
                  alt=""
                />
                <img
                  className="absolute left-[50%] md:left-[38%] w-[6rem] md:w-[8rem] top-[55%] translate-x-[-50%] translate-y-[-50%]"
                  src="/robot.gif"
                  alt=""
                />
              </div> */}

              <div className="sadgrdsfg34547  /left-[22%] /bottom-0 md:w-auto w-full md:right-[10rem]">
                {/* <div className="container32AD435 ">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div> */}
              </div>
            </div>
            <div className="md:pl-[10rem] md:translate-y-[-15rem] md:mb-[-15rem] pt-[1.8rem] /pt-[5.5rem] md:pt-0 md:pr-[9rem] /mt-[1rem] ">
              <div className="flex w-[100%] opacity-50 relative /overflow-hidden">
                <img
                  className="w-[100%] md:w-[100%] opacity-60 z-[2]"
                  src="Beige Minimal.png"
                  alt=""
                />
                {/* <img
                  className="hidden md:block md:w-[50%]"
                  src="Beige Minimal.png"
                  alt=""
                /> */}
                {/* <img
                  className="hidden md:block md:w-[33.3%] "
                  src="Beige Minimal.png"
                  alt=""
                /> */}
                <div
                  style={{
                    "--animationdelay": "0s",
                    "--left":
                      randomfloatarray[
                        Math.floor(Math.random() * randomfloatarray.length)
                      ],
                    // "--left": "-7rem", full float
                    // "--left": "11.5rem",
                    "--bottom": "20rem",
                    // "--bottom": "10rem",
                    "--mobileleft": "13rem",
                    "--mobilebottom": "6rem",
                  }}
                  className="absolute textfloatanimation opacity-0 bottom-[4.5rem] left-[9rem] md:left-[11.5rem] md:bottom-[10rem] px-2 md:px-4 py-2 bg-slate-300 rounded-xl z-[-1]"
                >
                  <h3
                    className="text-[0.5rem] md:text-base z-[1]"
                    style={{ fontFamily: "rubik" }}
                  >
                    Speak to me about Company Formation
                  </h3>
                </div>
                <div
                  style={{
                    "--animationdelay": "3s",
                    "--left":
                      randomfloatarray[
                        Math.floor(Math.random() * randomfloatarray.length)
                      ],
                    // "--left": "-7.5rem", full float
                    // "--left": "20rem",
                    "--bottom": "20rem",
                    // "--bottom": "7rem",
                    "--mobileleft": "15rem",
                    "--mobilebottom": "5rem",
                  }}
                  className="absolute textfloatanimation opacity-0   md:block left-[10rem] md:left-[20rem] bottom-[1rem] md:bottom-[7rem] px-2 md:px-4 py-2 bg-slate-300 rounded-xl z-[-1]"
                >
                  <h3
                    className="text-[0.5rem] md:text-base z-[1]"
                    style={{ fontFamily: "rubik" }}
                  >
                    Поговори со мной о налогах
                  </h3>
                </div>
                <div
                  style={{
                    "--animationdelay": "6s",
                    "--left":
                      randomfloatarray[
                        Math.floor(Math.random() * randomfloatarray.length)
                      ],
                    // "--left": "69rem", full float
                    "--bottom": "20rem",
                    // "--bottom": "6rem",
                    "--mobileleft": "8rem",
                    "--mobilebottom": "6rem",
                  }}
                  className="absolute textfloatanimation opacity-0 left-[7.4rem] md:left-[36rem] bottom-[2rem] md:bottom-[6rem] px-2 md:px-4 py-2 bg-slate-300 rounded-xl z-[-1]"
                >
                  <h3
                    className="text-[0.5rem] md:text-base z-[1]"
                    style={{ fontFamily: "rubik" }}
                  >
                    跟我谈谈公司成立
                  </h3>
                </div>
                <div
                  style={{
                    "--animationdelay": "9s",
                    "--left":
                      randomfloatarray[
                        Math.floor(Math.random() * randomfloatarray.length)
                      ],
                    // "--left": "56.7rem", full float
                    "--bottom": "20rem",
                    // "--bottom": "7rem",
                    "--mobileleft": "10rem",
                    "--mobilebottom": "3rem",
                  }}
                  className="absolute textfloatanimation opacity-0  md:block left-[8rem] md:left-[49.7rem] bottom-[2rem] md:bottom-[7rem] px-2 md:px-4 py-2 bg-slate-300 rounded-xl z-[-1]"
                >
                  <h3
                    className="text-[0.5rem] md:text-base z-[1]"
                    style={{ fontFamily: "rubik" }}
                  >
                    ما العمل الذي يناسبني بشكل أفضل؟ البر الرئيسي أم المنطقة
                    الحرة؟
                  </h3>
                </div>
                <div
                  style={{
                    "--animationdelay": "12s",
                    "--left":
                      randomfloatarray[
                        Math.floor(Math.random() * randomfloatarray.length)
                      ],
                    // "--left": "55rem", full float
                    "--bottom": "20rem",
                    // "--bottom": "10rem",
                    "--mobileleft": "9rem",
                    "--mobilebottom": "6rem",
                  }}
                  className="absolute textfloatanimation opacity-0 left-[17rem] md:left-[65rem] bottom-[4rem] md:bottom-[10rem] px-2 md:px-4 py-2 bg-slate-300 rounded-xl z-[-1]"
                >
                  <h3
                    className="text-[0.5rem] md:text-base z-[1]"
                    style={{ fontFamily: "rubik" }}
                  >
                    میں اپنا ٹریڈ مارک کیسے رجسٹر کروں؟
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-[0.5rem] /mb-[6rem] mt-[4rem] /mt-[11rem] z-[1] md:px-[10rem] w-full items-center"
              style={{ fontFamily: "rubik" }}
            >
              <div>
                <h3>Start with one of our top prompts</h3>
              </div>
              <div className="z-[1] w-full px-[0.2rem] md:flex-row flex-col gap-[0.9rem] flex items-center">
                <div className="w-full px-[0.2rem] md:flex-row flex-col gap-[0.9rem] flex items-center">
                  <button
                    onClick={() => {
                      setHomepage(false);
                      sendmessage(
                        "What do free zone companies have to do for corporate tax?"
                      );
                    }}
                    className="p-3 bg-[#083c83] text-white items-center hover:scale-[1.02] transition-all duration-200 justify-center flex rounded-md md:w-[70%] w-full"
                  >
                    <h3 className="text-center">
                      Tax info for free zone companies
                    </h3>
                  </button>
                  <button
                    onClick={() => {
                      setHomepage(false);
                      sendmessage(
                        "What do mainland companies have to do for corporate tax?"
                      );
                    }}
                    className="p-3 bg-[#083c83] text-white items-center hover:scale-[1.02] transition-all duration-200 justify-center flex rounded-md md:w-[70%] w-full"
                  >
                    <h3 className="text-center">
                      Mainland company corporate tax
                    </h3>
                  </button>
                </div>
                <div className="w-full px-[0.2rem] md:flex-row flex-col gap-[0.9rem] flex items-center">
                  <button
                    onClick={() => {
                      setHomepage(false);
                      sendmessage(
                        "What do freelancers have to do for corporate tax?"
                      );
                    }}
                    className="p-3 bg-[#083c83] text-white items-center hover:scale-[1.02] transition-all duration-200 justify-center flex rounded-md md:w-[70%] w-full"
                  >
                    <h3 className="text-center">Freelancer corporate tax</h3>
                  </button>
                  <button
                    onClick={() => {
                      setHomepage(false);
                      sendmessage(
                        "I would like to talk to a tax expert about my corporate tax requirements"
                      );
                    }}
                    className="p-3 bg-[#083c83] text-white items-center hover:scale-[1.02] transition-all duration-200 justify-center flex rounded-md md:w-[70%] w-full"
                  >
                    <h3 className="text-center">Talk to a real person</h3>
                  </button>
                </div>
              </div>
            </div>
            <div className="block h-[6rem]" />
          </div>
          <div className="block h-[3.5rem] w-full" />
          <div className="fixed md:fixed bottom-0 z-[2] bg-[#f4f4f4] left-0 right-0 px-[1rem] md:px-[10rem] justify-center">
            <div className="flex flex-col gap-[2rem] w-full items-center">
              <div className="w-full">
                <form
                  onSubmit={(el) => {
                    el.preventDefault();
                    setHomepage(false);
                    sendmessage(el.target["bizgpt-input"].value);
                    el.target["bizgpt-input"].value = "";
                  }}
                  className="w-full"
                  id="Main-Home-Inputform-For-Bizgpt"
                >
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                      name="bizgpt-input"
                      className="block w-full p-4 pl-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                      placeholder="Ask BizGPT a question"
                      style={{ fontFamily: "rubik" }}
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 py-[0.67rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 /py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <i class="fi fi-rs-paper-plane flex items-center"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full flex flex-col gap-[0.5rem]">
                <hr />
                <div className="w-full flex justify-between">
                  <div>
                    <h3 className="md:max-w-max break-words text-xs my-[0.5rem]">
                      BizGPT is a the first All in One Business Solution
                      Assistant Ever (Brought to you by Adam Global)
                    </h3>
                  </div>
                  {/* <div></div> */}
                </div>
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
                className="rotate-[180deg] text-3xl md:text-[3rem] p-0 hover:scale-[1.10] fi fi-ss-arrow-circle-right flex items-center text-[#083c83] transition-all duration-200 cursor-pointer"
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
              id="bizgpt-chatscreeen"
              className="h-[77vh] md:h-[74vh] pt-[0.5rem] md:pt-[5rem] md:pb-[4rem] pb-[1rem] scrollbar-hide w-full md:pl-0 pl-[0.5rem] pr-[0.5rem] md:pr-[9.7rem] flex flex-col gap-[1rem] md:gap-[2rem] overflow-y-scroll"
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
                <div
                  className={`flex ${
                    el.role == "user" ? "justify-start" : "justify-end"
                  }`}
                  key={Math.random() + JSON.stringify(el)}
                >
                  <div
                    className={`text-sm md:text-lg max-w-[100%] md:max-w-[60%] ${
                      el.role == "user"
                        ? "bg-slate-200 rounded-tr-xl"
                        : "bg-[#083c83]  text-white rounded-tl-xl"
                    } p-[1rem] break-words  rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)] `}
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>{el.content}</h3>

                    {el.allowbuttons ? (
                      <div className="flex gap-[1rem] justify-end p-3 mt-[0.5rem]">
                        <button
                          onClick={() => {
                            setShowBookingForm(true);
                          }}
                          className="bg-blue-700 text-white p-3 text-xs md:text-base rounded-md hover:scale-[1.03] transition-all duration-300"
                          style={{ fontFamily: "rubik" }}
                        >
                          Talk to a consultant
                        </button>
                        <button
                          onClick={() => {
                            window.open("https://adamglobal.com");
                          }}
                          className="bg-blue-700 text-white p-3 text-xs md:text-base rounded-md hover:scale-[1.03] transition-all duration-300"
                          style={{ fontFamily: "rubik" }}
                        >
                          Claim free tax guide
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
              {ShowBookingForm ? (
                <div className={`flex justify-end`}>
                  <div className="bg-slate-200 w-[100%] md:w-[60%] p-6 rounded-xl">
                    <form
                      onSubmit={(bookingform) => {
                        bookingform.preventDefault();
                        setTimeout(() => {
                          alert(
                            "We Have Recevied Your Booking. We Will Contact You Asap For Your Query."
                          );
                        }, 200);
                      }}
                      // action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
                      // method="POST"
                      className="flex flex-col gap-[0.8rem]"
                    >
                      {/* <input type="hidden" name="oid" value="00D1t000000tZ3l" />
                      <input
                        type="hidden"
                        name="retURL"
                        value={`${CurrentLocation}/thankyou`}
                      />
                      <input
                        type="hidden"
                        name="lead_source"
                        value="bizGpt-Accounting Services"
                      /> */}

                      <div
                        className="w-full text-xl"
                        style={{ fontFamily: "rubik" }}
                      >
                        <h3>Talk To A consultant</h3>
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
                          placeholder="Phone number"
                          name="Phone number"
                        />
                        <select
                          name="Nationality"
                          required
                          className="w-full p-3 rounded-md"
                          // defaultValue={"Your nationality"}
                        >
                          <option disabled selected value={""}>
                            Your nationality
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
                        <select
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
                        </select>
                        <textarea
                          type="text"
                          className="w-full p-3 rounded-md"
                          placeholder="What additional information can you provide?"
                        />
                      </div>
                      <div className="w-full flex justify-end">
                        <button
                          className="bg-[#083c83] text-md px-4 py-2 rounded-md text-white"
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
            <div className="fixed bottom-0 left-0 right-0 px-[0.5rem] md:px-[10rem] justify-center ">
              <div className="flex flex-col gap-[2rem] mb-[1rem] md:mb-[1.5rem]">
                {/* <div></div> */}
                <div className="w-full">
                  <form
                    onSubmit={(el) => {
                      el.preventDefault();
                      setHomepage(false);
                      sendmessage(el.target["bizgpt-input"].value);
                      el.target["bizgpt-input"].value = "";
                    }}
                    className="w-full"
                  >
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                        name="bizgpt-input"
                        autoFocus={true}
                        className="block w-full px-4 py-5 pl-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                        placeholder="Ask BizGPT a question"
                        style={{ fontFamily: "rubik" }}
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 py-[0.89rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 /py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <i class="fi fi-rs-paper-plane flex items-center"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-full flex justify-between mb-[1rem] items-center">
                <div>
                  <h3 className="md:max-w-max break-words text-xs ">
                    BizGPT is a the first All in One Business Solution Assistant
                    Ever (Brought to you by Adam Global)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    var conf = confirm(
                      "We Need The Whole Chat To Identify The Probem With Replies.\nDo You Wish To Continue?"
                    );
                    if (conf) {
                      toast.success(
                        "We Successfully Recived The Chat To Identify The Problem."
                      );
                    }
                  }}
                  className="bg-red-500 text-white text-sm rounded-md px-[1rem] py-[0.5rem]"
                >
                  Report An Error
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
