import { useQuery } from "@tanstack/react-query";
import { Review } from "@flex-living/types";

export interface ResponseData<T> {
  statusCode: number;
  data: T;
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async (): Promise<Array<Review>> => {
      const response = await fetch("http://localhost:3001/api/review", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2MTE0OCIsImp0aSI6Ijk4YTFkMTI2OWM0Yzc4Zjc3MzFmMWFhNzcxOGQ2NWNmY2M0NTZlY2VkYTQwOGNkYTc0ZDNlMzQwNjYzODAzMmZlY2IyNjk4OTllZmJiOTliIiwiaWF0IjoxNzYwODk5NTU2LjE4MjYzNiwibmJmIjoxNzYwODk5NTU2LjE4MjYzNywiZXhwIjoyMDc2NDMyMzU2LjE4MjY0MSwic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjY1MzEwfQ.VrVZLhcDQbVRs10GcHbN9VSKWVzYtw6IjfmAGwNMSDvKXw_ToALZ5NeozWSxpRZnLAv3Bih2yJ8ycUUV8nJzX8K1pazDY3NmkH7SrGP4f4Eqk2LZaoQkhBO6d75g4Og2u5TKgptvCYfWAEmXbPNhuYZR59idxAApnyLQpLwZ7NfhlxJrabLh0sy0GGLnfJngbn_GxzTyvnUKeuiQgciPC2Z6HR2_J_svAVGEsX6995uPFTcQkHYWfPOZ3B4kwCpOS2tNktbTSY24t5BcH_95sy2i_GVRwRteTSVfQuaI-9tz3265nPFddCx_e0yhZvnMKNfiyvEtZuU9CI-1hwk3VA",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    },
  });
}
