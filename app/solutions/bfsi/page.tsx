import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { BFSI_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  BFSI_STRUCTURED_DATA,
  generateServiceBreadcrumb,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/bfsi/heroContent";
import {
  IntroSection,
  ChallengesSection,
  SolutionsInAction,
  ImpactSection,
  ProcessSection,
  TestimonialsSection,
  FutureReadySection,
} from "../../components/bfsi";
import GetInTouch from "../../components/ui/GetInTouch";

// Generate metadata for the page
export const metadata: Metadata = BFSI_METADATA;

export default async function BFSI() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "BFSI Services",
    "/solutions/bfsi"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={BFSI_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <IntroSection />
        <ChallengesSection />
        <SolutionsInAction />
        <ImpactSection />
        <TestimonialsSection />
        <ProcessSection />
        <FutureReadySection />
        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
