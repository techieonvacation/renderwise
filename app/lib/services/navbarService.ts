import clientPromise from "@/app/lib/mongodb";
import {
  DEFAULT_NAVBAR_CONFIG,
  type NavbarConfig,
} from "@/app/lib/models/navbar";

// Cache for navbar configuration to avoid repeated database calls
let cachedNavbarConfig: NavbarConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

/**
 * Server-side function to fetch navbar configuration
 * Uses caching to optimize performance and reduce database calls
 */
export async function getNavbarConfig(): Promise<NavbarConfig> {
  const now = Date.now();

  // Return cached data if it's still valid
  if (cachedNavbarConfig && now - cacheTimestamp < CACHE_DURATION) {
    return cachedNavbarConfig;
  }

  try {
    const client = await clientPromise;
    const db = client.db("eleservsoftech");
    const collection = db.collection("navbar");

    const navbar = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    const config = navbar?.config || DEFAULT_NAVBAR_CONFIG;

    // Update cache
    cachedNavbarConfig = config;
    cacheTimestamp = now;

    return config;
  } catch (error) {
    console.error("Error fetching navbar configuration:", error);

    // Return default config on error, but don't cache it
    return DEFAULT_NAVBAR_CONFIG;
  }
}

/**
 * Clear the navbar configuration cache
 * Useful for when navbar is updated through admin panel
 */
export function clearNavbarCache(): void {
  cachedNavbarConfig = null;
  cacheTimestamp = 0;
}
