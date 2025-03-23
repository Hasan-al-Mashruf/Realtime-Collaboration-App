import { RedisStore } from "connect-redis";
import { Redis } from "ioredis";

// Create a Redis connection instance
const redis = new Redis({
  port: process.env.REDISPORT,
  host: process.env.REDISHOST,
});

// Create a Redis session store instance
export let redisStore = new RedisStore({
  client: redis,
  prefix: "myapp:",
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
