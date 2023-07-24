import "@/styles/globals.css";
import "@/styles/button#1.css";
import "@/styles/circleDots.css";
import "@/styles/animations.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
