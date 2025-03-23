import redis from "../../redis.js";

const checkCache = (cacheKey) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const key = id ? `${cacheKey}:${id}` : cacheKey;
    const cachedData = await redis.get(key);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      next();
    }
  };
};

export default checkCache;
