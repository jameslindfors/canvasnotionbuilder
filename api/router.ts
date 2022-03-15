import Router from "@koa/router";
import axios from "axios";
import { env } from "../utils/env";
import { getActiveCourses } from "./fetch/getActiveCourses";

const router = new Router({
  prefix: "/api/v1",
});

router.get("/connectNotion", async (ctx) => {
  ctx.body = "Connect Notion";
});
router.get("/getCurrentCourseData", async () => await getActiveCourses());

export default router;
