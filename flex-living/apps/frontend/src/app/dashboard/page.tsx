"use client"
import { MetricsCards } from "@/components/ui/MetricsCards";
import { RatingTrendsChart } from "@/components/ui/RatingTrendsChart";
import { CategoryBreakdownChart } from "@/components/ui/CategoryBreakdownChart";
import { PropertyComparisonChart } from "@/components/ui/PropertyComparisonChart";
import { RatingDistributionChart } from "@/components/ui/RatingDistributionChart";
import { useReviews } from "@/hooks/useReviews";


export default function Home() {
  const {data: reviews} = useReviews()
  const mockReviews = reviews ?? []
  return (
    <div className="min-h-screen bg-background">
       <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Performance Overview</h2>
          <p className="text-muted-foreground">Monitor key metrics and trends across all properties</p>
        </div>

        <MetricsCards reviews={mockReviews} />

        <div className="grid gap-6 lg:grid-cols-2">
          <RatingTrendsChart reviews={mockReviews} />
          <CategoryBreakdownChart reviews={mockReviews} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PropertyComparisonChart reviews={mockReviews} />
          <RatingDistributionChart reviews={mockReviews} />
        </div>
      </main>
    </div>
  );
}
