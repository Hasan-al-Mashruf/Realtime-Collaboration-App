import { Redis } from "ioredis";

// Create a Redis connection instance
const redis = new Redis({
  port: process.env.REDISPORT,
  host: process.env.REDISHOST,
});

// Function to connect to Redis
export const connectRedis = () => {
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err) => {
    console.error("Error connecting to Redis:", err);
  });
};

export default redis;
