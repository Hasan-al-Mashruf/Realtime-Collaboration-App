import redis from "../../redis.js";

const updateCache = async (cacheKey, data) => {
  await redis.set(cacheKey, JSON.stringify(data), "EX", 3600);
};
export default updateCache;
