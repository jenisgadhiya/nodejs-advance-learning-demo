import redis from "redis";

// Create Redis client
const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;
