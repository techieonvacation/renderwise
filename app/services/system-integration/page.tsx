import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { SYSTEM_INTEGRATION_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  SYSTEM_INTEGRATION_STRUCTURED_DATA,
  generateServiceBreadcrumb,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import Testimonials from "@/app/components/ui/Testimonails";
import { heroContent } from "@/app/components/system-integration/heroContent";
import Services from "@/app/components/system-integration/Services";
import TransformRepetition from "@/app/components/system-integration/TransformRepetition";
import IntelligentSolutions from "@/app/components/system-integration/IntelligentSolutions";

// Generate metadata for the page
export const metadata: Metadata = SYSTEM_INTEGRATION_METADATA;

export default async function SystemIntegrationPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "System Integration",
    "/services/system-integration"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={SYSTEM_INTEGRATION_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <Services />
        <TransformRepetition />
        <IntelligentSolutions />
        <Testimonials />
        <FAQ />
      </div>
    </>
  );
}
