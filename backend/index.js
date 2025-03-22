import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./app/middleware/errorHandler.js";
import userRoutes from "./app/routes/userRoute.js";
import { connectDB } from "./server.js";
import createError from "./app/utils/createError.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello world" });
});

// catch not found routes
app.get("*", function (req, res, next) {
  next(createError("what???", 404));
});

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
