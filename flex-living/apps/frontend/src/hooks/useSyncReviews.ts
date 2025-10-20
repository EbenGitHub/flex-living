import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSyncReviews() {
  const queryClient = useQueryClient();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/review/sync-hostaway`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to sync reviews`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Reviews are synced from Hostaway succesfully");
    },
  });
}
