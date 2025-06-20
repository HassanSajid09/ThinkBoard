import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDb = async () => {
  mongoose.connect(process.env.Data_Base_Url || "", {
    retryWrites: true,
    retryReads: true,
  });
  //   const db = mongoose.connection;
  //   db.on("error", (err: string) => console.error(err));
  //   db.once("open", () => console.log("DataBase Connected"));
  console.log("DataBase Connected");
};

export default ConnectDb;
