import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { revalidatePath } from "next/cache";
import {
  ServicesConfigSchema,
  DEFAULT_SERVICES_CONFIG,
} from "@/app/lib/models/services";

// Cache MongoDB connection and collection reference
let cachedDb: any = null;
let cachedCollection: any = null;

async function getCollection() {
  if (cachedDb && cachedCollection) {
    return { db: cachedDb, collection: cachedCollection };
  }
  
  const client = await clientPromise;
  cachedDb = client.db("eleservsoftech");
  cachedCollection = cachedDb.collection("services");
  
  return { db: cachedDb, collection: cachedCollection };
}

/**
 * GET /api/services
 * Retrieves the current services configuration
 * Returns cached data for instant loading (ISR with 2-second validation)
 */
export async function GET() {
  try {
    const { collection } = await getCollection();

    const services = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    const data = services?.config || DEFAULT_SERVICES_CONFIG;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=10",
        "CDN-Cache-Control": "public, s-maxage=2",
        "Vercel-CDN-Cache-Control": "public, s-maxage=2",
      }
    });
  } catch (error) {
    console.error("Error fetching services configuration:", error);
    
    return NextResponse.json(DEFAULT_SERVICES_CONFIG, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=10",
        "CDN-Cache-Control": "public, s-maxage=2",
        "Vercel-CDN-Cache-Control": "public, s-maxage=2",
      }
    });
  }
}

/**
 * PUT /api/services
 * Updates the services configuration
 * Validates input data and updates MongoDB
 */
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate input data
    const validationResult = ServicesConfigSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: validationResult.error.format(),
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          }
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

    // Revalidate paths for instant updates
    revalidatePath("/api/services");
    revalidatePath("/");
    revalidatePath("/admin/services");

    return NextResponse.json(
      {
        success: true,
        message: "Services configuration updated successfully",
        data: { id: "main", ...updateData },
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error) {
    console.error("Error updating services configuration:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        {
          status: 400,
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate"
          }
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to update services configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate"
        }
      }
    );
  }
}

/**
 * DELETE /api/services
 * Deletes the services configuration and resets to default
 */
export async function DELETE() {
  try {
    const { collection } = await getCollection();

    const result = await collection.deleteOne({ id: "main" });

    // Revalidate paths
    revalidatePath("/api/services");
    revalidatePath("/");
    revalidatePath("/admin/services");

    return NextResponse.json(
      {
        success: true,
        message: "Services configuration deleted successfully",
        deletedCount: result.deletedCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error) {
    console.error("Error deleting services configuration:", error);

    return NextResponse.json(
      { error: "Failed to delete services configuration" },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate"
        }
      }
    );
  }
} 