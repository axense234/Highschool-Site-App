const redisClientConfig =
  {
    url: process.env.REDIS_INSTANCE_URL,
  } || undefined;

export default redisClientConfig;
