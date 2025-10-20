import { MetricsCards } from "@/components/ui/MetricsCards";
import { Review } from "@flex-living/types";
import { RatingTrendsChart } from "@/components/ui/RatingTrendsChart";
import { CategoryBreakdownChart } from "@/components/ui/CategoryBreakdownChart";
import { PropertyComparisonChart } from "@/components/ui/PropertyComparisonChart";
import { RatingDistributionChart } from "@/components/ui/RatingDistributionChart";

const properties = [
  "2B N1 A - 29 Shoreditch Heights",
  "1B E2 - 15 Hackney Road",
  "Studio W1 - 8 Soho Square",
  "3B SW3 - 42 Chelsea Manor",
  "2B N7 - 17 Holloway Road",
  "1B SE1 - 23 London Bridge",
];

const guestNames = [
  "Shane Finkelstein",
  "Emma Thompson",
  "Michael Chen",
  "Sarah Johnson",
  "David Martinez",
  "Lisa Anderson",
  "James Wilson",
  "Maria Garcia",
  "Robert Brown",
  "Jennifer Lee",
];

const reviewTexts = [
  "Wonderful stay! The property was clean and well-maintained. Would definitely recommend!",
  "Great location and very responsive host. Everything was as described.",
  "Amazing experience! The apartment exceeded our expectations. Very comfortable.",
  "Good stay overall. A few minor issues but the host resolved them quickly.",
  "Perfect for our needs. Clean, modern, and in a great location.",
  "Lovely property with all the amenities we needed. Would stay again!",
  "The apartment was spacious and well-equipped. Great value for money.",
  "Fantastic experience from start to finish. Highly recommend!",
  "Very comfortable stay. The host was helpful and communicative.",
  "Nice property but could use some updates. Still a good experience overall.",
];

const generateRandomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

const generateRating = (baseRating: number) => {
  const variation = Math.floor(Math.random() * 3) - 1;
  return Math.max(1, Math.min(10, baseRating + variation));
};

export const generateMockReviews = (count: number = 50): Review[] => {
  const reviews: Review[] = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-01-19');

  for (let i = 0; i < count; i++) {
    const baseRating = Math.random() > 0.15 ? 8 : Math.floor(Math.random() * 5) + 4;
    const overallRating = generateRating(baseRating);
    
    reviews.push({
      id: 7453 + i,
      type: "host-to-guest",
      status: Math.random() > 0.1 ? "published" : "pending",
      rating: Math.random() > 0.05 ? overallRating : null,
      publicReview: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
      reviewCategory: [
        {
          category: "cleanliness",
          rating: generateRating(baseRating),
        },
        {
          category: "communication",
          rating: generateRating(baseRating),
        },
        {
          category: "respect_house_rules",
          rating: generateRating(baseRating),
        },
      ],
      submittedAt: generateRandomDate(startDate, endDate),
      guestName: guestNames[Math.floor(Math.random() * guestNames.length)],
      listingName: properties[Math.floor(Math.random() * properties.length)],
      isApproved: Math.random() > 0.3,
    });
  }

  return reviews.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
};

export const mockReviews = generateMockReviews(100);

export default function Home() {
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
