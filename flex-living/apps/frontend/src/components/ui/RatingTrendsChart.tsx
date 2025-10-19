"use client"
import { Review } from "@flex-living/types";
import { Card, CardHeader, CardTitle, CardContent } from "@flex-living/ui/cards";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RatingTrendsChartProps {
  reviews: Review[];
}

export const RatingTrendsChart = ({ reviews }: RatingTrendsChartProps) => {
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
      avgRating: (data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length).toFixed(1),
      cleanliness: (data.cleanliness.reduce((a: number, b: number) => a + b, 0) / data.cleanliness.length).toFixed(1),
      communication: (data.communication.reduce((a: number, b: number) => a + b, 0) / data.communication.length).toFixed(1),
      respect: (data.respect.reduce((a: number, b: number) => a + b, 0) / data.respect.length).toFixed(1),
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
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 10]} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgRating" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={3}
              name="Overall Rating"
              dot={{ fill: 'hsl(var(--chart-1))' }}
            />
            <Line 
              type="monotone" 
              dataKey="cleanliness" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Cleanliness"
            />
            <Line 
              type="monotone" 
              dataKey="communication" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              name="Communication"
            />
            <Line 
              type="monotone" 
              dataKey="respect" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2}
              name="House Rules"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
