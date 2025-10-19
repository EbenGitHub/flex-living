import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewCategory } from '../entities/review-category.entity';
import { Review } from '../entities/review.entity';
import { ThirdPartyModule } from '../thrid-parties/third-party.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewCategory]),
    HttpModule,
    ThirdPartyModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
