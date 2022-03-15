import type { ActiveCourses } from "../../types/activeCoursesTypes";
import { getActiveCourses } from "../fetch/getActiveCourses";

// Types
import { Context } from "koa";
import {
  AppendBlockChildrenResponse,
  UpdatePageResponse,
} from "@notionhq/client/build/src/api-endpoints";

import {
  generateDefaultNotionPage,
  propagateDefaultNotionInfoBlocks,
  propagateDefaultNotionTableBlock,
  generateDefaultCourseNotionDatabase,
} from "../operations/notion_setup";

export const createMainNotionPage = async (ctx: Context) => {
  const courses: ActiveCourses = await getActiveCourses();
  const currTerm = courses[0].term.name;

  await generateDefaultNotionPage(currTerm)
    .then(async (page: UpdatePageResponse) => {
      const block: AppendBlockChildrenResponse =
        await propagateDefaultNotionInfoBlocks(page.id);
      const lastBlockId =
        block.results.length > 0
          ? block.results[block.results.length - 1].id
          : page.id;
      ctx.body = block.results;
      await propagateDefaultNotionTableBlock(lastBlockId, courses);
    })
    .catch((err) => {
      // Eventually store this error in a log file
      console.log(err);
      ctx.status = 500;
    })
    .finally(() => {
      ctx.status = 200;
    });
};
