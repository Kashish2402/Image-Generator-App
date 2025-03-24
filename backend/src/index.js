import { app } from "./app.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error :::${error}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) =>
    console.log(`MONGODB CONNECTION FAILED !!! ERROR ::: ${err}`)
  );
