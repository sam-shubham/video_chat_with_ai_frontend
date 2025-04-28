import React, { useState, useEffect, useRef } from "react";

import {
  Configuration,
  NewSessionData,
  StreamingAvatarApi,
} from "@heygen/streaming-avatar";
import axios from "axios";

function Avatar() {
  const [ACC_TOK, setACC_TOK] = useState(null);

  useEffect(() => {
    axios.get("/api/avatars/heygen/access_token").then(({ data }) => {
      setACC_TOK(data);
    });
  }, []);

  return <div>{ACC_TOK && <AV_DISP accessToken={ACC_TOK} />}</div>;
}

export default Avatar;

export function AV_DISP({ accessToken }) {
  const [stream, setStream] = useState();
  const [debug, setDebug] = useState();
  const mediaStream = useRef(null);

  // Instantiate the Interactive Avatar api using your access token
  const avatar = useRef(
    new StreamingAvatarApi(
      new Configuration({
        accessToken: accessToken,
      })
    )
  );

  const [sessionData, setSessionData] = useState();

  async function start() {
    const res = await avatar.current.createStartAvatar(
      {
        newSessionRequest: {
          quality: "medium",
          avatarName: "",
          voice: { voiceId: "" },
        },
      },
      setDebug
    );
    setSessionData(res);
    setStream(avatar.current.mediaStream);
  }

  async function stop() {
    await avatar.current.stopAvatar({
      stopSessionRequest: { sessionId: sessionData?.sessionId },
    });
  }

  async function handleSpeak() {
    await avatar.current
      .speak({
        taskRequest: {
          text: "Hello! I am your AI assistant, here to help you with anything you need. Whether you're looking for information, need some advice, or just want to chat, I'm here for you. Let's explore the world of possibilities together! People Call Me Drishti. My Height is Shorter but I'm Dumb too.",
          sessionId: sessionData?.sessionId,
        },
      })
      .catch((e) => {});
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current?.play();
      };
    }
  }, [stream]);

  useEffect(() => {
    // setTimeout(() => {
    //   start();
    // }, 10000);
    // return () => {
    //   stop();
    // };
  }, []);

  return (
    <div className=" h-fit w-fit absolute top-8 left-8">
      {/* {debug || ""} */}
      {/* Hide the video element */}

      <div className="bg-black w-[250px] h-[250px] rounded-full">
        <video
          onClick={() => {
            start();
          }}
          playsInline
          autoPlay
          width={250}
          ref={mediaStream}
          style={{
            borderRadius: 999,
          }}
          // style={{ display: "none" }}
        />
      </div>

      <div
        onClick={() => {
          start();
        }}
        className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
      >
        Start
      </div>
      <div
        onClick={() => {
          handleSpeak();
        }}
        className="px-5 py-1 bg-blue-600 text-white w-fit rounded-lg ml-4"
      >
        Speak
      </div>
    </div>
  );
}
