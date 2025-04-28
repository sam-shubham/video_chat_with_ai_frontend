import React, { useContext, useEffect, useRef, useState } from "react";
import Chatbox from "./Chatbox";
import { AvatarContext } from "@/libs/context/AvatarContext";
import { UserMediaContext } from "@/libs/context/CamContext";
import UserVideo from "./Confrencing/UserVideo";

function Confrence() {
  const { start, AvatarState, speak, mediaStream, stream, stop, accessToken } =
    useContext(AvatarContext);
  const { toggleVideo, toggleAudio, UserStreamState } =
    useContext(UserMediaContext);

  return (
    <div className=" px-4 w-full h-full /rounded-3xl flex overflow-hidden flex-row items-center">
      <div className="flex flex-col bg-[#fff2] rounded-[20px] gap-y-2 py-3 px-1 mr-[1%]">
        <div className="p-2 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 aspect-square opacity-40"
            viewBox="0 0 16 16"
          >
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1" />
            <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905" />
          </svg>
        </div>
        <div className="p-2 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 aspect-square opacity-40"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
            <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5" />
          </svg>
        </div>
        <div className="p-2 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 aspect-square opacity-40"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
          </svg>
        </div>
        <div className="p-2 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 aspect-square opacity-40"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          </svg>
        </div>
      </div>

      <div className="h-full flex flex-col justify-center gap-y-[2%] items-center">
        <div className="flex h-[85%] flex-row items-center justify-center gap-x-3">
          {/* Avatar Cam */}
          <div className="h-[98%] aspect-[7/10] max-w-[35vw] bg-[#fff3] rounded-2xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              width={200}
              ref={mediaStream}
            />
          </div>

          {/* User Cam */}
          <div className="h-[98%] aspect-[7/10] max-w-[35vw] bg-[#fff3] rounded-2xl overflow-hidden">
            <UserVideo />
          </div>
        </div>
        {/* Control Panel */}
        <div className="h-[10%] flex flex-row ">
          <div
            onClick={() => {
              if (accessToken) {
                if (AvatarState == "Sleeping" || !stream) {
                  start();
                } else {
                  stop();
                }
              } else {
                alert("Wait While Wilie Initialiseing...");
              }
            }}
            id="btn--end-call"
            className="call-view__controls__icon-btn important"
            style={{
              backgroundColor: accessToken
                ? AvatarState == "Sleeping" || !stream
                  ? "#00a389"
                  : "#FF3346"
                : "grey",
            }}
          >
            <i
              className="material-icons-round text-[30px]"
              style={{ color: "#FAFAFA" }}
            >
              {AvatarState == "Sleeping" || !stream ? "call" : "call_end"}
            </i>
          </div>
          <div
            onClick={() => {
              toggleAudio();
            }}
            id="btn--toggle-mic"
            className="call-view__controls__icon-btn"
            style={{
              color: UserStreamState?.audio ? "#FF3346" : "#00a389",
            }}
          >
            <i
              className="material-icons-round text-[30px]"
              style={{ color: "currentcolor" }}
            >
              {UserStreamState?.video ? "mic_off" : "mic"}
            </i>
          </div>
          <div
            onClick={() => {
              toggleVideo();
            }}
            style={{
              // backgroundColor: UserStreamState?.video ? "white" : "white",
              color: UserStreamState?.video ? "#FF3346" : "#00a389",
              // color: UserStreamState?.video ? "#FF3346" : "#00a389",
            }}
            id="btn--toggle-cam"
            className="call-view__controls__icon-btn"
          >
            <i
              className="material-icons-round text-[30px]"
              style={{ color: "currentcolor" }}
            >
              {UserStreamState?.video ? "videocam_off" : "videocam"}
            </i>
          </div>
          {/* <div
            id="btn--toggle-screen-sharing"
            className="call-view__controls__icon-btn"
          >
            <i
              className="material-icons-round text-[30px]"
              style={{ color: "#27A4FD" }}
            >
              screen_share
            </i>
          </div>
          <div id="btn--settings" className="call-view__controls__icon-btn">
            <i
              className="material-icons-round text-[30px]"
              style={{ color: "#27A4FD" }}
            >
              settings
            </i>
          </div> */}
        </div>
      </div>
      <div className="px-3 pl-5 flex-1 h-[95%] flex justify-center flex-col">
        <DetectionPanel />

        <Chatbox />

        {/* <div class="w-full max-w-[400px] p-4 bg-[#fff9] shadow-md rounded-xl absolute -bottom-2 -left-8 scale-[60%]">
          <h1 class="text-2xl font-semibold mb-4 text-gray-800">
            Suicidal Thoughts Probability
          </h1>

          <div class="w-full bg-gray-300 rounded-full h-6 mb-2">
            <div
              id="progress-bar-suicide"
              class="bg-blue-600 h-6 rounded-full text-center text-white text-[13px]"
              // style="width: 50%;"
              style={{
                width: "50%",
              }}
            >
              50%
            </div>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-100">Low</span>
            <span class="text-gray-100">High</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function ProgressBar({ title, value, color }) {
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.round(value * 100); // Target percentage
    if (start === end) return;

    const duration = 30; // Animation duration in milliseconds
    const incrementTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
      start += 1;
      setDisplayedValue(start);

      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className=" transition-all duration-300 mb-1">
      <p className="flex flex-row w-full justify-between pr-1 items-baseline text-[12px] font-thin opacity-80">
        {title}
        <span className="text-[12px]">{`${Math.round(displayedValue)}%`}</span>
      </p>
      <div className="w-[100%] h-[10px] mt-1 bg-[#fff5] rounded-full overflow-hidden transition-all duration-300">
        <div
          style={{
            width: `${Math.round(value * 100)}%`,
            backgroundColor: color,
          }}
          className="h-full transition-all duration-300 rounded-r-full"
        ></div>
      </div>
    </div>
  );
}

function DetectionPanel() {
  const { Detections } = React.useContext(UserMediaContext);

  const colors = useRef([
    "#d459e8",
    "#46bd84",
    // "#ecd8e6",
    "#f7a008",
    "#08a0f7",
    "#f76e08",
    "#67f708",
    // "#f7e408",
  ]);

  // Maintain consistent colors for each emotion
  const emotionColors = useRef(
    Object.keys(Detections.expressions).reduce((acc, emotion, index) => {
      acc[emotion] = colors.current[index % colors.current.length];
      return acc;
    }, {})
  );

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setEmotions((cur) => ({
    //     ...cur,
    //     happy: Math.random(),
    //     sad: Math.random(),
    //     neutral: Math.random(),
    //   }));
    // }, 300);
    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-row w-full items-end " id="emotionStats">
      <div
        style={{
          width: "55%",
        }}
        className="mb-5 transition-all duration-300"
      >
        <h2
          style={{
            fontSize: 11,
          }}
          className="text-sm mb-2"
        >
          Emotion Stats
        </h2>
        {Object.keys(Detections.expressions)
          .sort((i, j) => Detections.expressions[j] - Detections.expressions[i])
          .slice(0, 3)
          .map((key) => (
            <ProgressBar
              key={key}
              title={key[0].toUpperCase() + key.slice(1)}
              value={Detections.expressions[key]}
              color={emotionColors.current[key]} // Use consistent color
            />
          ))}
      </div>
      <div className="w-[45%] max-h-full p-4 aspect-square">
        <div className="bg-[#fff3] rounded-lg w-full h-full overflow-hidden relative">
          <img
            className={`w-full h-full object-cover ${
              Detections.gender == "female" ? "bg-pink-400" : "bg-blue-400"
            }`}
            src="https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png"
          />
          <div className="absolute bottom-0 w-full bg-[#0008] justify-center flex flex-row text-[13px]">
            {`${
              Detections.gender[0].toUpperCase() + Detections.gender.slice(1)
            } (${Math.round(Detections.age)})`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confrence;
