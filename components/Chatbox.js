import { AvatarContext } from "@/libs/context/AvatarContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import CoursePopup from "./course";
var allmsg1;

function extractLink(text) {
  // Regular expression to detect the link format [link||URL]
  const regex = /\[link\|\|([^\]]+)\]/g;
  const matches = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    // match[1] contains the URL part inside [link||URL]
    matches.push(match[1]);
  }

  return matches.length > 0 ? matches : null;
}

function removeLinks(text) {
  // Regular expression to detect the format [link||URL||CourseTitle||Professors]
  const regex = /\[COURSECARD\|\|([^\|]+)\|\|([^\|]+)\|\|([^\]]+)\]/g;

  // Replace all occurrences of the pattern with an empty string
  const cleanedText = text.replace(regex, "");

  return cleanedText.trim(); // Optional: to remove any leading/trailing spaces after removal
}

function extractLinkDetails(text) {
  // Regular expression to detect the format [link||URL||CourseTitle||Professors]
  const regex = /\[COURSECARD\|\|([^\|]+)\|\|([^\|]+)\|\|([^\]]+)\]/g;
  const matches = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    // match[1] contains the URL, match[2] contains the CourseTitle, match[3] contains the Professors
    matches.push({
      url: match[1],
      courseTitle: match[2],
      professors: match[3],
    });
  }

  return matches.length > 0 ? matches : null;
}

