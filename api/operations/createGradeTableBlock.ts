import type { ActiveCourses } from "../../types/activeCoursesTypes";
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
      grades: grades ? grades[0] : null,
    });
  }
  return courseGrades;
};

const fillBlockContent = async (courseGrades: CourseGrades[]) => {
  const blockContent = [];
  for (const courseGrade of courseGrades) {
    let color = gradeTextColor(courseGrade);
    let gradeString = gradeText(courseGrade);

    blockContent.push({
      object: "block",
      type: "table_row",
      table_row: {
        cells: [
          [
            {
              type: "text",
              text: {
                content: courseGrade.name,
              },
              annotations: {
                color: "default",
              },
            },
          ],
          [
            {
              type: "text",
              text: {
                content: gradeString,
              },
              annotations: {
                color: color,
              },
            },
          ],
        ],
      },
    });
  }
  return blockContent;
};

export const createGradeTableBlock = async (
  blockId: string,
  courses: ActiveCourses
) => {
  const courseGrades = await courseGradeObject(courses);
  const blockContent = await fillBlockContent(courseGrades);

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
                        content: "Course",
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
            // @ts-ignore
            ...blockContent,
          ],
        },
      },
    ],
  });
};

// Util functions

const gradeTextColor = (courseGrade: any) => {
  if (courseGrade.grades != null && courseGrade.grades.currentGrade != null) {
    switch (courseGrade.grades.currentGrade) {
      case "A":
        return "green";
      case "B":
        return "green";
      case "C":
        return "yellow";
      case "D":
        return "red";
      case "F":
        return "red";
      default:
        return "default";
    }
  }
};

const gradeText = (courseGrade: any) => {
  if (courseGrade.grades != null && courseGrade.grades.currentGrade != null) {
    return `${courseGrade.grades.currentGrade} - ${courseGrade.grades.currentScore}%`;
  }
  return "No Grade";
};
