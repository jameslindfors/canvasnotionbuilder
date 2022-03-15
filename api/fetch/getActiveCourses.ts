import axios from "axios";
import type { ActiveCourse } from "../../types/activeCoursesTypes";
import { env } from "../../utils/env";

const getActiveCoursesQuery = `
query {
	allCourses
		{
		name
		id
		sisId
		courseCode
		state
		term {
			name
			startAt
			endAt
		}
	}
}
`;

export const getActiveCourses = async () => {
  return axios({
    url: env.CANVAS_API_DOMAIN,
    method: "post",
    data: {
      query: getActiveCoursesQuery,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CANVAS_API_TOKEN}`,
    },
  }).then((result) => {
    const data = result.data.data.allCourses;
    const activeCourses = data.filter((course: ActiveCourse) => {
      const termEndDate = new Date(course.term.endAt);
      const today = new Date();
      return termEndDate > today;
    });
    return activeCourses;
  });
};
