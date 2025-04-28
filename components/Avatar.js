// import React, { useState, useEffect, useRef } from "react";
// import { useAvatar } from "@avatechai/avatars/react";
// import { defaultAvatarLoaders } from "@avatechai/avatars/default-loaders";
// import {
//   Configuration,
//   NewSessionData,
//   StreamingAvatarApi,
// } from "@heygen/streaming-avatar";
// import axios from "axios";

// function Avatar({ positions }) {
//   const [ACC_TOK, setACC_TOK] = useState(null);

//   useEffect(() => {
//     axios.get("/api/avatars/heygen/access_token").then(({ data }) => {
//       setACC_TOK(data);
//     });
//   }, []);

//   return (
//     <div>
//       {ACC_TOK && <AV_DISP accessToken={ACC_TOK} positions={positions} />}
//     </div>
//   );
// }

// export default Avatar;

// export function AV_DISP({ accessToken, positions }) {
//   const [stream, setStream] = useState();
//   const [debug, setDebug] = useState();
//   const mediaStream = useRef(null);

//   // Instantiate the Interactive Avatar api using your access token
//   const avatar = useRef(
//     new StreamingAvatarApi(
//       new Configuration({
//         accessToken: accessToken,
//       })
//     )
//   );

//   const [sessionData, setSessionData] = useState();

//   async function start() {
//     const res = await avatar.current.createStartAvatar(
//       {
//         newSessionRequest: {
//           quality: "medium",
//           avatarName: "",
//           voice: { voiceId: "" },
//         },
//       },
//       setDebug
//     );
//     setSessionData(res);
//     setStream(avatar.current.mediaStream);
//   }

//   async function stop() {
//     await avatar.current.stopAvatar({
//       stopSessionRequest: { sessionId: sessionData?.sessionId },
//     });
//   }

//   async function handleSpeak() {
//     await avatar.current
//       .speak({
//         taskRequest: {
//           text: "Hello! I am your AI assistant, here to help you with anything you need. Whether you're looking for information, need some advice, or just want to chat, I'm here for you. Let's explore the world of possibilities together!",
//           sessionId: sessionData?.sessionId,
//         },
//       })
//       .catch((e) => {});
//   }

//   useEffect(() => {
//     if (stream && mediaStream.current) {
//       mediaStream.current.srcObject = stream;
//       mediaStream.current.onloadedmetadata = () => {
//         mediaStream.current?.play();
//       };
//     }
//   }, [stream]);

//   useEffect(() => {
//     // setTimeout(() => {
//     //   start();
//     // }, 10000);
//     // return () => {
//     //   stop();
//     // };
//   }, []);

//   return (
//     <div
//       style={{
//         ...(positions ? positions : { bottom: 8, left: "3%" }),
//       }}
//       className=" h-fit w-fit absolute z-[999999]"
//     >
//       {/* {debug || ""} */}
//       {/* Hide the video element */}

//       <div className="bg-black w-[200px] h-[200px] rounded-full">
//         <video
//           onClick={() => {
//             start();
//           }}
//           playsInline
//           autoPlay
//           width={200}
//           ref={mediaStream}
//           style={{
//             borderRadius: 999,
//           }}
//           // style={{ display: "none" }}
//         />
//       </div>

//       {/* <div
//         onClick={() => {
//           start();
//         }}
//         className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
//       >
//         Start
//       </div> */}
//       {/* <div
//         onClick={() => {
//           handleSpeak();
//         }}
//         className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
//       >
//         Speak
//       </div> */}
//     </div>
//   );
// }

import React, { useContext, useEffect } from "react";
import { AvatarContext } from "@/libs/context/AvatarContext"; // Import the context
import Draggable from "react-draggable";

function Avatar({ positions }) {
  const { accessToken, stream, start, mediaStream, debug } =
    useContext(AvatarContext); // Use context here

  useEffect(() => {
    console.log({ accessToken });
  }, [accessToken]);

  return <div>{accessToken && <AV_DISP positions={positions} />}</div>;
}

export default Avatar;

