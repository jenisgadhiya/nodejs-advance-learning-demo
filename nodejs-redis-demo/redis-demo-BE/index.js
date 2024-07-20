import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import redisClient from "./service/redisClient.js";

const app = express();
const PORT = 5000;

redisClient.connect();
mongoose
  .connect("mongodb://127.0.0.1:27017/redis-demo")
  .then((value) => {
    console.log("Mongodb is running now");
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
