import React, { JSX, Suspense } from "react";
import PrimaryHero from "@/app/components/Home/PrimaryHero";
import SecondaryHero from "@/app/components/Home/SecondaryHero";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

// Define props type
interface HeroSectionProps {
  heroSettings: {
    primaryHeroVisible: boolean;
    secondaryHeroVisible: boolean;
    primaryHeroOrder: number;
    secondaryHeroOrder: number;
  };
}

export default function HeroSection({ heroSettings }: HeroSectionProps) {
  const heroComponents: (JSX.Element | undefined)[] = [];

  if (heroSettings.primaryHeroVisible) {
    heroComponents[heroSettings.primaryHeroOrder - 1] = (
      <Suspense
        fallback={<div className="h-screen animate-pulse bg-muted/20"></div>}
      >
        <PrimaryHero />
      </Suspense>
    );
  }

  if (heroSettings.secondaryHeroVisible) {
    heroComponents[heroSettings.secondaryHeroOrder - 1] = (
      <Suspense
        fallback={<div className="h-screen animate-pulse bg-muted/20"></div>}
      >
        <SecondaryHero />
      </Suspense>
    );
  }

  const filteredHeroComponents = heroComponents.filter(
    (component): component is JSX.Element => Boolean(component)
  );

  return (
    <>
      {filteredHeroComponents.length > 0 ? (
        filteredHeroComponents.map((component, index) => (
          <div key={index}>{component}</div>
        ))
      ) : (
        <div className="py-20 flex flex-col items-center justify-center bg-muted/10">
          <h2 className="text-2xl font-bold mb-4">Hero Sections Hidden</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            All hero sections are currently hidden. Visit the admin panel to
            make them visible again.
          </p>
          <Link href="/admin/hero-control">
            <Button variant="outline">Manage Hero Sections</Button>
          </Link>
        </div>
      )}
    </>
  );
}
