import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { ECOMMERCE_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  generateServiceBreadcrumb,
  ECOMMERCE_STRUCTURED_DATA,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/ecommerce/heroContent";
import GetInTouch from "../../components/ui/GetInTouch";
import {
  IntroSection,
  DifferenceSection,
  TailoredSolutions,
  FutureSection,
  ImpactSection,
  TestimonialsSection,
} from "../../components/ecommerce";

// Generate metadata for the page
export const metadata: Metadata = ECOMMERCE_METADATA;

export default async function Ecommerce() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Ecommerce Services",
    "/solutions/ecommerce"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={ECOMMERCE_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <IntroSection />
        <DifferenceSection />
        <TailoredSolutions />
        <ImpactSection />
        <FutureSection />
        <TestimonialsSection />
        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
