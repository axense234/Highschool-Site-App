const redisClientConfig =
  {
    url: process.env.REDIS_INSTANCE,
  } || undefined;

export default redisClientConfig;
