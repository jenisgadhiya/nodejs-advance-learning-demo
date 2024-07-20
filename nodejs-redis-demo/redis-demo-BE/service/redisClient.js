import redis from "redis";

// Create Redis client
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

redisClient.on("connect", () => {
  redisClient.flushDb();
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;
