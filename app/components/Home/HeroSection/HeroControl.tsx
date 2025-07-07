import { cache } from "react";
import clientPromise from "@/app/lib/mongodb";

// Define the type for hero control settings
interface HeroControlSettings {
  id?: string;
  primaryHeroVisible: boolean;
  secondaryHeroVisible: boolean;
  primaryHeroOrder: number;
  secondaryHeroOrder: number;
}

export const getHeroControlSettings = cache(
  async (): Promise<HeroControlSettings> => {
    try {
      const client = await clientPromise;
      const db = client.db("hackintowndb");
      const heroControl = await db
        .collection("heroControl")
        .findOne({ id: "main" });

      return (
        (heroControl as unknown as HeroControlSettings) || {
          primaryHeroVisible: true,
          secondaryHeroVisible: true,
          primaryHeroOrder: 1,
          secondaryHeroOrder: 2,
        }
      );
    } catch (error) {
      console.error("Error fetching hero control settings:", error);
      return {
        primaryHeroVisible: true,
        secondaryHeroVisible: true,
        primaryHeroOrder: 1,
        secondaryHeroOrder: 2,
      };
    }
  }
);

// Add cache tag for on-demand revalidation
export const getHeroControlSettingsWithTag = cache(
  async (): Promise<HeroControlSettings> => {
    try {
      const client = await clientPromise;
      const db = client.db("hackintowndb");
      const heroControl = await db
        .collection("heroControl")
        .findOne({ id: "main" });

      const result = (heroControl as unknown as HeroControlSettings) || {
        primaryHeroVisible: true,
        secondaryHeroVisible: true,
        primaryHeroOrder: 1,
        secondaryHeroOrder: 2,
      };

      // Add cache tag for on-demand revalidation
      const response = new Response(JSON.stringify(result));
      response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");
      response.headers.set("Next-Cache-Tags", "hero-control");

      return result;
    } catch (error) {
      console.error("Error fetching hero control settings:", error);
      return {
        primaryHeroVisible: true,
        secondaryHeroVisible: true,
        primaryHeroOrder: 1,
        secondaryHeroOrder: 2,
      };
    }
  }
);
