"use client"

import { Review } from "@flex-living/types";
import { Card, CardContent } from "@flex-living/ui/cards";
import { CheckCircle, MessageSquare, Star, TrendingUp } from "lucide-react";

interface MetricsCardsProps {
  reviews: Review[];
}

export const MetricsCards = ({ reviews }: MetricsCardsProps) => {
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.isApproved).length;
  const avgRating = reviews.reduce((sum, r) => {
    if (r.rating) return sum + r.rating;
    const categoryAvg = r.reviewCategory.reduce((s, c) => s + c.rating, 0) / r.reviewCategory.length;
    return sum + categoryAvg;
  }, 0) / reviews.length;
  
  const approvalRate = (approvedReviews / totalReviews) * 100;
  
  // Calculate trend (compare last 30 days vs previous 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  
  const recentReviews = reviews.filter(r => new Date(r.submittedAt) >= thirtyDaysAgo);
  const previousReviews = reviews.filter(r => {
    const date = new Date(r.submittedAt);
    return date >= sixtyDaysAgo && date < thirtyDaysAgo;
  });
  
  const trend = ((recentReviews.length - previousReviews.length) / (previousReviews.length || 1)) * 100;

  const metrics = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: MessageSquare,
      trend: `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`,
      trendUp: trend > 0,
    },
    {
      title: "Average Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      suffix: "/10",
      color: avgRating >= 8 ? "text-accent" : avgRating >= 6 ? "text-warning" : "text-destructive",
    },
    {
      title: "Approval Rate",
      value: approvalRate.toFixed(1),
      icon: CheckCircle,
      suffix: "%",
      color: "text-accent",
    },
    {
      title: "Recent Activity",
      value: recentReviews.length,
      icon: TrendingUp,
      subtitle: "Last 30 days",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className={`text-3xl font-bold ${metric.color || 'text-foreground'}`}>
                    {metric.value}
                  </h3>
                  {metric.suffix && (
                    <span className="text-lg text-muted-foreground">{metric.suffix}</span>
                  )}
                </div>
                {metric.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                )}
                {metric.trend && (
                  <p className={`text-sm mt-1 ${metric.trendUp ? 'text-accent' : 'text-destructive'}`}>
                    {metric.trend} from last period
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full bg-primary/10`}>
                <metric.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
