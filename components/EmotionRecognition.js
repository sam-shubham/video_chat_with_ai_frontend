import { UserMediaContext } from "@/libs/context/CamContext";
import React, { useEffect } from "react";
let ER_Interval;

function EmotionRecognition({ videoElId, canvElId }) {
  //   console.log({ videoId });

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const { setDetections } = React.useContext(UserMediaContext);

  const GetDetection = async () => {
    // console.log("33");

    const videoEl = document.getElementById(videoElId);
    // console.log({ videoElemId, videoEl });

    // const videoEl = document.querySelector("video");

    // setTimeout(async () => {
    const result = await faceapi
      .detectSingleFace(videoEl)
      .withFaceExpressions()
      .withAgeAndGender();

    // console.log(result);

    if (result && result.expressions) {
      //   console.log("44");

      //   console.log({ ...result.expressions });

      setDetections({ ...result });

      //   const canvas = document.getElementById(canvElId);
      //   //   const canvas = document.getElementById("canv");
      //   const dims = faceapi.matchDimensions(canvas, videoEl, true);

      //   const resizedResult = faceapi.resizeResults(result, dims);
      //   const minConfidence = 0.05;
      //   if (true) {
      //     faceapi.draw.drawDetections(canvas, resizedResult);
      //   }
      //   faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence);
    }

    // setTimeout(() => GetDetection(), 10);
  };

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = (process.env.PUBLIC_URL || "") + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };

    try {
      loadModels();
    } catch {}
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      // alert("hello");
      //   console.log("Hello");
      // GetDetection(videoId, canvId);
      // console.log({ videoId, canvId });

      ER_Interval = setInterval(() => {
        console.log("ll");

        try {
          GetDetection();
        } catch {
          setModelsLoaded(false);
          loadModels();
        }
      }, 1600);
    }
    return () => clearInterval(ER_Interval);
  }, [modelsLoaded]);

  return <></>;
}

export default EmotionRecognition;
