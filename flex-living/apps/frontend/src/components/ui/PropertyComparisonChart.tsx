"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { Review } from "@flex-living/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PropertyComparisonChartProps {
  reviews: Review[];
}

export const PropertyComparisonChart = ({ reviews }: PropertyComparisonChartProps) => {
  const propertyData = reviews.reduce((acc, review) => {
    const propertyKey = review.listingName;
    
    if (!acc[propertyKey]) {
      acc[propertyKey] = {
        property: propertyKey.split(' - ')[0],
        ratings: [],
        totalReviews: 0,
      };
    }
    
    const avgRating = review.rating || 
      review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length;
    
    acc[propertyKey].ratings.push(avgRating);
    acc[propertyKey].totalReviews++;
    
    return acc;
  }, {} as Record<string, {ratings: number[], totalReviews: number, property: string}>);

  const chartData = Object.values(propertyData)
    .map((data) => ({
      property: data.property,
      avgRating: parseFloat((data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length).toFixed(2)),
      reviews: data.totalReviews,
    }))
    .sort((a, b) => b.avgRating - a.avgRating);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              domain={[0, 10]} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="property" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={100}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar 
              dataKey="avgRating" 
              fill="hsl(var(--chart-1))" 
              radius={[0, 8, 8, 0]}
              name="Avg Rating"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
