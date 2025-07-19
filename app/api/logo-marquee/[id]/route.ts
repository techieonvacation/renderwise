import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import {
  DEFAULT_LOGO_MARQUEE_CONFIG,
} from "@/app/lib/models/logoMarquee";
import { ObjectId } from "mongodb";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    const { collection } = await getCollection();

    const logoMarquee = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 0 } }
    );

    const data = logoMarquee?.config || DEFAULT_LOGO_MARQUEE_CONFIG;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // ISR caching: Cache for 5 minutes, stale-while-revalidate for 1 hour
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    console.error("Error fetching logo marquee configuration:", error);
    
    return NextResponse.json(DEFAULT_LOGO_MARQUEE_CONFIG, {
      status: 200,
      headers: {
        // Fallback caching
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600"
      }
    });
  }
} 