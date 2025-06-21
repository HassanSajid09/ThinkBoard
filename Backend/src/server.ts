import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import notes from "./Routes/Notes";
import rateLimiter from "./Middlewares/RateLimiter";
import { asyncMiddleware } from "./utils/asyncMiddleware";
import ConnectDb from "./Config/db";

dotenv.config();
const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(asyncMiddleware(rateLimiter));
app.use("/notes", notes);

ConnectDb()
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log(`Server Started at Port ${process.env.Port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
