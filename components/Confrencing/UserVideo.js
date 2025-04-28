import { UserMediaContext } from "@/libs/context/CamContext";
import React, { useContext, useEffect, useRef } from "react";
import EmotionRecognition from "../EmotionRecognition";
import SpeechRecognition from "../SpeechRecognition";

const UserVideo = React.memo(
  () => {
    const { videoStream, SpeechDetections, UserStreamState } =
      useContext(UserMediaContext);
    const videoRef = useRef(null);
    const [LastActionText, setLastActionText] = React.useState("");
    const [emotionRecognitionEnabled, setEmotionRecognitionEnabled] =
      React.useState(false);

    // Set the video stream only when the videoStream changes
    useEffect(() => {
      if (videoRef.current && videoStream) {
        videoRef.current.srcObject = videoStream;
      }
    }, [videoStream]);

    const captureImageFromVideo = (videoSelector) => {
      // Get the video element using the query selector
      const videoElement = document.querySelector(videoSelector);

      if (!videoElement) {
        // throw new Error("Video element not found");
        return "";
      }

      // Create a canvas element
      const canvas = document.createElement("canvas");

      // Set the desired low resolution (320x240) while maintaining aspect ratio
      const desiredWidth = 320;
      const desiredHeight = 240;

      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;
      const aspectRatio = videoWidth / videoHeight;

      if (videoWidth > videoHeight) {
        canvas.width = desiredWidth;
        canvas.height = desiredWidth / aspectRatio;
      } else {
        canvas.height = desiredHeight;
        canvas.width = desiredHeight * aspectRatio;
      }

      // Draw the current video frame onto the canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a base64 string in JPEG format with 0.7 quality
      const imageBase64 = canvas.toDataURL("image/jpeg", 0.7);

      return imageBase64; // Return the base64-encoded image
    };

    function UserSpokeAction(text) {
      setLastActionText(text);

      const camShot = captureImageFromVideo("#uservideo");

      if (document.querySelector("#message-input")) {
        document.querySelector("#message-input").value = text;
      }

      if (document.querySelector("#cam-shot")) {
        document.querySelector("#cam-shot").value = camShot;
      }

      if (document.querySelector("#send-button")) {
        document.querySelector("#send-button").click();
      }

      ///Trigger What is in my hand

      console.log(camShot);

      // alert(text);
    }

    useEffect(() => {
      if (
        !SpeechDetections.speaking &&
        SpeechDetections.transcript.trim().length > 0
      ) {
        if (SpeechDetections.transcript != LastActionText) {
          UserSpokeAction(SpeechDetections.transcript);
        }
      }
    }, [SpeechDetections.speaking]);

    return (
      <div className="relative w-full h-full">
        {videoStream && (
          <div className="w-full h-full relative">
            <video
              id="uservideo"
              className="w-full h-full object-cover"
              autoPlay
              ref={videoRef}
            />
            <div className="absolute top-2 right-2 z-10">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emotionRecognitionEnabled}
                  onChange={(e) =>
                    setEmotionRecognitionEnabled(e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-white">
                  Emotion Recognition
                </span>
              </label>
            </div>
            {emotionRecognitionEnabled && (
              <EmotionRecognition videoElId={"uservideo"} canvElId={"canv"} />
            )}
          </div>
        )}
        <SpeechRecognition />
        {
          <div
            style={{
              opacity:
                SpeechDetections.speaking &&
                SpeechDetections.transcript &&
                SpeechDetections.transcript.trim().length > 0
                  ? 1
                  : 0,
            }}
            className="absolute bottom-0 transition-all duration-300 flex justify-center items-center py-2 px-5 h-[60px] text-center left-0 w-full bg-[#0005] text-white"
          >
            {SpeechDetections.transcript}
          </div>
        }
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.videoStream === nextProps.videoStream
);

export default UserVideo;
