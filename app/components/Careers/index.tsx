"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "@/app/components/ui/Loader";

// Dynamically import components
const AboutUs = dynamic(() => import("./AboutUs"));
const BenefitsAndPerks = dynamic(() => import("./BenefitsAndPerks"));
const CurrentOpenings = dynamic(() => import("./CurrentOpenings"));
const ApplicationProcess = dynamic(() => import("./ApplicationProcess"));

const Careers = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* About Us Section with Hero Background */}
      <div className="section-bg-hero">
        <AboutUs />
      </div>

      {/* Current Openings Section with Professional Background */}
      <div className="section-bg-services">
        <Suspense fallback={<Loader />}>
          <CurrentOpenings />
        </Suspense>
      </div>

      {/* Benefits Section with Accent Background */}
      <div className="section-bg-capabilities">
        <Suspense fallback={<Loader />}>
          <BenefitsAndPerks />
        </Suspense>
      </div>

      {/* Application Process Section */}
      <div className="section-bg-testimonials">
        <Suspense fallback={<Loader />}>
          <ApplicationProcess />
        </Suspense>
      </div>
    </main>
  );
};

export default Careers;
