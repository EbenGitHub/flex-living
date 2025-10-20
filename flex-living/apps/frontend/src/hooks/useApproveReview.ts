import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApproveReview() {
  const queryClient = useQueryClient();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${apiUrl}/review/approve/${id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`Failed to approve review with ID ${id}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
