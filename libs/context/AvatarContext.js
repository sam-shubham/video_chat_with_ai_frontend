import React, { createContext, useState, useRef, useEffect } from "react";
import { Configuration, StreamingAvatarApi } from "@heygen/streaming-avatar";
import axios from "axios";

// Create a Context for the Avatar
export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [stream, setStream] = useState();
  const [sessionData, setSessionData] = useState();
  const [AvatarState, setAvatarState] = useState("Sleeping");
  const avatar = useRef(null);
  const mediaStream = useRef(null);

  useEffect(() => {
    if (!accessToken) {
      // Fetch access token once
      axios.get("/api/avatars/heygen/access_token").then(({ data }) => {
        setAccessToken(data);
        // Initialize the avatar with the access token
        avatar.current = new StreamingAvatarApi(
          new Configuration({
            accessToken: data,
          })
        );
      });
    }
  }, []);

  const start = async () => {
    if (!avatar.current || sessionData) return; // Avoid reinitializing

    setAvatarState("Starting");

    const res = await avatar.current.createStartAvatar(
      {
        newSessionRequest: {
          quality: "high",
          avatarName: "",
          voice: { voiceId: "" },
        },
      },
      debcustom
    );
    setSessionData(res);
    setStream(avatar.current.mediaStream);
  };

  function debcustom(dt) {
    try {
      if (dt.includes("Session started successfully")) {
        setAvatarState("Ready");
      }
    } catch {}
    return console.log(dt);
  }

  const stop = async () => {
    if (!avatar.current || !sessionData) return;
    await avatar.current.stopAvatar({
      stopSessionRequest: { sessionId: sessionData.sessionId },
    });

    setAvatarState("Sleeping");

    setSessionData(null);
    setStream(null);
  };

  const speak = async (text) => {
    if (!avatar.current || !sessionData) return;
    await avatar.current
      .speak({
        taskRequest: {
          text,
          sessionId: sessionData.sessionId,
        },
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (stream && mediaStream.current) {
      setAvatarState("Ready");
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current?.play();
      };
    } else {
      setAvatarState("Sleeping");
    }
  }, [stream]);

  return (
    <AvatarContext.Provider
      value={{
        stream,
        sessionData,
        start,
        stop,
        speak,
        accessToken,
        mediaStream,
        AvatarState,
        accessToken,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};
