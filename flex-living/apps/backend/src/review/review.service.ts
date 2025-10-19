import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewCategory } from '../entities/review-category.entity';
import { Review } from '../entities/review.entity';
import { ThirdPartyService } from '../thrid-parties/third-party.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(ReviewCategory)
    private readonly categoryRepo: Repository<ReviewCategory>,
    private readonly thirdParty: ThirdPartyService,
  ) {}
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  async syncReviewsFromHostaway(): Promise<void> {
    try {
      const data = await this.thirdParty.get<{ result: any[] }>('/reviews');

      // Assuming data is an array of reviews
      for (const item of data.result) {
        const existing = await this.reviewRepo.findOne({
          where: { id: item.id },
        });
        if (existing) {
          this.logger.log(`Skipping review ${item.id} (already exists)`);
          continue;
        }

        // Create Review entity
        const review = this.reviewRepo.create({
          id: item.id,
          type: item.type,
          status: item.status,
          rating: item.rating,
          publicReview: item.publicReview,
          submittedAt: new Date(item.submittedAt),
          guestName: item.guestName,
          listingName: item.listingName,
        });

        await this.reviewRepo.save(review);

        // Handle categories
        for (const cat of item.reviewCategory) {
          const category = this.categoryRepo.create({
            category: cat.category,
            rating: cat.rating,
            review, // relation
          });
          await this.categoryRepo.save(category);
        }

        this.logger.log(`Saved review ${item.id}`);
      }

      this.logger.log('Sync completed successfully.');
    } catch (error) {
      this.logger.error('Error during sync', error);
    }
  }

  async findAll() {
    const data = await this.thirdParty.get<{ result: any[] }>('/reviews');
    return data.result;
    return this.reviewRepo.find();
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
