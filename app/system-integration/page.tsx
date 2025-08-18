import { heroContent } from "../components/system-integration/heroContent";
import FAQ from "../components/ui/Faq";
import InternalPageHero from "../components/ui/InternalPageHero";
import { LogoMarquee } from "../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../lib/services/logoMarqueeService";

export default async function SystemIntegrationPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();
  return (
    <div className="overflow-hidden">
      <InternalPageHero {...heroContent} />
      <LogoMarquee config={logoMarqueeConfig} />
      <FAQ />
    </div>
  );
}
