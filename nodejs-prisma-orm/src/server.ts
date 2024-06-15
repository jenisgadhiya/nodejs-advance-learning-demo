import express from "express";
import errorhandler from "error-handler";
import router from "./router";

const app = express();

app.use(express.json());

app.use("/api", router);

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

export default app;
