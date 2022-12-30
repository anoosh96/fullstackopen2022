import React from "react";
import Course from "./Course";

const CourseList = ({ courses }) => {
  const courseList = courses.map((course) => (
    <Course course={course} key={course.id} />
  ));

  return (
    <div>
      {courseList}
    </div>
  );
};

export default CourseList;
