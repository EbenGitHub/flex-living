import { useQuery } from "@tanstack/react-query";
import { Review } from "@flex-living/types";

export interface ResponseData<T> {
  statusCode: number;
  data: T;
}

export function useApprovedReviews() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return useQuery({
    queryKey: ["approved-reviews"],
    queryFn: async (): Promise<Array<Review>> => {
      const response = await fetch(`${apiUrl}/review/approved`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    },
  });
}
