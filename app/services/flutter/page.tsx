import { Metadata } from "next";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { FLUTTER_DEVELOPMENT_METADATA } from "../../lib/metadata/servicesMetadata";
import {
  FLUTTER_DEVELOPMENT_STRUCTURED_DATA,
  generateServiceBreadcrumb,
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";
import { heroContent } from "@/app/components/flutter/heroContent";
import FlutterComponents from "@/app/components/flutter";

// Generate metadata for the page
export const metadata: Metadata = FLUTTER_DEVELOPMENT_METADATA;

export default async function FlutterDevelopmentPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();

  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb(
    "Flutter Development",
    "/services/flutter"
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={FLUTTER_DEVELOPMENT_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />

      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <FlutterComponents />
        <FAQ />
      </div>
    </>
  );
}
