import { createContext, useState, useEffect } from "react";

export const UserMediaContext = createContext();

export const UserMediaProvider = ({ children }) => {
  const [videoStream, setVideoStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [SpeechDetections, setSpeechDetections] = useState({
    isRecognizing: false,
    transcript: "",
    speaking: false,
  });
  const [UserStreamState, setUserStreamState] = useState({
    video: false,
    audio: false,
  });

  // const [recognisedText, setrecognisedText] = useState()

  const [Detections, setDetections] = useState({
    age: "",
    gender: "   ",
    expressions: {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0,
    },
  });

  const getVideoStream = async () => {
    try {
      const video = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // Request video only
      });
      setVideoStream(video);
      setUserStreamState((curr) => ({ ...curr, video: true }));
    } catch (error) {
      console.error("Error accessing video devices:", error);
      setUserStreamState((curr) => ({ ...curr, video: false }));
    }
  };

  const getAudioStream = async () => {
    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true, // Request audio only
      });
      setAudioStream(audio);
      setUserStreamState((curr) => ({ ...curr, audio: true }));
    } catch (error) {
      console.error("Error accessing audio devices:", error);
      setUserStreamState((curr) => ({ ...curr, audio: false }));
    }
  };

  useEffect(() => {
    // getVideoStream();
    // getAudioStream();

    return () => {
      if (videoStream) {
        const videoTrack = videoStream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.stop(); // Stop the video track to turn off the camera
          setVideoStream(null);
        }
      }
    };
  }, []);

  const toggleVideo = () => {
    if (videoStream) {
      const videoTrack = videoStream.getVideoTracks()[0];
      if (videoTrack) {
        if (UserStreamState.video) {
          videoTrack.stop(); // Stop the video track to turn off the camera
          setVideoStream(null); // Clear the stream
          setUserStreamState((cur) => ({ ...cur, video: false }));
        } else {
          getVideoStream(); // Re-acquire the video stream to turn the camera back on
        }
      }
    } else {
      getVideoStream();
    }
  };

  const toggleAudio = () => {
    if (UserStreamState?.audio) {
      // const audioTrack = audioStream.getAudioTracks()[0];
      // if (audioTrack) {
      //   audioTrack.stop();

      setUserStreamState((cur) => ({ ...cur, audio: false }));
      // } else {
      //   getAudioStream();
      // }
    } else {
      setUserStreamState((cur) => ({ ...cur, audio: true }));

      // getAudioStream();
    }
  };

  return (
    <UserMediaContext.Provider
      value={{
        videoStream,
        audioStream,
        toggleVideo,
        toggleAudio,
        UserStreamState,
        Detections,
        setDetections,
        setSpeechDetections,
        SpeechDetections,
      }}
    >
      {children}
    </UserMediaContext.Provider>
  );
};
