import { Module } from '@nestjs/common';
import { ThirdPartyService } from './third-party.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [HttpModule, ConfigModule, RedisModule],
  providers: [ThirdPartyService],
  exports: [ThirdPartyService], // <- export it
})
export class ThirdPartyModule {}
