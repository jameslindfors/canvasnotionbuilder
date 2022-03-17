import Router from "@koa/router";
import { Context } from "koa";
import { createDefaultNotionPage } from "./callbacks/createDefaultNotionPage";

import { getCourseAssignments } from "./fetch/getCourseAssignments";

const router = new Router({
  prefix: "/api/v1",
});

router.post("/createPage/:uid/:pid/:bid", async (ctx: Context) => {
  const { uid, pid, bid } = ctx.params;
  await createDefaultNotionPage(ctx);
});

export default router;
