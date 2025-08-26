import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { getPrimaryHeroData, SlideData } from "@/app/components/Home/PrimaryHero/api";

// Dynamic imports with no SSR to prevent streaming issues
const PrimaryHero = dynamic(() => import("@/app/components/Home/PrimaryHero"), {
  loading: () => null,
});

const SecondaryHero = dynamic(() => import("@/app/components/Home/SecondaryHero"), {
  loading: () => null,
});

// Define props type
interface HeroSectionProps {
  heroSettings: {
    primaryHeroVisible: boolean;
    secondaryHeroVisible: boolean;
    primaryHeroOrder: number;
    secondaryHeroOrder: number;
  };
  primaryHeroData: SlideData[];
}

export default function HeroSection({ heroSettings, primaryHeroData }: HeroSectionProps) {
  const heroComponents: ReactElement[] = [];

  if (heroSettings.primaryHeroVisible) {
    heroComponents[heroSettings.primaryHeroOrder - 1] = <PrimaryHero key="primary" heroData={primaryHeroData} />;
  }

  if (heroSettings.secondaryHeroVisible) {
    heroComponents[heroSettings.secondaryHeroOrder - 1] = <SecondaryHero key="secondary" />;
  }

  const filteredHeroComponents = heroComponents.filter(Boolean);

  if (filteredHeroComponents.length === 0) {
    return (
      <div className="section-bg-hero py-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Hero Sections Hidden</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          All hero sections are currently hidden. Visit the admin panel to
          make them visible again.
        </p>
        <Link href="/admin/hero-control">
          <Button variant="outline">Manage Hero Sections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="section-bg-hero">
      {filteredHeroComponents.map((component, index) => (
        <div key={index}>{component}</div>
      ))}
    </div>
  );
}
