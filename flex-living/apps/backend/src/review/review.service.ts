import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewCategory } from '../entities/review-category.entity';
import { Review } from '../entities/review.entity';
import { ThirdPartyService } from '../thrid-parties/third-party.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { instanceToPlain } from 'class-transformer';
import { NormalizedReview, Review as ReviewType } from '@flex-living/types';

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

  async syncReviewsFromGoogleReview(): Promise<void> {}

  normalizeReviews(reviews: Review[]) {
    const map = new Map<string, NormalizedReview>();

    for (const review of reviews) {
      const dateKey = new Date(review.submittedAt).toISOString().split('T')[0]; // YYYY-MM-DD
      const key = `${review.listingName}|${review.type}|${review.source}|${dateKey}`;

      const avgRating =
        review.rating ??
        review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) /
          review.reviewCategory.length;

      if (map.has(key)) {
        const entry = map.get(key)!;
        entry.ratings.push(avgRating);
        entry.totalReviews += 1;
        entry.avgRating =
          entry.ratings.reduce((a, b) => a + b, 0) / entry.ratings.length;
      } else {
        map.set(key, {
          listingName: review.listingName,
          type: review.type,
          source: review.source,
          date: dateKey,
          totalReviews: 1,
          avgRating: avgRating,
          ratings: [avgRating],
        });
      }
    }

    return Array.from(map.values());
  }

  async syncReviewsFromHostaway(): Promise<void> {
    try {
      const data = await this.thirdParty.get<{ result: ReviewType[] }>(
        '/reviews',
      );

      for (const item of data.result) {
        const existing = await this.reviewRepo.findOne({
          where: { sourceId: item.id.toString(), source: 'hostaway' },
        });
        if (existing) {
          this.logger.log(`Skipping review ${item.id} (already exists)`);
          continue;
        }

        // Create Review entity
        const review = this.reviewRepo.create({
          type: item.type,
          status: item.status,
          rating: item.rating,
          publicReview: item.publicReview,
          submittedAt: new Date(item.submittedAt),
          guestName: item.guestName,
          listingName: item.listingName,
          sourceId: item.id.toString(),
          source: 'hostaway',
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
    return instanceToPlain(this.reviewRepo.find());
  }

  async getNormalizedReviews(): Promise<NormalizedReview[]> {
    const reviews = await this.reviewRepo.find({
      relations: ['reviewCategory'],
    });

    return this.normalizeReviews(reviews);
  }

  async findApprovedReviews() {
    return instanceToPlain(
      this.reviewRepo.find({ where: { isApproved: true } }),
    );
  }

  async approveReview(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    review.isApproved = true;
    return this.reviewRepo.save(review);
  }

  async disapproveReview(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    review.isApproved = false;
    return this.reviewRepo.save(review);
  }
}
