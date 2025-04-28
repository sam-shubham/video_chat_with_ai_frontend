// courseUtils.js

// Helper function to get course state from localStorage
export function getCourseState(courseId) {
  const courseState = localStorage.getItem(courseId);
  return courseState ? JSON.parse(courseState) : null;
}

// Helper function to set course state in localStorage
export function setCourseState(courseId, courseState) {
  try {
    localStorage.setItem(courseId, JSON.stringify(courseState));
  } catch (e) {
    if (e.name === "QuotaExceededError" || e.code === 22) {
      console.error("LocalStorage quota exceeded");
    } else {
      throw e;
    }
  }
}

// Join a course by initializing its state if not present
export function joinCourse(courseId) {
  let courseState = getCourseState(courseId);

  // If the course is not joined, initialize state
  if (!courseState) {
    courseState = {
      progress: 0, // Progress percentage
      viewedLectures: [], // Array of viewed lecture indices
    };
    setCourseState(courseId, courseState);
  }

  return courseState;
}

// Get the progress of a specific course
export function getCourseProgress(courseId) {
  let courseState = getCourseState(courseId);

  // Auto-join the course if not joined yet
  if (!courseState) {
    courseState = joinCourse(courseId);
  }

  return courseState.progress;
}

// Mark a lecture as viewed and update the progress
export function markLectureViewed(courseId, lectureIndex, totalLectures) {
  let courseState = getCourseState(courseId);

  // If the course is not joined, auto-join it
  if (!courseState) {
    courseState = joinCourse(courseId);
  }

  // Check if the lecture is already viewed
  if (!courseState.viewedLectures.includes(lectureIndex)) {
    // Add lecture to viewed list
    courseState.viewedLectures.push(lectureIndex);

    // Update progress as percentage of viewed lectures
    courseState.progress = Math.floor(
      (courseState.viewedLectures.length / totalLectures) * 100
    );

    // Save updated course state
    setCourseState(courseId, courseState);
  }

  return courseState;
}

// Check if a specific lecture is viewed
export function isLectureViewed(courseId, lectureIndex) {
  const courseState = getCourseState(courseId);
  return courseState && courseState.viewedLectures.includes(lectureIndex);
}
