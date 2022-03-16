import type {
  ActiveCourses,
  ActiveCourse,
} from "../../types/activeCoursesTypes";
import type { CourseGrades, Grades } from "../../types/courseGradesType";
import { Client } from "@notionhq/client";
import { env } from "../../utils/env";

import { getCourseGrades } from "../fetch/getCourseGrades";

const notion = new Client({ auth: env.NOTION_API_TOKEN });

/*
 * Function to retrieve the grades for all of the active
 * courses.
 * @param {ActiveCourses} courses - Object containing all of * the active courses.
 * @returns [{CourseGrades}] - Array of objects containing
 * the grades for each course.
 * Issue: Call takes 13 seconds to complete... way too long.
 */
const courseGradeObject = async (courses: ActiveCourses) => {
  const courseGrades: CourseGrades[] = [];
  for (const course of courses) {
    const grades = await getCourseGrades(course.id);
    courseGrades.push({
      id: course.id,
      name: course.name,
      grades: {
        currentGrade: grades[0].currentGrade,
        currentScore: grades[0].currentScore,
      },
    });
  }
  return courseGrades;
};

export const createGradeTableBlock = async (
  blockId: string,
  courses: ActiveCourses
) => {
  return await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        object: "block",
        type: "divider",
        divider: {},
      },
      {
        object: "block",
        type: "table",
        table: {
          table_width: 2,
          has_column_header: false,
          has_row_header: true,
          children: [
            {
              object: "block",
              type: "table_row",
              table_row: {
                cells: [
                  [
                    {
                      type: "text",
                      text: {
                        content: "Course Name",
                        link: null,
                      },
                      annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default",
                      },
                    },
                  ],
                  [
                    {
                      type: "text",
                      text: {
                        content: "Grade",
                        link: null,
                      },
                      annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default",
                      },
                    },
                  ],
                ],
              },
            },
            {
              object: "block",
              type: "table_row",
              table_row: {
                cells: [
                  [
                    {
                      type: "text",
                      text: {
                        content: "English",
                        link: null,
                      },
                      annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default",
                      },
                    },
                  ],
                  [
                    {
                      type: "text",
                      text: {
                        content: "A (97.3)",
                        link: null,
                      },
                      annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "green",
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
      },
    ],
  });
};
