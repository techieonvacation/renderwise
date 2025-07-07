import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { z } from "zod";

// Define schema for validation
const heroControlSchema = z.object({
  primaryHeroVisible: z.boolean(),
  secondaryHeroVisible: z.boolean(),
  primaryHeroOrder: z.number().int().positive(),
  secondaryHeroOrder: z.number().int().positive(),
});

/**
 * Default hero control values - used as fallback when no database content exists
 * This ensures the site always has control settings even if database is unavailable
 */
const DEFAULT_HERO_CONTROL = {
  id: "main",
  primaryHeroVisible: true,
  secondaryHeroVisible: true,
  primaryHeroOrder: 1,
  secondaryHeroOrder: 2,
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");

    const heroControl = await db
      .collection("heroControl")
      .findOne({ id: "main" });

    const responseData = heroControl || DEFAULT_HERO_CONTROL;

    // Create response with proper caching headers
    const response = NextResponse.json(responseData);

    // Cache for 1 minute in production, 30 seconds in development
    // Shorter cache time for faster CMS updates
    const cacheTime = process.env.NODE_ENV === "production" ? 60 : 30;
    response.headers.set(
      "Cache-Control",
      `public, max-age=${cacheTime}, s-maxage=${cacheTime}`
    );
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    console.error("Error fetching hero control settings:", error);

    // Return default settings with shorter cache time on error
    const response = NextResponse.json(DEFAULT_HERO_CONTROL);
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");

    return response;
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    // Validate input data
    const validationResult = heroControlSchema.safeParse({
      primaryHeroVisible: Boolean(data.primaryHeroVisible),
      secondaryHeroVisible: Boolean(data.secondaryHeroVisible),
      primaryHeroOrder: Number(data.primaryHeroOrder) || 1,
      secondaryHeroOrder: Number(data.secondaryHeroOrder) || 2,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const updateData = {
      ...validationResult.data,
      updatedAt: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db("hackintowndb");

    const result = await db.collection("heroControl").updateOne(
      { id: "main" },
      {
        $set: updateData,
        $setOnInsert: { id: "main", createdAt: new Date().toISOString() },
      },
      { upsert: true }
    );

    // Create response with no-cache headers for mutations
    const response = NextResponse.json({
      success: true,
      message: "Hero control settings updated successfully",
      data: { id: "main", ...updateData },
      matched: result.matchedCount,
      modified: result.modifiedCount,
      upserted: result.upsertedCount,
    });

    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );

    return response;
  } catch (error) {
    console.error("Error updating hero control settings:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update hero control settings" },
      { status: 500 }
    );
  }
}
