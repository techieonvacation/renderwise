import { Metadata } from 'next';
import { heroContent } from "../../components/qa-automation/heroContent";
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { QA_AUTOMATION_METADATA } from "../../lib/metadata/servicesMetadata";
import { 
  QA_AUTOMATION_STRUCTURED_DATA, 
  generateServiceBreadcrumb 
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";

// Generate metadata for the page
export const metadata: Metadata = QA_AUTOMATION_METADATA;

export default async function QAAutomationPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();
  
  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb('QA Automation', '/services/qa-automation');
  
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={QA_AUTOMATION_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />
      
      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...heroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        <FAQ />
      </div>
    </>
  );
}
