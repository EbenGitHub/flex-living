import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ReviewCategory } from './review-category.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['source', 'sourceId']) // ensures uniqueness
export class Review {
  @PrimaryGeneratedColumn()
  id!: number; // your own ID

  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'varchar', default: 'published' })
  status!: string;

  @Column({ type: 'float', nullable: true })
  rating!: number | null;

  @Column({ type: 'text', nullable: true })
  publicReview!: string;

  @OneToMany(() => ReviewCategory, (category) => category.review, {
    cascade: true,
    eager: true,
  })
  reviewCategory!: ReviewCategory[];

  @CreateDateColumn({ type: 'timestamp' })
  submittedAt!: Date;

  @Column({ type: 'varchar' })
  guestName!: string;

  @Column({ type: 'varchar' })
  listingName!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  sourceId!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  source!: string;

  @Column({ type: 'boolean', default: false })
  isApproved!: boolean; // new flag to track approval
}
