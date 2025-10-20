"use client"
import { Review } from "@flex-living/types";
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RatingTrendsChartProps {
  reviews: Review[];
  isPending: boolean;
}

export const RatingTrendsChart = ({ reviews, isPending }: RatingTrendsChartProps) => {
  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rating Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full animate-pulse rounded-md bg-gray-100" />
        </CardContent>
      </Card>
    );
  }
  // Group reviews by month
  const monthlyData = reviews.reduce((acc, review) => {
    const date = new Date(review.submittedAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        ratings: [],
        cleanliness: [],
        communication: [],
        respect: [],
      };
    }

    const avgRating = review.rating || 
      review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length;

    acc[monthKey].ratings.push(avgRating);

    review.reviewCategory.forEach(cat => {
      if (cat.category === 'cleanliness') acc[monthKey].cleanliness.push(cat.rating);
      if (cat.category === 'communication') acc[monthKey].communication.push(cat.rating);
      if (cat.category === 'respect_house_rules') acc[monthKey].respect.push(cat.rating);
    });

    return acc;
  }, {} as Record<string, {ratings: number[], cleanliness: number[], communication: number[], respect: number[], month: string}>);

  const chartData = Object.values(monthlyData)
    .map((data) => ({
      month: new Date(data.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avgRating: parseFloat((data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length).toFixed(1)),
      cleanliness: parseFloat((data.cleanliness.reduce((a, b) => a + b, 0) / data.cleanliness.length).toFixed(1)),
      communication: parseFloat((data.communication.reduce((a, b) => a + b, 0) / data.communication.length).toFixed(1)),
      respect: parseFloat((data.respect.reduce((a, b) => a + b, 0) / data.respect.length).toFixed(1)),
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-12);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" /> {/* gray-200 */}
            <XAxis 
              dataKey="month" 
              stroke="#6b7280" // gray-500
              fontSize={12}
            />
            <YAxis 
              domain={[0, 10]} 
              stroke="#6b7280" // gray-500
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb', // gray-50
                border: '1px solid #e5e7eb', // gray-200
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                color: '#111827', // gray-900
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgRating" 
              stroke="#3b82f6" // blue-500
              strokeWidth={3}
              name="Overall Rating"
              dot={{ fill: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="cleanliness" 
              stroke="#16a34a" // green-600
              strokeWidth={2}
              name="Cleanliness"
            />
            <Line 
              type="monotone" 
              dataKey="communication" 
              stroke="#f59e0b" // yellow-500
              strokeWidth={2}
              name="Communication"
            />
            <Line 
              type="monotone" 
              dataKey="respect" 
              stroke="#dc2626" // red-600
              strokeWidth={2}
              name="House Rules"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
