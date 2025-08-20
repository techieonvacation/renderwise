import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { SUPPLY_CHAIN_LOGISTICS_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  generateServiceBreadcrumb,
  SUPPLY_CHAIN_LOGISTICS_STRUCTURED_DATA,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/supply-chain-logistics/heroContent";
import GetInTouch from "../../components/ui/GetInTouch";
import IntroSection from "@/app/components/supply-chain-logistics/IntroSection";
import ChallengesSection from "@/app/components/supply-chain-logistics/ChallengesSection";
import ImpactSection from "@/app/components/supply-chain-logistics/ImpactSection";
import TechnologyStack from "@/app/components/supply-chain-logistics/TechnologyStack";
import SuccessStories from "@/app/components/supply-chain-logistics/SuccessStories";
import FutureReadySection from "@/app/components/supply-chain-logistics/FutureReadySection";
import SolutionsSection from "@/app/components/supply-chain-logistics/SolutionsSection";

// Generate metadata for the page
export const metadata: Metadata = SUPPLY_CHAIN_LOGISTICS_METADATA;

export default async function SupplyChainLogistics() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Supply Chain & Logistics Services",
    "/solutions/supply-chain-logistics"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={SUPPLY_CHAIN_LOGISTICS_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        {/* Introduction Section */}
        <IntroSection />

        {/* Challenges Section */}
        <ChallengesSection />

        {/* Solutions Section */}
        <SolutionsSection />

        {/* Impact & Metrics Section */}
        <ImpactSection />

        {/* Technology Stack Section */}
        <TechnologyStack />

        {/* Success Stories Section */}
        <SuccessStories />

        {/* Future Ready Section with CTA */}
        <FutureReadySection />

        <GetInTouch />
        <FAQ />
      </div>
    </>
  );
}
