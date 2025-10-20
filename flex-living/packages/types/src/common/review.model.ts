export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  isApproved: boolean;
}

export interface NormalizedReview {
  listingName: string;
  type: string;
  source: string;
  date: string;
  totalReviews: number;
  avgRating: number;
  ratings: number[];
}
