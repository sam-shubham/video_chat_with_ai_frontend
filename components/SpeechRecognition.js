import React, { useContext, useEffect, useState, useRef } from "react";
import { UserMediaContext } from "@/libs/context/CamContext";
var istt;

function SpeechRecognition() {
  const {
    UserStreamState,
    audioStream,
    SpeechDetections,
    setSpeechDetections,
  } = useContext(UserMediaContext);

  //   const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null); // Store recognition instance
  //   const [isRecognizing, setIsRecognizing] = useState(false);

  const setIsRecognizing = (v) => {
    setSpeechDetections((cur) => ({
      ...cur,
      isRecognizing: v || false,
    }));
  };
  const setTranscript = (v) => {
    setSpeechDetections((cur) => ({
      ...cur,
      transcript: v,
    }));
  };
  const setIsSpeaking = (v) => {
    setSpeechDetections((cur) => ({
      ...cur,
      speaking: v || false,
    }));
  };

  function Speaking() {
    try {
      clearTimeout(istt);
    } catch {}

    setIsSpeaking(true);

    istt = setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  }
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        // console.log(event.result);

        if (event.results.length > 0) {
          Speaking();
        }

        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          finalTranscript += transcriptPart;
        }
        setTranscript(finalTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("SpeechRecognition API not supported");
    }

    return () => {
      try {
        clearTimeout(istt);
      } catch {}
    };
  }, []);

  // Control recognition based on audio stream status
  useEffect(() => {
    if (
      //   audioStream &&
      UserStreamState.audio &&
      recognitionRef.current &&
      !SpeechDetections.isRecognizing
    ) {
      recognitionRef.current.start(); // Start recognition
      setIsRecognizing(true);
    } else if (
      !UserStreamState.audio &&
      recognitionRef.current &&
      SpeechDetections.isRecognizing
    ) {
      recognitionRef.current.stop(); // Stop recognition
      setIsRecognizing(false);
    }
  }, [UserStreamState.audio, SpeechDetections.isRecognizing]);

  return <></>;
}

export default SpeechRecognition;
