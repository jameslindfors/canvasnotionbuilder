import Koa from "koa";
import router from "./api/router";
import { env } from "./utils/env";
const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(env.PORT, () =>
  console.log(`Server is listening on port ${env.PORT}`)
);
