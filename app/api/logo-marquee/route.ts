import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from "next/cache";
import {
  LogoMarqueeConfigSchema,
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

export async function GET() {
  try {
    const { collection } = await getCollection();

    const logoMarquee = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    const data = logoMarquee?.config || DEFAULT_LOGO_MARQUEE_CONFIG;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // ISR caching: Cache for 5 minutes, stale-while-revalidate for 1 hour
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=60",
        "CDN-Cache-Control": "public, s-maxage=2, stale-while-revalidate=60",
        "Vercel-CDN-Cache-Control":
          "public, s-maxage=2, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching logo marquee configuration:", error);

    return NextResponse.json(DEFAULT_LOGO_MARQUEE_CONFIG, {
      status: 200,
      headers: {
        // Fallback caching
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=60",
        "CDN-Cache-Control": "public, s-maxage=2, stale-while-revalidate=60",
        "Vercel-CDN-Cache-Control":
          "public, s-maxage=2, stale-while-revalidate=60",
      },
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate input data
    const validationResult = LogoMarqueeConfigSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: validationResult.error.format(),
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const { collection } = await getCollection();

    // First, try to get the existing document to check if it exists
    const existingDoc = await collection.findOne({ id: "main" });

    const updateData = {
      config: validationResult.data,
      updatedAt: new Date().toISOString(),
    };

    let result;

    if (existingDoc) {
      // Document exists, update it and increment version
      result = await collection.updateOne(
        { id: "main" },
        {
          $set: updateData,
          $inc: { version: 1 },
        }
      );
    } else {
      // Document doesn't exist, create it with initial version
      result = await collection.updateOne(
        { id: "main" },
        {
          $set: {
            ...updateData,
            id: "main",
            createdAt: new Date().toISOString(),
            version: 1,
          },
        },
        { upsert: true }
      );
    }

    // Revalidate paths for ISR
    revalidatePath("/api/logo-marquee");
    revalidatePath("/api/logo-marquee/main");
    revalidatePath("/");
    revalidatePath("/admin/logo-marquee");

    return NextResponse.json(
      {
        success: true,
        message: "Logo marquee configuration updated successfully",
        data: { id: "main", ...updateData },
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error updating logo marquee configuration:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to update logo marquee configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}

export async function DELETE() {
  try {
    const { collection } = await getCollection();

    const result = await collection.deleteOne({ id: "main" });

    // Revalidate paths for ISR
    revalidatePath("/api/logo-marquee");
    revalidatePath("/api/logo-marquee/main");
    revalidatePath("/");
    revalidatePath("/admin/logo-marquee");

    return NextResponse.json(
      {
        success: true,
        message: "Logo marquee configuration deleted successfully",
        deletedCount: result.deletedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting logo marquee configuration:", error);

    return NextResponse.json(
      { error: "Failed to delete logo marquee configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
