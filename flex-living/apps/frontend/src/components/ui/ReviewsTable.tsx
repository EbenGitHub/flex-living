"use client"
import { useApproveReview } from "@/hooks/useApproveReview";
import { useDisproveReview } from "@/hooks/useDisproveReview";
import { useReviews } from "@/hooks/useReviews";
import { Review } from "@flex-living/types";
import { Badge } from "@flex-living/ui/badges";
import { Card, CardContent, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { Button, Input } from "@flex-living/ui/forms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flex-living/ui/selects";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@flex-living/ui/tables";
import { CheckCircle, ChevronLeft, ChevronRight, Search, Star, XCircle } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent } from "react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export const ReviewsTable = () => {
  const [searchTerm, setSearchTerm] = useQueryState<string>("search", parseAsString.withDefault(""));
  const [propertyFilter, setPropertyFilter] = useQueryState<string>("property-filter", parseAsString.withDefault("all"));
  const [statusFilter, setStatusFilter] = useQueryState<string>("status-filter", parseAsString.withDefault("all"));
  const [ratingFilter, setRatingFilter] = useQueryState<string>("rating-filter", parseAsString.withDefault("all"));
  const [currentPage, setCurrentPage] = useQueryState<number>("page", parseAsInteger.withDefault(1));

  const {data: reviews} = useReviews()
  const approveMutation = useApproveReview();
  const disproveMutation = useDisproveReview();

  const properties = Array.from(new Set(reviews?.map(r => r.listingName)));

  const filteredReviews = (reviews??[]).filter(review => {
    const matchesSearch = review.publicReview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProperty = propertyFilter === "all" || review.listingName === propertyFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "approved" && review.isApproved) ||
                         (statusFilter === "pending" && !review.isApproved);
    
    let matchesRating = true;
    if (ratingFilter !== "all") {
      const avgRating = review.rating || 
        review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length;
      
      if (ratingFilter === "excellent") matchesRating = avgRating >= 9;
      else if (ratingFilter === "good") matchesRating = avgRating >= 7 && avgRating < 9;
      else if (ratingFilter === "average") matchesRating = avgRating >= 5 && avgRating < 7;
      else if (ratingFilter === "poor") matchesRating = avgRating < 5;
    }

    return matchesSearch && matchesProperty && matchesStatus && matchesRating;
  });

    const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };



  // Pagination calculations
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleApprovalToggle = (id: number, currentStatus: boolean) => {
    if (!currentStatus) approveMutation.mutate(id);
    else disproveMutation.mutate(id)
    toast.success(
      !currentStatus ? "Review approved for public display" : "Review removed from public display"
    );
  };

  const getAverageRating = (review: Review) => {
    if (review.rating) return review.rating;
    return review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews Management</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews or guest names..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select value={propertyFilter} onValueChange={handleFilterChange(setPropertyFilter)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {properties.map(property => (
                <SelectItem key={property} value={property}>
                  {property.split(' - ')[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={handleFilterChange(setRatingFilter)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="excellent">Excellent (9-10)</SelectItem>
              <SelectItem value="good">Good (7-8)</SelectItem>
              <SelectItem value="average">Average (5-6)</SelectItem>
              <SelectItem value="poor">Poor (1-4)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No reviews found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                paginatedReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.guestName}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {review.listingName.split(' - ')[0]}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{getAverageRating(review).toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate">{review.publicReview}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(review.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={review.isApproved ? "default" : "secondary"}>
                        {review.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={review.isApproved ? "outline" : "default"}
                        onClick={() => handleApprovalToggle(review.id, review.isApproved)}
                        className="gap-1"
                      >
                        {review.isApproved ? (
                          <>
                            <XCircle className="h-4 w-4" />
                            Remove
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {filteredReviews.length > 0 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredReviews.length)} of {filteredReviews.length} reviews
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={!canGoPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current
                    return page === 1 || 
                           page === totalPages || 
                           Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    </div>
                  ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!canGoNext}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
