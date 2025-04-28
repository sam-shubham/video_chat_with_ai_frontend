import CoursePopup from "@/components/course";
import { joinCourse } from "@/libs/utils/course";
import React, { useEffect, useState } from "react";

function MyCourse() {
  const [CourseId, setCourseId] = useState(null);

  useEffect(() => {
    setCourseId(window.location.href.split("/").reverse()[0]);
  }, []);

  useEffect(() => {
    if (CourseId) {
      let tk = localStorage.getItem("userName");
      if (!tk) {
        window.location.href = "/";
      } else {
        let courses = joinCourse(CourseId);
        console.log(courses);

        // if (!courses) {
        //   localStorage.setItem(
        //     `${tk}_courses`,
        //     JSON.stringify([{ id: CourseId, stats: {}, progress: 0 }])
        //   );
        // } else {
        //   courses = JSON.parse(courses);
        // }
        // el;
      }
    }
  }, [CourseId]);

  if (!CourseId) return <></>;

  return <CoursePopup courseId={CourseId} />;
}

export default MyCourse;
