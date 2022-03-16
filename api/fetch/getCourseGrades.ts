import axios from "axios";
import { env } from "../../utils/env";

const getCourseGradesQuery = `
 query getCourseGrades($courseId: ID!) {
    
        course(id: $courseId) {
            enrollmentsConnection {
                nodes {
                    grades {
                        currentGrade
                        currentScore
                    }
                }
            }
        }
    }
`;

export const getCourseGrades = async (courseId: string) => {
  return axios({
    url: env.CANVAS_API_DOMAIN,
    method: "post",
    data: {
      query: getCourseGradesQuery,
      variables: {
        courseId,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CANVAS_API_TOKEN}`,
    },
  }).then((res) => {
    const courseConnection = res.data.data.course;
    if (courseConnection != null) {
      const grades = courseConnection.enrollmentsConnection.nodes;
      const filtered = grades.filter((g: any) => {
        return g.grades;
      });
      return filtered.map((g: any) => {
        return {
          currentGrade: g.grades.currentGrade,
          currentScore: g.grades.currentScore,
        };
      });
    }
  });
};
