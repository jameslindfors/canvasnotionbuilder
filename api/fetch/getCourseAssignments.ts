import axios from "axios";
import { env } from "../../utils/env";

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
