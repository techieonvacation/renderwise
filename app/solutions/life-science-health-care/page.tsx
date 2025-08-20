import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { LIFE_SCIENCE_HEALTH_CARE_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  generateServiceBreadcrumb,
  LIFE_SCIENCE_HEALTH_CARE_STRUCTURED_DATA,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/life-science-health-care/heroContent";
import GetInTouch from "../../components/ui/GetInTouch";

// Generate metadata for the page
export const metadata: Metadata = LIFE_SCIENCE_HEALTH_CARE_METADATA;

export default async function LifeScienceHealthCare() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Life Science Health Care Services",
    "/solutions/life-science-health-care"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={LIFE_SCIENCE_HEALTH_CARE_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
