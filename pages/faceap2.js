import React, { useContext } from "react";
import { UserMediaContext } from "@/libs/context/CamContext";

function FaceApi() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

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
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };

    try {
      loadModels();
    } catch {}
  }, []);

  React.useEffect(() => {
    console.log(modelsLoaded, videoStream);
  }, [modelsLoaded, videoStream]);

  const handleVideoOnPlay = async () => {
    const videoEl = document.querySelector("video");

    // setTimeout(async () => {
    const result = await faceapi
      .detectSingleFace(videoEl)
      .withFaceExpressions();

    if (result) {
      console.log(result?.expressions);

      const canvas = document.getElementById("canv");
      const dims = faceapi.matchDimensions(canvas, videoEl, true);

      const resizedResult = faceapi.resizeResults(result, dims);
      const minConfidence = 0.05;
      if (true) {
        faceapi.draw.drawDetections(canvas, resizedResult);
      }
      faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence);
    }

    setTimeout(() => handleVideoOnPlay(), 10);

    // console.log(result);

    // }, 2000);
    // const result = await faceapi
    //   .detectSingleFace(videoEl)
    //   .withFaceExpressions();
    // if (i) return;
    // i = 1;
    // setInterval(async () => {
    //   if (canvasRef && canvasRef.current) {
    //     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
    //       videoRef.current
    //     );
    //     const displaySize = {
    //       width: videoWidth,
    //       height: videoHeight,
    //     };

    //     faceapi.matchDimensions(canvasRef.current, displaySize);

    //     const detections = await faceapi
    //       .detectAllFaces(
    //         videoRef.current,
    //         new faceapi.TinyFaceDetectorOptions()
    //       )
    //       .withFaceLandmarks()
    //       .withFaceExpressions();

    //     const resizedDetections = faceapi.resizeResults(
    //       detections,
    //       displaySize
    //     );

    //     canvasRef &&
    //       canvasRef.current &&
    //       canvasRef.current
    //         .getContext("2d")
    //         .clearRect(0, 0, videoWidth, videoHeight);
    //     canvasRef &&
    //       canvasRef.current &&
    //       faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    //     canvasRef &&
    //       canvasRef.current &&
    //       faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    //     canvasRef &&
    //       canvasRef.current &&
    //       faceapi.draw.drawFaceExpressions(
    //         canvasRef.current,
    //         resizedDetections
    //       );
    //   }
    // }, 1000);
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
                    try {
                      handleVideoOnPlay();
                    } catch {}
                  }, 1000);
                }}
                style={{ borderRadius: "10px" }}
              />
              <canvas
                id="canv"
                ref={canvasRef}
                style={{ position: "absolute" }}
              />
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
