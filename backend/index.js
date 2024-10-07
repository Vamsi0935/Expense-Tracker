import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transaction.route.js";

const app = express();

app.use(express.json());
app.use(cors({ [origin: "http://localhost:3000","https://expense-tracker-puce-nine-25.vercel.app"], credentials: true, methods:["GET", "POST", "PUT", "DELETE"] }));

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:buLBnYaEHekPPxr3@cluster0.l9lat.mongodb.net/ExpenceTracker?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully....");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api", transactionRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000....");
});
