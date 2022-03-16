import type { ActiveCourses } from "../../types/activeCoursesTypes";
import { Client } from "@notionhq/client";
import { env } from "../../utils/env";

const notion = new Client({ auth: env.NOTION_API_TOKEN });

export const generateDefaultCourseNotionDatabase = async (
  pageId: string,
  courses: ActiveCourses
) => {
  const courseFormatted = courses.map((course: any) => {
    return {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: course.name,
              link: null,
            },
          },
        ],
      },
    };
  });

  return await notion.databases.create({
    parent: { page_id: pageId, type: "page_id" },
    title: [
      {
        type: "text",
        text: {
          content: "Courses",
          link: null,
        },
      },
    ],
    icon: {
      type: "emoji",
      emoji: "📚",
    },
    properties: {
      Name: {
        title: {},
      },
      Description: {
        rich_text: {},
      },
      "Course Code": {
        rich_text: {},
      },
      "Start Date": {
        type: "date",
        date: {},
      },
      "End Date": {
        type: "date",
        date: {},
      },
    },
    cover: {
      type: "external",
      external: {
        url: "https://i.pinimg.com/originals/bb/e1/31/bbe131c33e257eaa23cf71323ecd95fc.jpg",
      },
    },
  });
};
