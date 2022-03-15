import Router from "@koa/router";
import { createMainNotionPage } from "./callbacks/createMainPage";

import { getActiveCourses } from "./fetch/getActiveCourses";

const router = new Router({
  prefix: "/api/v1",
});

router.post("/createPage", async (ctx) => {
  await createMainNotionPage();
});

export default router;
