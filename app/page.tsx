import HeroSection from "./components/Home/HeroSection";
import { getHeroControlSettings } from "./components/Home/HeroSection/HeroControl";
import GetInTouch from "./components/ui/GetInTouch";
import Services from "./components/Home/Services";
import Capabilities from "./components/Home/Capabilities";
import TechStackTabs from "./components/ui/TechStacks";
import Counter from "./components/Home/Counter";
import { LogoMarquee } from "./components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "./lib/services/logoMarqueeService";
import Testimonials from "./components/ui/Testimonails";
import FAQ from "./components/ui/Faq";

export default async function Home() {
  const heroSettings = await getHeroControlSettings();
  const logoMarqueeConfig = await getLogoMarqueeConfig();
  return (
    <div>
      <HeroSection heroSettings={heroSettings} />
      <LogoMarquee config={logoMarqueeConfig} />
      <Services />
      <Capabilities />
      <Counter />
      <TechStackTabs />
      <Testimonials />
      <FAQ />
      <GetInTouch />
    </div>
  );
}
