import { FactoryProvider } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export const RedisProvider: FactoryProvider<RedisClientType> = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const client: RedisClientType = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    await client.connect();
    return client;
  },
};
