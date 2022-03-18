import type { ActiveCourses } from "../../types/activeCoursesTypes";
import { Client } from "@notionhq/client";
import { env } from "../../utils/env";

import { getCourseAssignments } from "../fetch/getCourseAssignments";

const notion = new Client({ auth: env.NOTION_API_TOKEN });

export const createUpcomingAssignmentsTodo = async (blockId: string) => {
  const assignments = await getCourseAssignments("95646");

  return notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        type: "heading_3",
        object: "block",
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Upcoming Assignments:",
              },
              annotations: {
                bold: true,
              },
            },
          ],
        },
      },
      {
        type: "to_do",
        object: "block",
        to_do: {
          checked: false,
          color: "default",
          rich_text: [
            {
              type: "text",
              text: {
                content: "Assignment 1",
              },
            },
          ],
        },
      },
      {
        type: "to_do",
        object: "block",
        to_do: {
          checked: true,
          color: "default",
          rich_text: [
            {
              type: "text",
              text: {
                content: "Assignment 2",
              },
            },
          ],
        },
      },
    ],
  });
};
