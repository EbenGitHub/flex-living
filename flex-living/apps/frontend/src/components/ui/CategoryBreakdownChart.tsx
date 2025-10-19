"use client"
import { Review } from "@flex-living/types";
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CategoryBreakdownChartProps {
  reviews: Review[];
}

export const CategoryBreakdownChart = ({ reviews }: CategoryBreakdownChartProps) => {
  const categories = ['cleanliness', 'communication', 'respect_house_rules'];
  
  const categoryData = categories.map(category => {
    const ratings = reviews.flatMap(r => 
      r.reviewCategory.filter(c => c.category === category).map(c => c.rating)
    );
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    
    return {
      category: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      rating: parseFloat(avg.toFixed(2)),
    };
  });

  const getColor = (rating: number) => {
    if (rating >= 8) return 'hsl(var(--chart-2))';
    if (rating >= 6) return 'hsl(var(--chart-4))';
    return 'hsl(var(--destructive))';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
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
