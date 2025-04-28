// import React, { useState, useEffect, useRef } from "react";
// import { useAvatar } from "@avatechai/avatars/react";
// import { defaultAvatarLoaders } from "@avatechai/avatars/default-loaders";
// import {
//   Configuration,
//   NewSessionData,
//   StreamingAvatarApi,
// } from "@heygen/streaming-avatar";
// import axios from "axios";

// function Avatar() {
//   // const { avatarDisplay } = useAvatar({
//   //   // Avatar State
//   //   avatarId: "1d768931-b269-4ae3-adb4-60ebbd2010a7",
//   //   avatarLoaders: defaultAvatarLoaders,

//   //   // Style Props
//   //   scale: 1,
//   // });

//   const [ACC_TOK, setACC_TOK] = useState(null);

//   useEffect(() => {
//     axios.get("/api/avatars/heygen/access_token").then(({ data }) => {
//       setACC_TOK(data);
//     });
//   }, []);

//   return (
//     <div className="w-ful h-full min-h-[100vh] flex items-center justify-center bg-gray-400">
//       Avatar
//       {/* <>{avatarDisplay}</> */}
//       {ACC_TOK && <AV_DISP accessToken={ACC_TOK} />}
//     </div>
//   );
// }

// export default Avatar;

// export function AV_DISP({ accessToken }) {
//   // Media stream used by the video player to display the avatar
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

//   // State holding Interactive Avatar session data
//   const [sessionData, setSessionData] = useState();

//   // Function to start the Interactive Avatar session
//   async function start() {
//     const res = await avatar.current.createStartAvatar(
//       {
//         newSessionRequest:
//           // Define the session variables during creation
//           {
//             quality: "high", // low, medium, high
//             avatarName: "",
//             voice: { voiceId: "" },
//           },
//       },
//       setDebug
//     );
//     setSessionData(res);
//     setStream(avatar.current.mediaStream);
//   }

//   // Function to stop the Interactive Avatar session
//   async function stop() {
//     await avatar.current.stopAvatar({
//       stopSessionRequest: { sessionId: sessionData?.sessionId },
//     });
//   }

//   // Function which passes in text to the avatar to repeat
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
//     // Handles the display of the Interactive Avatar
//     if (stream && mediaStream.current) {
//       mediaStream.current.srcObject = stream;
//       mediaStream.current.onloadedmetadata = () => {
//         mediaStream.current?.play();
//       };
//     }
//   }, [mediaStream, stream]);

//   return (
//     <div className="w-full h-[90vh] bg-red-300">
//       {debug || ""}
//       <video playsInline autoPlay width={500} ref={mediaStream} />
//       <div
//         onClick={() => {
//           start();
//         }}
//         className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
//       >
//         {" "}
//         Start
//       </div>
//       <div
//         onClick={() => {
//           handleSpeak();
//         }}
//         className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
//       >
//         {" "}
//         Speak
//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect } from "react";
import { AvatarContext } from "@/libs/context/AvatarContext";

function Avatar() {
  const { stream, startSession, speak, mediaStream } =
    useContext(AvatarContext);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current?.play();
      };
    }
  }, [stream]);

  useEffect(() => {
    if (canvasRef.current && mediaStream.current) {
      ctxRef.current = canvasRef.current.getContext("2d");

      const applyChromaKey = () => {
        if (ctxRef.current) {
          ctxRef.current.drawImage(
            mediaStream.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          const frame = ctxRef.current.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          const dataLength = frame.data.length / 4;
          for (let i = 0; i < dataLength; i++) {
            const offset = i * 4;
            const red = frame.data[offset + 0];
            const green = frame.data[offset + 1];
            const blue = frame.data[offset + 2];

            if (green > 100 && green > red + 30 && green > blue + 30) {
              frame.data[offset + 3] = 0; // Make pixel transparent
            }
          }

          ctxRef.current.putImageData(frame, 0, 0);
        }

        requestAnimationFrame(applyChromaKey);
      };

      applyChromaKey();
    }
  }, [mediaStream]);

  return (
    <div className="w-full h-[90vh] bg-red-300">
      {/* Canvas element for chroma key */}
      <canvas ref={canvasRef} width={500} height={500} />
      <div
        onClick={startSession}
        className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
      >
        Start
      </div>
      <div
        onClick={() => speak("Hello! This is a test of the AI avatar.")}
        className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
      >
        Speak
      </div>
    </div>
  );
}

export default Avatar;
