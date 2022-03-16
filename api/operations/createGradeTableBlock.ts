import type { ActiveCourses } from "../../types/activeCoursesTypes";
import { Client } from "@notionhq/client";
import { env } from "../../utils/env";

const notion = new Client({ auth: env.NOTION_API_TOKEN });

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
