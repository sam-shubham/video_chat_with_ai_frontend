import Confrence from "@/components/Confrence";
import React, { useState, useEffect } from "react";
var i = 0;

function VideoChat() {
  const [NamePopup, setNamePopup] = useState(false);
  const [Rand, setRand] = useState(0);

  useEffect(() => {
    let tk = localStorage.getItem("userName");
    if (!tk) {
      setNamePopup(true);
    } else {
      setNamePopup(false);

      let crc = localStorage.getItem(`${tk}_courses`);
      if (crc && crc.length > 2) {
      } else {
        localStorage.setItem(`${tk}_courses`, JSON.stringify([]));
      }

      if (!i) {
        if (document.querySelector("#message-input")) {
          document.querySelector("#message-input").value = `Hello! I am ${tk}`;
        }

        if (document.querySelector("#send-button")) {
          document.querySelector("#send-button").click();
        }
        i = 1;
      }
    }
  }, [Rand]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center relative bg-gradient-to-br from-black to-blue-950">
      <Confrence />

      {NamePopup ? (
        <div className="absolute top-0 left-0 w-full h-full bg-[#0007] z-[99] flex justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let nmp = document.getElementById("nameInp");
              if (nmp.value.length > 3)
                localStorage.setItem("userName", nmp.value);
              setRand(Math.random());
              nmp.value = "";
            }}
            action="submit"
            className="flex flex-col items-center bg-white text-black rounded-lg p-8 text-[17px] font-semibold "
          >
            🥸 Your Name
            <input
              id="nameInp"
              class="w-full mt-2 font-normal bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            ></input>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("userName");
            window.location.reload();
            // closeHandler();
          }}
          class="bg-[#fff3] transition-all duration-200 rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none hover:border-red-200 hover:border-[1.5px] focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute left-5 top-5"
        >
          <span class="sr-only">logout</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="aspect-square w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default VideoChat;
