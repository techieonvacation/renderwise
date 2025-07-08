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

// Default settings
const DEFAULT_SETTINGS: HeroControlSettings = {
  primaryHeroVisible: true,
  secondaryHeroVisible: true,
  primaryHeroOrder: 1,
  secondaryHeroOrder: 2,
};

// Cache MongoDB connection and collection reference
let cachedDb: any = null;
let cachedCollection: any = null;

async function getCollection() {
  if (cachedDb && cachedCollection) {
    return { db: cachedDb, collection: cachedCollection };
  }
  
  const client = await clientPromise;
  cachedDb = client.db("eleservsoftech");
  cachedCollection = cachedDb.collection("heroControl");
  
  return { db: cachedDb, collection: cachedCollection };
}

// Simple cached getter without streaming
export const getHeroControlSettings = cache(
  async (): Promise<HeroControlSettings> => {
    try {
      const { collection } = await getCollection();
      const heroControl = await collection.findOne(
        { id: "main" },
        { projection: { _id: 0 } }
      );
      return heroControl || DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Error fetching hero control settings:", error);
      return DEFAULT_SETTINGS;
    }
  }
);

// Simple getter with no streaming for admin panel
export const getHeroControlSettingsWithTag = cache(
  async (): Promise<HeroControlSettings> => {
    try {
      const { collection } = await getCollection();
      const heroControl = await collection.findOne(
        { id: "main" },
        { projection: { _id: 0 } }
      );
      return heroControl || DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Error fetching hero control settings:", error);
      return DEFAULT_SETTINGS;
    }
  }
);
