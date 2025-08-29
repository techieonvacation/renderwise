import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { TELECOM_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  generateServiceBreadcrumb,
  TELECOM_STRUCTURED_DATA,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/telecom/heroContent";
import GetInTouch from "../../components/ui/GetInTouch";
import IntroSection from "../../components/telecom/IntroSection";
import ChallengesSection from "../../components/telecom/ChallengesSection";
import SolutionsSection from "../../components/telecom/SolutionsSection";
import ImpactSection from "../../components/telecom/ImpactSection";
import FutureSection from "../../components/telecom/FutureSection";

// Generate metadata for the page
export const metadata: Metadata = TELECOM_METADATA;

export default async function Telecom() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Telecom Services",
    "/solutions/telecom"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={TELECOM_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        
        {/* Main Content Sections */}
        <IntroSection />
        <ChallengesSection />
        <SolutionsSection />
        <ImpactSection />
        <FutureSection />

        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
