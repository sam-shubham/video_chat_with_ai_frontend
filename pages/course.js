import CoursePopup from "@/components/course";
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Course() {
  const [popupContainer, setPopupContainer] = useState(null);

  const handleClick = () => {
    const container = document.createElement("div");
    container.id = "popup-container";
    container.classList.add("absolute", "top-0", "left-0", "z-[9999]");

    document.body.appendChild(container);
    setPopupContainer(container);
  };

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      {popupContainer &&
        ReactDOM.createPortal(
          <CoursePopup courseId={101101079} />,
          popupContainer
        )}
    </>
  );
}

export default Course;
