import { cache } from "react";
import clientPromise from "@/app/lib/mongodb";

// Define the type for primary hero slide data
export interface SlideData {
  _id?: string;
  subTitle: string;
  title: string;
  highlightedWord: string;
  desc: string;
  image: string;
  profileImage: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// Default primary hero data - used as fallback
const DEFAULT_PRIMARY_HERO: SlideData[] = [
  {
    _id: "default_1",
    subTitle: "Welcome to Eleservsoftech",
    title: "Transform Your Business with",
    highlightedWord: "Innovation",
    desc: "We provide cutting-edge solutions that drive growth and success. Our team of experts is dedicated to helping you achieve your business goals through innovative technology and strategic thinking.",
    image: "/images/hero/hero-thum.png",
    profileImage: "/images/hero/hero-pro.png",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "default_2",
    subTitle: "Digital Excellence",
    title: "Build Amazing Experiences with",
    highlightedWord: "Technology",
    desc: "From concept to execution, we deliver exceptional digital experiences that engage your audience and drive meaningful results. Let us help you stay ahead in the digital landscape.",
    image: "/images/hero/hero-thum.png",
    profileImage: "/images/hero/hero-pro.png",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Cache MongoDB connection and collection reference
let cachedDb: any = null;
let cachedCollection: any = null;

async function getCollection() {
  if (cachedDb && cachedCollection) {
    return { db: cachedDb, collection: cachedCollection };
  }
  
  const client = await clientPromise;
  cachedDb = client.db("eleservsoftech");
  cachedCollection = cachedDb.collection("primaryHero");
  
  return { db: cachedDb, collection: cachedCollection };
}

// Server-side data fetching with cache - direct database access
export const getPrimaryHeroData = cache(async (): Promise<SlideData[]> => {
  try {
    const { collection } = await getCollection();
    
    // Get all primary hero slides, sorted by order
    const heroData = await collection
      .find({})
      .sort({ order: 1 })
      .toArray();

    // Convert MongoDB _id to string and return data or default
    const processedData = heroData.length > 0 
      ? heroData.map((slide: any) => ({
          ...slide,
          _id: slide._id.toString(),
        }))
      : DEFAULT_PRIMARY_HERO;

    return processedData;
  } catch (error) {
    console.error("Error fetching primary hero data:", error);
    // Return default data on error
    return DEFAULT_PRIMARY_HERO;
  }
});
