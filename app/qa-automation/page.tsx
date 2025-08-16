import Hero from "../components/it-staffing/Hero";
import FAQ from "../components/ui/Faq";
import { LogoMarquee } from "../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../lib/services/logoMarqueeService";

export default async function QAAutomationPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();
  return (
    <div>
      <Hero />
      <LogoMarquee config={logoMarqueeConfig} />
      <FAQ />
    </div>
  );
}
