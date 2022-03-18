import axios from "axios";
import { env } from "../../utils/env";

// TODO : Modify query to include if a submission has been made
// *! Not all assignments have due dates so need another way to check if valid upcomming assignment
const getCourseAssignmentsQuery = `
query getCourseAssignments($courseId: ID!) {
        course(id: $courseId) {
            name
            assignmentsConnection {
                nodes {
                    name
                    pointsPossible
                    allowedAttempts
                    course {
                        courseCode
                    }
                    submissionTypes
                    dueAt
                }
            }
        }
    }
`;

export const getCourseAssignments = async (courseId: string) => {
  return axios({
    url: env.CANVAS_API_DOMAIN,
    method: "post",
    data: {
      query: getCourseAssignmentsQuery,
      variables: {
        courseId,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CANVAS_API_TOKEN}`,
    },
  }).then((res) => {
    return res.data.data.course;
  });
};
