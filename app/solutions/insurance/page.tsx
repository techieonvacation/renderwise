import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { INSURANCE_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  generateServiceBreadcrumb,
  INSURANCE_STRUCTURED_DATA,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { 
  heroContent,
  ChallengesSection,
  SolutionsSection,
  ValueSection,
  FutureVisionSection
} from "@/app/components/insurance";
import GetInTouch from "../../components/ui/GetInTouch";

// Generate metadata for the page
export const metadata: Metadata = INSURANCE_METADATA;

export default async function Insurance() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Insurance Services",
    "/solutions/insurance"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={INSURANCE_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <ChallengesSection />
        <SolutionsSection />
        <ValueSection />
        <FutureVisionSection />
        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
