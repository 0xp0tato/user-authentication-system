import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

//Initializing Server
const app = express();

//Connect to DB
connectDB;

//Use middllewares
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

//Load routes
app.use("/api/user", userRoutes);

//Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
