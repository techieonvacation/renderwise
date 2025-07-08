"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "@/app/components/ui/Loader";

// Dynamically import components
const AboutUs = dynamic(() => import("./AboutUs"));
const BenefitsAndPerks = dynamic(() => import("./BenefitsAndPerks"));
const CurrentOpenings = dynamic(() => import("./CurrentOpenings"));

const Careers = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Suspense fallback={<Loader />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <CurrentOpenings />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <BenefitsAndPerks />
      </Suspense>
    </main>
  );
};

export default Careers;
