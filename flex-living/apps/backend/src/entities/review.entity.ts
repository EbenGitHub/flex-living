import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReviewCategory } from './review-category.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  type!: string; // e.g., "host-to-guest"

  @Column({ type: 'varchar', default: 'published' })
  status!: string; // e.g., "published"

  @Column({ type: 'float', nullable: true })
  rating!: number | null;

  @Column({ type: 'text', nullable: true })
  publicReview!: string;

  @OneToMany(() => ReviewCategory, (category) => category.review, {
    cascade: true,
    eager: true, // automatically load the categories when you fetch a review
  })
  reviewCategory!: ReviewCategory[];

  @CreateDateColumn({ type: 'timestamp' })
  submittedAt!: Date;

  @Column({ type: 'varchar' })
  guestName!: string;

  @Column({ type: 'varchar' })
  listingName!: string;
}
