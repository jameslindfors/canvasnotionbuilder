import Router from "@koa/router";
import { Context } from "koa";
import { createMainNotionPage } from "./callbacks/createMainPage";

import { getCourseAssignments } from "./fetch/getCourseAssignments";

const router = new Router({
  prefix: "/api/v1",
});

router.post("/createPage", async (ctx: Context) => {
  await createMainNotionPage(ctx);
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
