import { Metadata } from "next";
import { heroContent } from "../../components/it-staffing/heroContent";
import WhatWeOffer from "../../components/it-staffing/WhatWeOffer";
import WhyChooseUs from "../../components/it-staffing/WhyChooseUs";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { IT_STAFFING_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  IT_STAFFING_STRUCTURED_DATA,
  generateServiceBreadcrumb,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";

// Generate metadata for the page
export const metadata: Metadata = IT_STAFFING_METADATA;

export default async function ItStaffingPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "IT Staffing",
    "/services/it-staffing"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={IT_STAFFING_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <WhatWeOffer />
        <WhyChooseUs />
        <FAQ />
      </div>
    </>
  );
}
