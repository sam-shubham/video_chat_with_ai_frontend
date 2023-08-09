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
    div.className = "flex justify-end bizgpt-response";
    h3.className =
      "text-lg max-w-[60%] bg-[#DBBE67] break-words text-white p-[0.5rem] md:p-[1rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)]";
    h3.innerHTML = `<div class="flex  md:gap-[0.5rem] gap-[0.3rem] py-[0.7rem] "><div
    class="bg-[#000]  p-3   w-4 h-4 rounded-full  animate-bounce blue-circle" style="animation-delay: 0.1s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    class="bg-[#000]  p-3  w-4 h-4 rounded-full animate-bounce green-circle" style="animation-delay: 0.3s;padding:0;width:1rem;height:1rem;"
  ></div>
  <div
    class="bg-[#000]  p-3   w-4 h-4 rounded-full animate-bounce red-circle" style="animation-delay: 0.5s;padding:0;width:1rem;height:1rem;"
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
          // delete ell.userSpecificLink;
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
    <div className="min-h-[100vh] w-full bg-[#000] md:overflow-auto overflow-hidden">
      <div className="block h-0 md:h-[5rem]" />
      {Homepage ? (
        <div>
          <div className="flex md:justify-between gap-[1rem]  md:flex-row flex-col-reverse w-full min-h-[54vh] mt-[2.5rem] px-3 md:px-[2rem]">
            <div className="flex flex-col justify-between w-full md:w-[31rem]">
              <div className="flex flex-col " style={{ fontFamily: "poppins" }}>
                <h3 className="text-[2rem]">{`Pakistan's First`}</h3>
                <h3
                  className="text-[3rem] leading-[1]"
                  style={{ fontFamily: "rubik" }}
                >
                  AI Powered
                </h3>
                <h3 className="text-[2rem]">Legal Site</h3>
              </div>
              <div
                className="flex flex-col gap-3 text-slate-300 text-sm md:text-base"
                style={{ fontFamily: "poppins" }}
              >
                <h3>
                  {`Experience Pakistan's first AI-powered legal platform with
                  24Justice. For personalized, specific legal advice, contact us
                  via WhatsApp +92 308 5510031.`}
                </h3>
                <h3>
                  {`By using our site, you agree to our Terms and Conditions and
                  agree to our disclaimer`}
                </h3>
              </div>
            </div>
            <div className="grid relative place-items-center md:absolute top-[38%] md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2">
              <div>
                {/* <div className="absolute rounded-full z-[1] h-[0.3rem] w-[0.3rem] bg-[#bea559] right-1/2 top-0 -translate-y-1/2 /-translate-x-1/2"></div> */}
                {/* <div className="absolute rounded-full z-[1] h-[0.3rem] w-[0.3rem] bg-[#bea559] top-1/2 right-0 -translate-y-1/2 /-translate-x-1/2"></div> */}
                <div
                  style={{
                    animation: "sparkeanim 2s infinite",
                    animationDelay: "0.1s",
                    "--topstart": "40%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.9s infinite",
                    animationDelay: "0s",
                    "--topstart": "20%",
                    "--topend": "50%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.7s infinite",
                    animationDelay: "0.8s",
                    "--topstart": "10%",
                    "--topend": "30%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.4s infinite",
                    animationDelay: "0.5s",
                    "--topstart": "50%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.2s infinite",
                    animationDelay: "0.2s",
                    "--topstart": "70%",
                    "--topend": "90%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2.5s infinite",
                    animationDelay: "0.3s",
                    "--topstart": "40%",
                    "--topend": "60%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanim 2s infinite",
                    animationDelay: "0.4s",
                    "--topstart": "20%",
                    "--topend": "40%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
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
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.2s infinite",
                    animationDelay: "0.1s",
                    "--topstart": "20%",
                    "--topend": "50%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.3s infinite",
                    animationDelay: "0s",
                    "--topstart": "10%",
                    "--topend": "30%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.2s infinite",
                    animationDelay: "0.8s",
                    "--topstart": "50%",
                    "--topend": "80%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2s infinite",
                    animationDelay: "0.5s",
                    "--topstart": "70%",
                    "--topend": "90%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.8s infinite",
                    animationDelay: "0.4s",
                    "--topstart": "40%",
                    "--topend": "60%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                <div
                  style={{
                    animation: "sparkeanimright 2.5s infinite",
                    animationDelay: "0.3s",
                    "--topstart": "20%",
                    "--topend": "40%",
                  }}
                  className="absolute rounded-full z-[1] h-[0.2rem] w-[0.2rem] bg-[#bea559] top-1/2 -translate-y-1/2 /-translate-x-1/2"
                />
                {/* <div className="absolute z-[1] h-[1rem] w-[1rem] bg-red-400 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div> */}
              </div>
              <img className="w-[24rem]" src="/24justice_orignal.png" alt="" />
            </div>
            <div className="pr-[2.5rem] md:block hidden">
              <div className="flex flex-col justify-between h-full">
                <div
                  className="flex items-end flex-col gap-1"
                  style={{ fontFamily: "rubik" }}
                >
                  <div className="flex items-center justify-center text-[4rem]">
                    <h3>7</h3>
                    <i class="text-[3rem] pt-[0.5rem] fi fi-br-plus-small flex items-center text-[#DBBE67]"></i>
                  </div>
                  <div>
                    <h3
                      className=" text-slate-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      Years of experience
                    </h3>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <div className="flex items-start justify-center text-[4rem]">
                    <h3>1</h3>
                    <h3 class="text-[1.4rem] font-semibold pt-[1.3rem] flex items-center text-[#DBBE67]">
                      st
                    </h3>
                  </div>
                  <div>
                    <h3
                      className=" text-slate-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      Years of experience
                    </h3>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-1">
                  <div className="flex items-start justify-center text-[4rem]">
                    <h3>24</h3>
                    <h3 class="text-[1.4rem] font-semibold pt-[1.3rem] flex items-center text-[#DBBE67]">
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
              className="text-[2rem] text-[#DBBE67]"
              style={{ fontFamily: "rubik" }}
            >
              Popular Prompts
            </h3>
            <div className="flex md:flex-row flex-col md:pb-0 pb-[8rem] gap-[1rem] text-black">
              <button
                onClick={() => {
                  setHomepage(false);
                  sendmessage("How can I claim my inherited land in Pakistan?");
                }}
                className="p-3 bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] hover:bg-[#DBBE67] transition-all duration-300 cursor-pointer rounded-md"
              >
                How can I claim my inherited land in Pakistan?
              </button>
              <button
                onClick={() => {
                  setHomepage(false);
                  sendmessage("How can I file for a Divorce in Pakistan?");
                }}
                className="p-3 bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] hover:bg-[#DBBE67] transition-all duration-300 cursor-pointer rounded-md"
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
                className="p-3 bg-[#000] text-white hover:bg-[rgba(255,255,255,0.2)] /hover:bg-[#DBBE67] transition-all duration-300 cursor-pointer rounded-md"
              >
                Tell me more about Child Custody Laws in Pakistan?
              </button>
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
                    sendmessage(el.target["bizgpt-input"].value);
                    el.target["bizgpt-input"].value = "";
                  }}
                  className="w-full"
                  id="Main-Home-Inputform-For-Bizgpt"
                >
                  <div className="relative mx-auto w-[90%] flex gap-2">
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
                      name="bizgpt-input"
                      className="block w-full py-[1.2rem] /md:py-4 pr-4  pl-10 outline-none md:text-sm text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                      placeholder="Ask 24 Justice  a question"
                      style={{ fontFamily: "rubik" }}
                      required
                    />
                    <button
                      type="submit"
                      style={{ fontFamily: "rubik" }}
                      className="absolute text-black right-2.5 md:min-w-[9rem]  bottom-2.5 md:py-[0.7rem] py-[0.5rem] bg-[#DBBE67] hover:bg-[#bea559] focus:ring-4 focus:outline-none  font-medium rounded-lg md:text-md text-sm px-2 min-w-[30%] md:px-4 /py-2 "
                    >
                      Ask Question
                      {/* <i class="fi fi-rs-paper-plane flex items-center"></i> */}
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
      ) : (
        <div className="flex md:flex-row flex-col gap-[0.5rem] w-full">
          <div className="pl-[0.5rem] md:pl-[6rem] md:block flex justify-start mt-[4rem] md:mt-[2rem] ">
            <div className="flex items-center gap-[0.7rem]">
              <i
                onClick={() => {
                  setHomepage(true);
                }}
                className="rotate-[180deg] text-3xl md:text-[3rem] p-0 hover:scale-[1.10] fi fi-ss-arrow-circle-right flex items-center text-[#DBBE67] transition-all duration-200 cursor-pointer"
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
                      className={`text-sm md:text-lg max-w-[100%] md:max-w-[60%] ${
                        el.role == "user"
                          ? "bg-[#f2f2f2] rounded-tr-xl"
                          : "bg-[#DBBE67]  text-black rounded-tl-xl"
                      } p-[0.5rem] md:p-[1rem] break-words text-black  rounded-br-xl rounded-bl-xl border-2 border-[rgba(0,0,0,0.05)] `}
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
                            className="bg-black text-white p-3 text-xs md:text-base rounded-md hover:scale-[1.03] transition-all duration-300"
                            style={{ fontFamily: "rubik" }}
                          >
                            Talk to a consultant
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
                    </div>
                  </div>
                  {el.role != "user" && el?.userSpecificLink[0] ? (
                    <div className="flex justify-end flex-wrap ">
                      <div className="bg-white p-3 flex flex-col gap-3 rounded-md min-w-[60%] text-black">
                        <h3 className="text-xl">Relevant Links</h3>
                        <div className="flex gap-2 flex-wrap">
                          {el?.userSpecificLink[0]
                            ? el?.userSpecificLink
                                .slice(0, 3)
                                .map((el, indexussplin) => (
                                  <a
                                    href={el}
                                    target="_blank"
                                    key={Math.random + indexussplin}
                                    className="p-2 w-fit  text-sm line-clamp-1 bg-[#f2f2f2] text-black rounded-md"
                                  >
                                    {el}
                                  </a>
                                ))
                            : ""}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))}

              {ShowBookingForm ? (
                <div className={`flex justify-end`}>
                  <div className="bg-[#DBBE67] text-black w-[100%] md:w-[60%] p-6 rounded-xl">
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
                      sendmessage(el.target["bizgpt-input"].value);
                      el.target["bizgpt-input"].value = "";
                    }}
                    className="w-full"
                    id="Main-Home-Inputform-For-Bizgpt"
                  >
                    <div className="relative mx-auto w-[90%] flex gap-2 /m-4">
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
                        name="bizgpt-input"
                        className="block w-full py-[1.2rem] /md:py-4 pr-4  pl-10 outline-none md:text-sm text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 chatMessageButton"
                        placeholder="Ask 24 Justice  a question"
                        style={{ fontFamily: "rubik" }}
                        required
                      />
                      <button
                        type="submit"
                        style={{ fontFamily: "rubik" }}
                        className="absolute text-black right-2.5 md:min-w-[9rem]  bottom-2.5 md:py-[0.7rem] py-[0.5rem] bg-[#DBBE67] hover:bg-[#bea559] focus:ring-4 focus:outline-none  font-medium rounded-lg md:text-md text-sm px-2 min-w-[30%] md:px-4 /py-2 "
                      >
                        Ask Question
                        {/* <i class="fi fi-rs-paper-plane flex items-center"></i> */}
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
