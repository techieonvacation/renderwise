import clientPromise from "@/app/lib/mongodb";
import {
  LogoMarqueeConfig,
  DEFAULT_LOGO_MARQUEE_CONFIG,
} from "@/app/lib/models/logoMarquee";

// Cache MongoDB connection and collection reference
let cachedDb: any = null;
let cachedCollection: any = null;

async function getCollection() {
  if (cachedDb && cachedCollection) {
    return { db: cachedDb, collection: cachedCollection };
  }

  const client = await clientPromise;
  cachedDb = client.db("eleservsoftech");
  cachedCollection = cachedDb.collection("logoMarquee");

  return { db: cachedDb, collection: cachedCollection };
}

export async function getLogoMarqueeConfig(): Promise<LogoMarqueeConfig> {
  try {
    const { collection } = await getCollection();

    const logoMarquee = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    return logoMarquee?.config || DEFAULT_LOGO_MARQUEE_CONFIG;
  } catch (error) {
    console.error("Error fetching logo marquee configuration:", error);
    return DEFAULT_LOGO_MARQUEE_CONFIG;
  }
}

// Function to get active logos only
export async function getActiveLogos() {
  const config = await getLogoMarqueeConfig();
  return config.logos?.filter((logo) => logo.isActive !== false) || [];
}
