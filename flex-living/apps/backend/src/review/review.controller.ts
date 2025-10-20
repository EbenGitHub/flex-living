import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('approved')
  approvedReviews() {
    return this.reviewService.findApprovedReviews();
  }

  @Post('sync-hostaway')
  syncHostaway() {
    return this.reviewService.syncReviewsFromHostaway();
  }

  @Post('sync-google-review')
  syncGoogleReview() {
    return this.reviewService.syncReviewsFromGoogleReview();
  }

  @Patch('approve/:id')
  approveReview(@Param('id') id: string) {
    return this.reviewService.approveReview(+id);
  }

  @Patch('disprove/:id')
  disapproveReview(@Param('id') id: string) {
    return this.reviewService.disapproveReview(+id);
  }
}
