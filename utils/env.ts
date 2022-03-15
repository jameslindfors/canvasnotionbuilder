import { load } from "ts-dotenv";

export const env = load({
  PORT: String,
  CANVAS_API_TOKEN: String,
  CANVAS_API_DOMAIN: String,
  NOTION_API_TOKEN: String,
  NOTION_DATABASE_ID: String,
  NOTION_PAGE_ID: String,
});
