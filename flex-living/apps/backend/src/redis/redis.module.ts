import { Module, Global } from '@nestjs/common';
import { RedisProvider } from './redis.provider';

@Global() // optional: makes Redis client globally available
@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
