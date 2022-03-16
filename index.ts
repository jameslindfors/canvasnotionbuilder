import "reflect-metadata";
import Koa from "koa";
import router from "./api/router";
import { env } from "./utils/env";
import { connectDB } from "./utils/connectDB";
const app = new Koa();

// connectDB(10);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(env.PORT, () =>
  console.log(`Server is listening on port ${env.PORT}`)
);
