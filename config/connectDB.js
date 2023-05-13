import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;

const connectDB = mongoose
  .connect(mongoDBUri)
  .then(() => {
    console.log(`Conneted to database`);
  })
  .catch((error) => console.log(error));

export default connectDB;