export function AV_DISP({ positions }) {
  const { stream, start, mediaStream, debug } = useContext(AvatarContext); // Use context here

  return (
    <div
      style={{
        ...(positions ? positions : { bottom: 8, left: "3%" }),
      }}
      className=" h-fit w-fit absolute z-[999] rounded-full drop-shadow-xl"
    >
      <Draggable
        handle=".handle"
        bounds={{
          bottom: 0,
          left: -40,
          right: window.innerWidth - 250,

          top: -(window.innerHeight - 210),
        }}
      >
        <div className="bg-[#fff2] w-[200px] h-[200px] rounded-full cursor-pointer overflow-hidden group">
          <div className="handle bg-[#fff2] p-0 w-full cursor-pointer flex justify-center items-center text-center text-white absolute -top-[70px] group-hover:top-0 transition-all duration-300 left-0 z-[9999]">
            <div className="relative">
              <img
                src="https://www.svgrepo.com/show/459043/drag-handle.svg"
                className="h-[30px] rotate-90 invert opacity-60"
              />
              <div className="w-full h-full bg-[#00000] aspect-square absolute top-0 left-0"></div>
            </div>

            {/* <div className="w-[50px] aspect-square"></div> */}
          </div>

          {stream && (
            <div className=" bg-[#fff2] p-0 w-full cursor-pointer flex justify-center items-center text-center text-white absolute -bottom-[70px] group-hover:bottom-0 transition-all duration-300 left-0 z-[9999]">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5994/5994583.png"
                  className="h-[30px]   opacity-[80%]"
                />
                <div className="w-full h-full bg-[#00000] aspect-square absolute top-0 left-0"></div>
              </div>

              {/* <div className="w-[50px] aspect-square"></div> */}
            </div>
          )}
          {stream ? (
            <video
              onClick={() => {
                // alert("hhh");
                start();
              }}
              playsInline
              autoPlay
              width={200}
              ref={mediaStream}
              style={{
                borderRadius: 999,
              }}
            />
          ) : (
            <div className="w-fit h-fit rounded-full relative overflow-hidden">
              <img
                className="w-[200px] h-[200px] rounded-full object-cover"
                src="/stillChar.png"
              />
              <div className="bg-[#0009] w-full h-full absolute top-0 left-0 z-[5] flex justify-center items-center">
                {/* <img
                src="/phone-call.png"
                className="w-[50px] h-[50px] object-contain opacity-70"
              /> */}
                <PulsingPhoneIcon />
              </div>
            </div>
          )}
        </div>
      </Draggable>
      {/* Debugging information */}
      {debug && <pre>{JSON.stringify(debug, null, 2)}</pre>}
    </div>
  );
}

const PulsingPhoneIcon = () => {
  const { start } = useContext(AvatarContext);
  // The HTML and CSS content as a string
  const htmlContent = `
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .content {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        
      }

      i {
        color: white;
        font-size: 2.5rem;
        transform: rotate(90deg);
      }

      .pulse {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background-color: #44bd32;
        background-image: radial-gradient(hsl(112, 58%, 40%), hsl(112, 58%, 47%));
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
      }

      .pulse::before, .pulse::after {
        content: '';
        position: absolute;
        width: calc(100%);
        height: calc(100%);
        border-radius: 50%;
        border: 1px solid #44bd32;
        animation: calling 2s ease-in-out infinite;
      }

      .pulse::after {
        animation: calling 2s ease-in-out 0.35s infinite;
      }

      @keyframes calling {
        0% {
          width: calc(100%);
          height: calc(100%);
          opacity: 1;
        }
        100% {
          width: calc(100% + 60px);
          height: calc(100% + 60px);
          opacity: 0;
        }
      }
    </style>
    
      <div class="pulse">
        <i class="fa fa-phone"></i>
      </div>
  
  `;

  return (
    <div
      onClick={(cur) => {
        cur.currentTarget.style.rotate =
          cur.currentTarget.style.rotate == "360deg" ? "0deg" : "360deg";
        document.querySelector(".fa").classList.remove("fa-phone");
        document.querySelector(".fa").classList.add("fa-spinner");
        document.querySelector(".fa").classList.add("animate-spin");

        start();
      }}
      className="transition-all duration-300"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
