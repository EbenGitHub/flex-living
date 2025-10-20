"use client"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useApprovedReviews } from "@/hooks/useApprovedReviews";
import { Quote, Star } from "lucide-react";


const ReviewsSection = () => {
    const {data: reviews, isPending, error} = useApprovedReviews();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from guests who have stayed with The Flex
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {isPending && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-gray-100 animate-pulse" />
            ))
          )}

          {!isPending && error && (
            <div className="md:col-span-2 lg:col-span-3">
              <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-700">
                Failed to load reviews. Please try again later.
              </div>
            </div>
          )}

          {!isPending && !error && (reviews ?? []).length === 0 && (
            <div className="md:col-span-2 lg:col-span-3">
              <div className="rounded-md border p-6 text-center text-muted-foreground">
                No reviews to display yet.
              </div>
            </div>
          )}

          {!isPending && !error && (reviews??[]).map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {review.guestName}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{review.guestName}</h3>
                  <p className="text-sm text-muted-foreground">{review.listingName}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-2">
                  {review.submittedAt}
                </span>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">
                {review.publicReview}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-lg font-semibold text-foreground mb-2">
            Average Rating: 5.0 ⭐
          </p>
          <p className="text-muted-foreground">
            Based on 500+ verified reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
