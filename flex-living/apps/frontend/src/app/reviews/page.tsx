import { ReviewsTable } from "@/components/ui/ReviewsTable";
import { Suspense } from "react";


export default function Home() {

  return (
    <div className="min-h-screen bg-background">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Review Management</h2>
          <p className="text-muted-foreground">
            Manage guest reviews and control which reviews appear on your public website
          </p>
        </div>

        <Suspense>
          <ReviewsTable/>
        </Suspense>
    </div>
  );
}
