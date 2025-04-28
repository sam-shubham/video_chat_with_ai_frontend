import React, { useContext } from "react";
import * as faceapi from "face-api.js";
import { UserMediaContext } from "@/libs/context/CamContext";
let i = 0;

function FaceApi() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  //   const [videoElem, setvideoElem] = React.useState(null);

  const { videoStream, UserStreamState } = useContext(UserMediaContext);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = (process.env.PUBLIC_URL || "") + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  React.useEffect(() => {
    console.log(modelsLoaded, videoStream);
  }, [modelsLoaded, videoStream]);

  const handleVideoOnPlay = () => {
    // setvideoElem(document.querySelector("video"));
    // if (i) return;
    // i = 1;

    const videoElem = document.querySelector("video");
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvas(videoElem);
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(videoElem, displaySize);

        const detections = await faceapi
          .detectAllFaces(videoElem, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 200);
  };

  return (
    <div className="w-full h-[100vh] bg-gray-300">
      <div style={{ textAlign: "center", padding: "10px" }}>
        {videoStream && modelsLoaded ? (
          <button
            onClick={() => {}}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Close Webcam
          </button>
        ) : (
          <button
            onClick={() => {}}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Open Webcam
          </button>
        )}
      </div>
      {videoStream ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                // backgroundColor: "red",
              }}
            >
              <video
                ref={(videoElement) => {
                  if (videoElement) {
                    videoElement.srcObject = videoStream;
                  }
                }}
                height={videoHeight}
                width={videoWidth}
                autoPlay
                onPlay={() => {
                  setTimeout(() => {
                    handleVideoOnPlay();
                  }, 100);
                }}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default FaceApi;
