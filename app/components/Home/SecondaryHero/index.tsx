  import { Suspense } from "react";
import { TextSkeleton } from "@/app/components/ui/skeleton";

import { getSecondaryHeroData, getTeamMembers } from "./api";
import { ClientSide } from "./ClientSide";

export default async function SecondaryHero() {
  try {
    // Fetch data in parallel
    const [heroData, teamMembers] = await Promise.all([
      getSecondaryHeroData(),
      getTeamMembers(),
    ]);

    // If no data was found, don't render anything
    if (!heroData || !teamMembers) {
      return null;
    }

    return (
      <Suspense fallback={<TextSkeleton className="h-[500px] w-full" />}>
        <ClientSide heroData={heroData} teamMembers={teamMembers} />
      </Suspense>
    );
  } catch (error) {
    console.error("Failed to fetch SecondaryHero data:", error);
    return null; // Or render an error UI
  }
}