function Chatbox() {
  const [allmsg, setAllmsg] = useState([]);
  const { start, AvatarState, speak, mediaStream, stream, stop } =
    useContext(AvatarContext);

  const [popupContainer, setPopupContainer] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const showPopup = (id) => {
    if (!popupContainer) {
      const container = document.createElement("div");
      container.id = "popup-container";
      // container.classList.add("absolute", "top-0", "left-0", "z-[9999]");
      document.body.appendChild(container);
      setPopupContainer(container);
      setCourseId(id); // Set the new courseId
    }
  };

  const hidePopup = () => {
    if (popupContainer) {
      document.body.removeChild(popupContainer);
      setPopupContainer(null);
      setCourseId(null); // Clear the courseId
    }
  };

  const [popupVisible, setpopupVisible] = useState(false);

  useEffect(() => {
    if (courseId) {
      showPopup(courseId);
    }
  }, [courseId]);

  var sendmessage = async (msg) => {
    let newArr = [...allmsg, { role: "user", content: msg.trim() }];

    document
      .querySelectorAll(".chatMessageButton")
      .forEach((htmlel) => (htmlel.disabled = true));

    try {
      let { data } = await axios.post("/api/aiResponse", {
        transcript: [...allmsg, { role: "user", content: msg.trim() }],
      });

      if (data?.response?.content) {
        // speak(data.response.content);
        // console.log(data.response.content);
      }

      setTimeout(() => {
        document
          ?.getElementById("chat-messages")
          ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      }, 12);
      setTimeout(() => {
        // console.log(allmsg);
        // allmsg.at(-1).allowbuttons = true;
        setAllmsg((ell) => [
          ...ell.slice(0, ell.length - 1),
          { allowbuttons: true, ...data.response },
        ]);
      }, 2000);

      console.log(data.response.content);

      // <div className="message">
      //   <div className="bubble">
      //     <div className="bubble-text">Hey, I haven't seen you in a while!</div>
      //   </div>
      // </div>;

      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => (htmlel.disabled = false));
      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => htmlel.focus());
    } catch (error) {
      console.log(error);

      document.querySelectorAll(".lpuai-response").forEach((el) => el.remove());
      setAllmsg((el) => [
        ...el,
        {
          role: "assistant",
          content: `We Got An Technical Problem. Please Contact Us If This Problem Repeat.`,
        },
      ]);
      setTimeout(() => {
        document
          ?.getElementById("chat-messages")
          ?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => (htmlel.disabled = false));
    }
  };

  async function sendmessage2(msg, camShot, emotionInput) {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    const messageText = messageInput.value;
    if (messageText.trim() === "") {
      return false;
    }

    document
      .querySelectorAll(".chatMessageButton")
      .forEach((htmlel) => (htmlel.disabled = true));

    let messages = document.querySelectorAll(".message");
    // console.log(
    //   messages[messages.length - 1].classList.contains("message-personal")
    // );

    const messageDiv = document.createElement("div");
    const bubbleDiv = document.createElement("div");
    const bubbleTextDiv = document.createElement("div");

    messageDiv.classList.add("message", "message-personal");
    bubbleDiv.classList.add("bubble", "bubble-personal");
    bubbleTextDiv.classList.add("bubble-text");

    bubbleTextDiv.innerText = messageText;
    bubbleDiv.appendChild(bubbleTextDiv);
    messageDiv.appendChild(bubbleDiv);

    chatMessages.appendChild(messageDiv);
    messageInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    console.log({
      role: "user",
      content: msg.trim(),
      camShot: camShot,
      emotion: emotionInput,
    });

    // try {
    //   let { data } = await axios.post(
    //     "https://aa85-125-16-189-227.ngrok-free.app/text/",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       data: JSON.stringify({
    //         message: msg.trim(),
    //       }),
    //     }
    //   );

    //   let mood = data.emotion;

    //   mood = mood[0].toUpperCase() + mood.slice(1);

    //   let smj = document.getElementById("chat-mood");
    //   smj.innerText = mood;

    //   // console.log({ data });

    //   // let st = Math.round(parseFloat(data.likely_hood_of_suicide) * 100);

    //   // alert(`${st}%`);

    //   let spb = document.getElementById("progress-bar-suicide");
    //   spb.innerText = `${st}%`;
    //   spb.style.width = `${st}%`;

    //   // progress-bar-suicide
    // } catch (er) {
    //   console.log(er);
    // }

    try {
      let { data } = await axios.post("/api/aiResponse", {
        transcript: [
          ...allmsg,
          {
            role: "user",
            content: msg.trim(),
            camShot: camShot,
            emotion: emotionInput,
          },
        ],
      });

      setAllmsg((curr) => [
        ...curr,
        {
          role: "user",
          content: msg.trim(),
        },
      ]);

      if (data?.response?.content) {
        const messageDiv = document.createElement("div");
        const bubbleDiv = document.createElement("div");
        const bubbleTextDiv = document.createElement("div");

        messageDiv.classList.add("message", "message");
        bubbleDiv.classList.add("bubble", "bubble");
        bubbleTextDiv.classList.add("bubble-text");

        let l = [];

        let dt = data?.response?.content;

        try {
          // alert("hellos");
          l = extractLinkDetails(data?.response?.content);

          dt = removeLinks(data?.response?.content);

          console.log({ l, dt });
        } catch (el) {
          alert("Error");
        }
        // let l = extractLink(data?.response?.content);

        bubbleTextDiv.innerText = dt;
        // bubbleTextDiv.setAttribute("markdown", "1");
        bubbleDiv.appendChild(bubbleTextDiv);
        messageDiv.appendChild(bubbleDiv);

        if (l) {
          l.forEach((c, i) => {
            // if (c.url.includes("nptel.ac.in")) {
            // }
            let courseEl = document.createElement("div");
            courseEl.innerHTML = `
         
          <div class="flex flex-row cursor-pointer items-center mt-3 mb-2 bg-[#fff8] rounded-xl pr-2">
          <img src="https://nptel.ac.in/assets/shared/logo-m.jpg"  class="bg-white aspect-square rounded-xl object-contain max-w-[80px] p-[8px]"/>
          <div class="flex flex-col ml-2">
          <label  class="cursor-pointer font-[500] text-[13px] text-wrap max-w-[150px] leading-none">${
            c.courseTitle || ""
          }</label>
          <label class="text-[12px] leading-none">${c.professors || ""}</label>
          </div>
          </div>
          `;

            courseEl.addEventListener("click", () => {
              console.log(c);

              if (c.url && c.url.includes("nptel.ac.in")) {
                if (
                  c.url.split("//")[1].split("/")[2] &&
                  c.url.split("//")[1].split("/")[2].length > 5
                ) {
                  // setCourseId(c.url.split("//")[1].split("/")[2]);
                }
                window.open(
                  `/mycourse/${c.url.split("//")[1].split("/")[2]}`,
                  "_blank"
                );
              } else {
                alert("We Are Bringing Up All Here Soon");
              }

              // alert(c.url);
              // showPopup(c.url.split("//")[1].split("/")[2]);
            });

            bubbleTextDiv.appendChild(courseEl);
          });

          // console.log(l);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setAllmsg((curr) => [
          ...curr,
          {
            role: data?.response?.role,
            content: data?.response?.content,
          },
        ]);

        speak(dt);
        // console.log(data.response.content);
      }

      document
        .querySelectorAll(".chatMessageButton")
        .forEach((htmlel) => (htmlel.disabled = false));
      document
        .querySelectorAll("#message-input")
        .forEach((htmlel) => htmlel.focus());
    } catch (er) {
      console.log(er);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setupChatbox();

      // document.body.appendChild
    }, 1000);
  }, []);

  function setupChatbox() {
    const ENTER_KEY = "Enter";

    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    // sendButton.addEventListener("click", () =>
    //   // onButtonClick(messageInput, chatMessages)
    // );

    messageInput.addEventListener("keyup", (event) =>
      event.key === ENTER_KEY ? sendButton.click() : event.preventDefault()
    );

    // const onButtonClick = (messageInput, chatMessages) => {
    //   const messageText = messageInput.value;

    //   if (messageText.trim() === "") {
    //     return false;
    //   }

    //   sendmessage2(messageText);

    //   let messages = document.querySelectorAll(".message");
    //   console.log(
    //     messages[messages.length - 1].classList.contains("message-personal")
    //   );

    //   const messageDiv = document.createElement("div");
    //   const bubbleDiv = document.createElement("div");
    //   const bubbleTextDiv = document.createElement("div");

    //   messageDiv.classList.add("message", "message-personal");
    //   bubbleDiv.classList.add("bubble", "bubble-personal");
    //   bubbleTextDiv.classList.add("bubble-text");

    //   bubbleTextDiv.innerText = messageText;
    //   bubbleDiv.appendChild(bubbleTextDiv);
    //   messageDiv.appendChild(bubbleDiv);

    //   chatMessages.appendChild(messageDiv);
    //   messageInput.value = "";
    //   chatMessages.scrollTop = chatMessages.scrollHeight;
    // };
  }

  return (
    <>
      {popupContainer &&
        courseId &&
        ReactDom.createPortal(
          <CoursePopup courseId={courseId} closeHandler={hidePopup} />,
          popupContainer
        )}
      <style>{`
    
  



.glassmorphism {
  background: rgba(240, 240, 240, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.4px);
  -webkit-backdrop-filter: blur(7.4px);
}

.chat-window {


  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
@media (min-width: calc(400px + 2rem)) {
  .chat-window {
    width: 400px;
  }
}
@media (min-height: calc(500px + 2rem)) {
  .chat-window {
    height: 500px;
  }
}
@media (max-height: calc(300px + 2rem)) {
  .chat-window {
    height: 300px;
  }
}

.chat-title {
  display: flex;
  align-items: center;
  flex-direction: row;
  min-height: 50px;
  max-height: 50px;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.4px);
  -webkit-backdrop-filter: blur(7.4px);
}

.chat-title-avatar {
  margin: 5px 10px;
  border-radius: 50%;
  width: calc(50px - 10px);
  height: calc(50px - 10px);
}
.chat-title-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.chat-title-status {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chat-title-status-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.chat-title-status-circle {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #FED330;
  margin-right: 5px;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin: 0px;
  padding: 20px;
  overflow-wrap: break-word;
  background: rgba(0, 0, 0, 0.05);
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  scrollbar-thumb-color: rgba(255, 255, 255, 0.5);
  scrollbar-thumb-radius: 25px;
  scrollbar-track-color: transparent;
}
.chat-messages::-webkit-scrollbar {
  width: 0.2rem;
}
.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25px;
}
.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.bubble {
  color: #333;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px 20px 20px 0;
  margin: 0.15rem 0;
  max-width: 80%;
  word-wrap: break-word;
}

.bubble-personal {
  color: white;
  background-color: #007AFF;
  border-radius: 20px 20px 0 20px;
  animation: fadeIn 0.15s ease forwards;
}

.bubble-text {
  padding: 0.65rem 0.85rem 0.55rem 0.85rem;
  font-size: 1rem;
  border-radius: inherit;
  background-color: inherit;
  max-width:300px;
}

.message {
  display: flex;
  justify-content: flex-start;
}

.message-personal {
  display: flex;
  justify-content: flex-end;
}

.chat-input {
  display: flex;
  align-items: center;
  min-height: 50px;
  max-height: 50px;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.4px);
  -webkit-backdrop-filter: blur(7.4px);
}

#message-input {
  flex-grow: 1;
  padding: 0px;
  margin-left: 20px;
  margin-right: 5px;
  border: none;
  color: inherit;
  overflow-wrap: break-word;
  background-color: transparent;
  resize: none;
  outline: none;
}
#message-input:focus, #message-input:active {
  border: none;
  outline: none;
}
#message-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-size:0.8rem;

}

#send-button {
  padding: 5px 15px;
  background-color: transparent;
  border: none;
  color: white;
}
#send-button i {
  cursor: pointer;
  transition: color 0.3s ease;
}
#send-button i:hover {
  color: rgba(255, 255, 255, 0.4);
}

@keyframes fadeIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
    transform-origin: 0 0;
    animation: bounce 500ms linear both;
  }
}
    
    `}</style>

      <div className=" glassmorphism  flex-1 h-[80%] flex-col flex relative">
        <div className="chat-title">
          <div className="chat-title-avatar">
            <img
              src="/siffie1.png"
              alt="profile-picture"
              className="bg-white p-1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="chat-title-name leading-0 relative top-1">
              Siffie
            </span>
            <div className="chat-title-status relative leading-0 -top-[2px]">
              {/* <div className="chat-title-status-circle"></div> */}
              <p
                style={{ fontSize: 10 }}
                className="chat-title-status-text text-sm"
              >
                Online
              </p>
            </div>
          </div>
        </div>

        <div
          id="chat-mood"
          className="px-4 text-[12px] py-1 rounded-full bg-blue-400 text-black absolute top-3 right-2"
        >
          {"Neutral"}
        </div>

        <div className="chat-messages lpuai-chatscreeen" id="chat-messages">
          <div className="message">
            <div className="bubble">
              <div className="bubble-text">
                Hey, I haven't seen you in a while!
              </div>
            </div>
          </div>
          <div className="message">
            <div className="bubble">
              <div className="bubble-text">How's life going? 😃</div>
            </div>
          </div>
          {/* <!-- space for messages --> */}
        </div>

        <form className="chat-input">
          <input
            type="text"
            id="message-input"
            autoComplete="off"
            placeholder="Send a message"
          />
          <input type="text" id="cam-shot" hidden />
          <input type="text" id="emotion-stat" hidden />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const messageInput = document.getElementById("message-input");

              const sendButton = document.getElementById("send-button");
              const chatMessages = document.getElementById("chat-messages");
              const camInput = document.getElementById("cam-shot");
              const emotionInput = document.getElementById("emotion-stat");

              // if (document.getElementById("uservideo")) {
              if (emotionInput && document.querySelector("#emotionStats")) {
                emotionInput.value =
                  document.querySelector("#emotionStats").innerText;
              }

              console.log({ gg: emotionInput.value });

              // }

              // onButtonClick(messageInput, chatMessages);

              sendmessage2(
                messageInput.value,
                camInput.value,
                emotionInput.value
              );
              camInput.value = "";
            }}
            id="send-button"
            className="chatMessageButton"
          >
            <i className="fas fa-paper-plane "></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default Chatbox;
