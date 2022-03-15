import Router from "@koa/router";
import { Context } from "koa";
import { createMainNotionPage } from "./callbacks/createMainPage";
import { getActiveCourses } from "./fetch/getActiveCourses";

import { getCourseAssignments } from "./fetch/getCourseAssignments";

const router = new Router({
  prefix: "/api/v1",
});

router.post("/createPage", async (ctx: Context) => {
  await createMainNotionPage(ctx);
});

/*
  TESTING ENDPOINT DO NOT USE
*/
router.get("/format", async (ctx: Context) => {
  const courses = await getActiveCourses();
  console.log(
    ...courses.map((course: any) => {
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
        color: "default",
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Paragraph",
                  },
                },
              ],
            },
          },
        ],
      };
    })
  );
});

router.post("/getCourseAssignments", async (ctx: Context) => {
  await getCourseAssignments("95646")
    .then((result) => {
      ctx.body = result.assignmentsConnection.nodes;
      ctx.status = 200;
    })
    .catch((err) => {
      console.log(err);
      ctx.status = 500;
    });
});

export default router;
