"use client"

import { Review } from "@flex-living/types";
import { Suspense, useState } from "react";
import { mockReviews } from "../dashboard/page";
import { ReviewsTable } from "@/components/ui/ReviewsTable";


export default function Home() {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleUpdateReview = (id: number, isApproved: boolean) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id ? { ...review, isApproved } : review
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Review Management</h2>
          <p className="text-muted-foreground">
            Manage guest reviews and control which reviews appear on your public website
          </p>
        </div>

        <Suspense>
          <ReviewsTable reviews={reviews} onUpdateReview={handleUpdateReview}/>
        </Suspense>
    </div>
  );
}
