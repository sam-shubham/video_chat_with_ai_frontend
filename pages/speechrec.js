import React, { useEffect, useState, useRef } from "react";

function VoiceChatAI() {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0); // State to manage volume level
  const micRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = new SpeechRecognition();
    mic.continuous = true; // Continue listening even after user pauses
    mic.interimResults = false; // Return final results only
    mic.lang = "en-US"; // Set the language

    mic.onstart = () => {
      console.log("Microphone is on.");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setSpeechText(transcript);
      console.log("User said:", transcript);
      handleAIResponse(transcript); // Process the AI response here
    };

    mic.onend = () => {
      if (isListening) {
        mic.start(); // Restart listening if still in conversation
      }
    };

    mic.onerror = (event) => {
      console.error("Error with microphone:", event.error);
    };

    micRef.current = mic;
    setRecognition(mic);
  }, [isListening]);

  const handleAIResponse = async (userInput) => {
    setIsSpeaking(true);
    const aiResponse = await getAIResponse(userInput); // Replace with actual API call
    setResponseText(aiResponse);
    speak(aiResponse); // Use Speech Synthesis to speak the response
  };

  const getAIResponse = async (text) => {
    // Mock AI Response for example purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI Response to: ${text}`);
      }, 1000);
    });
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      stopMicrophone();
      setIsListening(false);
    } else {
      recognition.start();
      startMicrophone();
      setIsListening(true);
    }
  };

  const startMicrophone = async () => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const source = audioContextRef.current.createMediaStreamSource(
      mediaStreamRef.current
    );
    analyserRef.current = audioContextRef.current.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    visualizeAudio();
  };

  const visualizeAudio = () => {
    if (!analyserRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const volumeLevel =
      dataArrayRef.current.reduce((sum, value) => sum + value, 0) /
      dataArrayRef.current.length;

    setVolume(volumeLevel); // Update volume level state

    requestAnimationFrame(visualizeAudio); // Continue the animation loop
  };

  const stopMicrophone = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          AI Voice Chat
        </h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleListening}
            className={`px-6 py-3 rounded-full font-semibold text-white transition duration-300 ${
              isListening
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
        <div className="flex justify-center items-center mb-4">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-100 ease-in-out`}
            style={{
              transform: `scale(${1 + volume / 256})`,
              backgroundColor: isListening ? "#34D399" : "#6B7280",
            }}
          >
            <i className="fas fa-microphone text-white text-2xl"></i>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-gray-700">
            <strong>User said:</strong> {speechText}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <p className="text-gray-700">
            <strong>AI responded:</strong> {responseText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VoiceChatAI;
