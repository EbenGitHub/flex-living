import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  category!: string; // e.g., "cleanliness"

  @Column({ type: 'float' })
  rating!: number;

  @ManyToOne(() => Review, (review) => review.reviewCategory, {
    onDelete: 'CASCADE',
  })
  review!: Review;
}
