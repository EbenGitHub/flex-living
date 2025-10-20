"use client"
import { Review } from "@flex-living/types";
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CategoryBreakdownChartProps {
  reviews: Review[];
  isPending?: boolean;
}

export const CategoryBreakdownChart = ({ reviews, isPending }: CategoryBreakdownChartProps) => {
  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse rounded-md bg-gray-100" />
        </CardContent>
      </Card>
    );
  }
  const categories = ['cleanliness', 'communication', 'respect_house_rules'];

  const categoryData = categories.map(category => {
    const ratings = reviews.flatMap(r =>
      r.reviewCategory
        .filter(c => c.category === category)
        .map(c => c.rating)
    );
    const avg = ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;

    return {
      category: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      rating: parseFloat(avg.toFixed(2)),
    };
  });

  // Tailwind-native color mapping
  const getColor = (rating: number) => {
    if (rating >= 8) return '#16a34a'; // green-600
    if (rating >= 6) return '#f59e0b'; // yellow-500
    return '#dc2626'; // red-600
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" /> {/* gray-200 */}
            <XAxis 
              dataKey="category" 
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
                borderRadius: '0.5rem', // 8px
                padding: '0.5rem 1rem',
                color: '#111827', // gray-900
              }}
            />
            <Bar dataKey="rating" radius={[8, 8, 0, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.rating)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
