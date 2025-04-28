import {
  getCourseProgress,
  isLectureViewed,
  markLectureViewed,
} from "@/libs/utils/course";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CourseBrowser({ courseId, closeHandler }) {
  if (!courseId) return <></>;

  const [CourseData, setCourseData] = useState(null);
  const [SelectedUnit, setSelectedUnit] = useState(0);
  const [Rand, setRand] = useState(0);

  useEffect(() => {
    (async () => {
      console.log(courseId);

      if (!courseId) return;

      function openInNewTab(url) {
        const newWindow = window.open(url, "_blank");
        if (newWindow) {
          newWindow.focus();
        }
      }

      let { data } = await axios.get(
        `https://tools.nptel.ac.in/npteldata/course_outline1.php?id=${courseId}`
      );

      console.log(data.data);

      if (data.data.units && data.data.units[0] && data.data.units[0].lessons) {
        setCourseData(data.data);
      } else {
        closeHandler ? closeHandler() : null;
        openInNewTab(`https://nptel.ac.in/course/${courseId}`);
      }
    })();
  }, [courseId]);

  if (!CourseData) return <>Loading</>;

  return (
    <div id="crc" className="h-[95%] w-[95%] relative">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
      ></link>
      <div class="grid grid-cols-[280px_1fr] min-h-[100%]">
        <nav class="bg-gray-900 text-white p-6 flex flex-col justify-between rounded-l-[24px] shadow-lg">
          <div className="mr-9">
            <div class="text-2xl font-semibold mb-4 flex flex-row justify-between items-center">
              {"NPTEL (SIFFIE)"}
              <svg
                class="ml-2 w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={50}
                height={50}
              >
                <path d="M11.5,22C11.64,22 11.77,22 11.9,21.96C12.55,21.82 13.09,21.38 13.34,20.78C13.44,20.54 13.5,20.27 13.5,20H9.5A2,2 0 0,0 11.5,22M18,10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18L18,16M19.97,10H21.97C21.82,6.79 20.24,3.97 17.85,2.15L16.42,3.58C18.46,5 19.82,7.35 19.97,10M6.58,3.58L5.15,2.15C2.76,3.97 1.18,6.79 1,10H3C3.18,7.35 4.54,5 6.58,3.58Z"></path>
              </svg>
            </div>
            <ul class="space-y-2">
              {CourseData.units.map((unit, ind) => (
                <>
                  {SelectedUnit == ind ? (
                    <li class="active">
                      <a
                        href="#"
                        class="block py-2 pl-4 pr-6 rounded-lg bg-gradient-to-r from-blue-800 to-blue-500 text-white hover:text-blue-200 transition-all duration-150"
                      >
                        {unit.name}
                      </a>
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        setSelectedUnit(ind);
                      }}
                    >
                      <a
                        href="#"
                        class="block py-2 pl-4 pr-6 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-150"
                      >
                        {unit.name}
                      </a>
                    </li>
                  )}
                </>
              ))}
              {/* <li>
                <a
                  href="#"
                  class="block py-2 pl-4 pr-6 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-150"
                >
                  Asset Libraries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-4 pr-6 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-150"
                >
                  Funds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-4 pr-6 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-150"
                >
                  Investors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-4 pr-6 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-150"
                >
                  Reports
                </a>
              </li> */}
            </ul>
          </div>
        </nav>
        <main class="bg-white rounded-[24px] p-6 relative -left-6 text-black h-[95vh]">
          <header class="mb-6">
            <nav class="mb-0 ml-[1px] text-[13px]">
              <a
                href="#"
                class="text-blue-500 hover:underline transition-all duration-200"
              >
                {CourseData.institutename}
              </a>
            </nav>
            <h1 class="text-3xl font-bold mb-4">{CourseData.title}</h1>
            <nav
              id="nav-tabs"
              class="flex space-x-4 mb-6 flex-row justify-between w-full"
            >
              <a
                href="#"
                class="py-2 px-4 text-gray-600 font-medium border-b-4 border-blue-500"
              >
                Lectures
                <span class="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-semibold ml-2">
                  {CourseData.units[SelectedUnit].lessons.length}
                </span>
              </a>

              <div className="flex flex-row items-center gap-x-2">
                Efficency:{" "}
                <div class="rounded-full w-[200px] h-[15px] bg-gray-300 overflow-hidden">
                  <div
                    style={{ width: `70%` }}
                    className="bg-green-600 h-full transition-all duration-300 relative flex flex-row  items-center"
                  >
                    <label className="absolute right-1 text-[10px] text-white h-fit">{`${70}%`}</label>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-x-2">
                Completion:{" "}
                <div class="rounded-full w-[200px] h-[15px] bg-gray-300 overflow-hidden">
                  <div
                    style={{ width: `${getCourseProgress(courseId)}%` }}
                    className="bg-blue-600 h-full transition-all duration-300 relative flex flex-row  items-center"
                  >
                    <label className="absolute right-1 text-[10px] text-white h-fit">{`${getCourseProgress(
                      courseId
                    )}%`}</label>
                  </div>
                </div>
              </div>

              {/* <a
                href="#"
                class="py-2 px-4 text-gray-600 font-medium border-b-4 border-transparent hover:border-blue-500"
              >
                Downloads
                <span class="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-semibold ml-2">
                  0
                </span>
              </a>
              <a
                href="#"
                class="py-2 px-4 text-gray-600 font-medium border-b-4 border-transparent hover:border-blue-500"
              >
                Transcripts
              </a> */}
            </nav>
          </header>
          <div class="grid grid-cols-4 gap-4 h-[72vh] overflow-y-scroll scrollbar-hide">
            {CourseData.units[SelectedUnit].lessons.map((lec, ind) => (
              <div
                onClick={() => {
                  //   alert(
                  //     CourseData.units.reduce(
                  //       (prev, cur) => prev + cur.lessons.length,
                  //       0
                  //     )
                  //   );
                  markLectureViewed(
                    courseId,
                    `${SelectedUnit}|${ind}`,
                    CourseData.units.reduce(
                      (prev, cur) => prev + cur.lessons.length,
                      0
                    )
                  );
                  setRand(Math.random());
                  const videoEl = document.createElement("div");
                  videoEl.classList.add(
                    "w-full",
                    "h-full",
                    "absolute",
                    "top-0",
                    "left-0",
                    "z-[999999999]",
                    "bg-[#0009]",
                    "h-[100vh]"
                  );

                  videoEl.innerHTML = `
                  <div class="w-[100vw] h-[100vh]  flex justify-center items-center">

                  <div class="rounded-lg overflow-hidden bg-[#fff0] w-[80vw]  aspect-video flex justify-center items-center">
                     <iframe src="https://www.youtube.com/embed/${lec.youtube_id}" allowfullscreen  class="w-full h-full object-cover"

                  frameborder="0"/>
                  
                    </div>
                    </div>
                  `;

                  //   <iframe src="https://www.youtube.com/embed/${lec.youtube_id}" allowfullscreen  class="w-full h-full  mt-2"

                  // frameborder="0"/>

                  videoEl.addEventListener("click", () => {
                    document.getElementById("crc").removeChild(videoEl);
                  });
                  document.getElementById("crc").appendChild(videoEl);
                }}
                class="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer h-fit relative"
              >
                <h2 class="text-lg font-semibold mb-2"></h2>
                <div class="space-y-2">
                  <img
                    src={`https://i3.ytimg.com/vi/${lec.youtube_id}/hqdefault.jpg`}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h3 class=" text-[11px]">Lecture {lec.id}</h3>
                    <p className="text-[14px] leading-none font-semibold">
                      {lec.name}
                    </p>
                    {/* <iframe
                    class="w-full h-24 mt-2"
                    src="https://www.youtube.com/embed/ohmyMEwfp5g"
                    frameborder="0"
                    allowfullscreen
                  ></iframe> */}
                  </div>
                </div>
                {isLectureViewed(courseId, `${SelectedUnit}|${ind}`) && (
                  <div
                    className="absolute text-[30px] right-2 top-2"
                    tst={Rand}
                  >
                    ✅
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => {
          closeHandler();
        }}
        class="bg-gray-200 transition-all duration-200 rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none hover:border-red-200 hover:border-[1.5px] focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute right-10 top-5"
      >
        <span class="sr-only">Close menu</span>

        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

function CoursePopup({ courseId, closeHandler }) {
  //   console.log(courseId);

  return (
    <div
      id="CoursePopup"
      className="w-[100vw] overflow-hidden h-[100vh] text-white bg-[#0008] font-sans flex items-center justify-center absolute z-[999999] top-0 left-0"
    >
      <CourseBrowser courseId={courseId} closeHandler={closeHandler} />
    </div>
  );
}

export default CoursePopup;
