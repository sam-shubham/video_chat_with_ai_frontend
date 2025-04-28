import React, { useContext, useEffect, useState, useRef } from "react";
import { UserMediaContext } from "@/libs/context/CamContext";

const SpeechRecognition = () => {
  const { toggleAudio, UserStreamState, audioStream } =
    useContext(UserMediaContext);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null); // Store recognition instance
  const [isRecognizing, setIsRecognizing] = useState(false);

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
        console.log(event);

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
  }, []);

  // Control recognition based on audio stream status
  useEffect(() => {
    if (
      audioStream &&
      UserStreamState.audio &&
      recognitionRef.current &&
      !isRecognizing
    ) {
      recognitionRef.current.start(); // Start recognition
      setIsRecognizing(true);
    } else if (
      !UserStreamState.audio &&
      recognitionRef.current &&
      isRecognizing
    ) {
      recognitionRef.current.stop(); // Stop recognition
      setIsRecognizing(false);
    }
  }, [UserStreamState.audio, audioStream, isRecognizing]);

  const handleToggleAudio = () => {
    toggleAudio(); // Control mic using UserMediaContext
  };

  return (
    <div className="speech-recognition-container">
      <button onClick={handleToggleAudio}>
        {UserStreamState.audio ? "Turn Mic Off" : "Turn Mic On"}
      </button>

      <div className="circle-container">
        {UserStreamState.audio && (
          <>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </>
        )}
      </div>

      <div className="transcript-box">
        <h3>Transcript:</h3>
        <p>{transcript || "No speech detected yet..."}</p>
      </div>
    </div>
  );
};

export default SpeechRecognition;
