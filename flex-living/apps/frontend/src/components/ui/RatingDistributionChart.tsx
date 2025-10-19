"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { Review } from "@flex-living/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface RatingDistributionChartProps {
  reviews: Review[];
}

export const RatingDistributionChart = ({ reviews }: RatingDistributionChartProps) => {
  const distribution = {
    excellent: 0, // 9-10
    good: 0,      // 7-8
    average: 0,   // 5-6
    poor: 0,      // 1-4
  };

  reviews.forEach(review => {
    const avgRating = review.rating || 
      review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length;

    if (avgRating >= 9) distribution.excellent++;
    else if (avgRating >= 7) distribution.good++;
    else if (avgRating >= 5) distribution.average++;
    else distribution.poor++;
  });

  const chartData = [
    { name: 'Excellent (9-10)', value: distribution.excellent, color: '#16a34a' }, // green-600
    { name: 'Good (7-8)', value: distribution.good, color: '#3b82f6' },           // blue-500
    { name: 'Average (5-6)', value: distribution.average, color: '#f59e0b' },      // yellow-500
    { name: 'Poor (1-4)', value: distribution.poor, color: '#dc2626' },            // red-600
  ].filter(d => d.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              // @ts-ignore
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
