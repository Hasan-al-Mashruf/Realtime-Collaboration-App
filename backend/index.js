import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./app/middleware/errorHandler.js";
import userRoutes from "./app/routes/userRoute.js";
import taskRoutes from "./app/routes/taskRoute.js";
import { connectDB } from "./server.js";
import createError from "./app/utils/createError.js";
import session from "express-session";
import { connectRedis, redisStore } from "./redis.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { io as socketClient } from "socket.io-client"; // Import socket.io-client to simulate a client

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    store: redisStore,
    name: "collaboarationSession",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 5 * 60 * 1000 },
  })
);

// Connect to database
connectDB();

// Connect to caching server
connectRedis();

// socket connection
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello world" });
});

// catch not found routes
app.get("*", function (req, res, next) {
  next(createError("what???", 404));
});

// global error handler
app.use(errorHandler);

// Create socket connection from the server to simulate a client
const simulateClient = () => {
  const clientSocket = socketClient(`http://localhost:${port}`);

  clientSocket.on("connect", () => {
    console.log("Simulated client connected to the server");
  });

  clientSocket.on("disconnect", () => {
    console.log("Simulated client disconnected");
  });
};

// Start the server and simulate the client
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  simulateClient(); // This will simulate a client connection to the socket server
});
