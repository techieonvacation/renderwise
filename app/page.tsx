import HeroSection from "./components/Home/HeroSection";
import { getHeroControlSettings } from "./components/Home/HeroSection/HeroControl";
import GetInTouch from "./components/ui/GetInTouch";
import Services from "./components/Home/Services";
import MarqueeWrapper from "./components/ui/MarqueeWrapper";
import Capabilities from "./components/Home/Capabilities";

export default async function Home() {
  const heroSettings = await getHeroControlSettings();
  return (
    <div>
      <HeroSection heroSettings={heroSettings} />
      <div className="">
        <MarqueeWrapper
          wrapperClassName="bg-primary py-2 lg:py-3 font-medium text-primary-foreground mb-1 rotate-[0.3deg] -mt-2"
          itemClassName="flex gap-x-2 items-center text-lg sm:text-xl lg:text-2xl font-semibold font-space-grotesk"
          sparkleClassName="size-4 md:size-6 mx-2 fill-primary-foreground"
        />
        <MarqueeWrapper
          direction="right"
          wrapperClassName="bg-secondary py-2 lg:py-3 font-medium text-secondary-foreground -rotate-[0.3deg]"
          itemClassName="flex gap-x-2 items-center text-lg sm:text-xl lg:text-2xl font-semibold font-space-grotesk"
          sparkleClassName="size-4 md:size-6 mx-2 fill-secondary-foreground"
        />
      </div>
      <Services />
      <Capabilities />
      <GetInTouch />
    </div>
  );
}
