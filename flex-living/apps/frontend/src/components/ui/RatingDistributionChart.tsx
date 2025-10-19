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
    { name: 'Excellent (9-10)', value: distribution.excellent, color: 'hsl(var(--chart-2))' },
    { name: 'Good (7-8)', value: distribution.good, color: 'hsl(var(--chart-1))' },
    { name: 'Average (5-6)', value: distribution.average, color: 'hsl(var(--chart-4))' },
    { name: 'Poor (1-4)', value: distribution.poor, color: 'hsl(var(--destructive))' },
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
              label={({ name, index }) => `${name}: ${(index * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
