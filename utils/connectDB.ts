import { createConnection } from "typeorm";

export const connectDB = async (retries: number) => {
  while (retries) {
    try {
      await createConnection();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
