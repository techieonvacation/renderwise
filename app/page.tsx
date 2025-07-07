  import HeroSection from "./components/Home/HeroSection";
import { getHeroControlSettings } from "./components/Home/HeroSection/HeroControl";

export default async function Home() {
  const heroSettings = await getHeroControlSettings();
  return (
    <div>
        <HeroSection heroSettings={heroSettings} />
    </div>
  );
}
