import clientPromise from "@/app/lib/mongodb";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Define schema for validation
const heroControlSchema = z.object({
  primaryHeroVisible: z.boolean(),
  secondaryHeroVisible: z.boolean(),
  primaryHeroOrder: z.number().int().positive(),
  secondaryHeroOrder: z.number().int().positive(),
});

/**
 * Default hero control values
 */
const DEFAULT_HERO_CONTROL = {
  id: "main",
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

export async function GET() {
  try {
    const { collection } = await getCollection();

    const heroControl = await collection.findOne(
      { id: "main" },
      { projection: { _id: 0 } }
    );

    const data = heroControl || DEFAULT_HERO_CONTROL;

    // Return JSON response without streaming
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (error) {
    console.error("Error fetching hero control settings:", error);
    
    return new Response(JSON.stringify(DEFAULT_HERO_CONTROL), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
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
      return new Response(
        JSON.stringify({
          error: "Invalid input data",
          details: validationResult.error.format(),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          }
        }
      );
    }

    const updateData = {
      ...validationResult.data,
      updatedAt: new Date().toISOString(),
    };

    const { collection } = await getCollection();

    const result = await collection.updateOne(
      { id: "main" },
      {
        $set: updateData,
        $setOnInsert: { id: "main", createdAt: new Date().toISOString() },
      },
      { upsert: true }
    );

    // Revalidate paths
    revalidatePath("/api/hero-control");
    revalidatePath("/");
    revalidatePath("/admin/hero-control");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Hero control settings updated successfully",
        data: { id: "main", ...updateData },
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error) {
    console.error("Error updating hero control settings:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to update hero control settings" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate"
        }
      }
    );
  }
}
