"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { Review } from "@flex-living/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PropertyComparisonChartProps {
  reviews: Review[];
  isPending?: boolean;
}

export const PropertyComparisonChart = ({ reviews, isPending }: PropertyComparisonChartProps) => {
  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Property Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse rounded-md bg-gray-100" />
        </CardContent>
      </Card>
    );
  }
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
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" /> {/* gray-200 */}
            <XAxis 
              type="number" 
              domain={[0, 10]} 
              stroke="#6b7280" // gray-500
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="property" 
              stroke="#6b7280" // gray-500
              fontSize={12}
              width={100}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb', // gray-50
                border: '1px solid #e5e7eb', // gray-200
                borderRadius: '0.5rem', // 8px
                padding: '0.5rem 1rem',
                color: '#111827', // gray-900
              }}
            />
            <Legend />
            <Bar 
              dataKey="avgRating" 
              fill="#3b82f6" // blue-500
              radius={[0, 8, 8, 0]}
              name="Avg Rating"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
