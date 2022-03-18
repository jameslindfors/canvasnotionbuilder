import type { ActiveCourses } from "../../types/activeCoursesTypes";
import { getActiveCourses } from "../fetch/getActiveCourses";

// Types
import { Context } from "koa";
import {
  AppendBlockChildrenResponse,
  UpdatePageResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Operations
import {
  generateDefaultNotionPage,
  createDefaultNotionInfoBlocks,
} from "../operations/pageSetup";
import { createGradeTableBlock } from "../operations/createGradeTableBlock";
import { createUpcomingAssignmentsTodo } from "../operations/createUpcomingAssignmentsTodo";

export const createDefaultNotionPage = async (ctx: Context) => {
  const courses: ActiveCourses = await getActiveCourses();
  const currTerm = courses[0].term.name;

  await generateDefaultNotionPage(currTerm)
    .then(async (page: UpdatePageResponse) => {
      const block: AppendBlockChildrenResponse =
        await createDefaultNotionInfoBlocks(page.id);
      const lastBlockId =
        block.results.length > 0
          ? block.results[block.results.length - 1].id
          : page.id;
      // ? save page id and block id to database
      await createGradeTableBlock(lastBlockId, courses);
      await createUpcomingAssignmentsTodo(lastBlockId);
    })
    .catch((err) => {
      // * Eventually store this error in a log file
      console.log(err);
      ctx.status = 500;
    })
    .finally(() => {
      ctx.status = 200;
    });
};
