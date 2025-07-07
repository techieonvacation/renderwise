import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * Default secondary hero data - used as fallback when no database content exists
 * This ensures the site always has content even if database is unavailable
 */
const DEFAULT_SECONDARY_HERO = {
  _id: "default",
  tagline: "Next-Generation Platform",
  title: "Next.js SaaS Boilerplate with Modern UI",
  description:
    "Build scalable applications with our feature-rich template. Designed for developers who value clean code, performance, and exceptional user experience.",
  imageUrl:
    "https://base.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fhero%2Fhero.png&w=750&q=75",
  ctaLabel: "Get Started Now",
  ctaLink: "#",
  phoneNumber: "(+91) 8851967714",
  phoneText: "For any question or concern",
  stats: [
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "10k+", label: "Happy Users" },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");

    // Get the most recent secondary hero data
    const heroData = await db
      .collection("secondaryHero")
      .findOne({}, { sort: { updatedAt: -1 } });

    const responseData = heroData || DEFAULT_SECONDARY_HERO;

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
    console.error("Error fetching secondary hero data:", error);

    // Return default data with shorter cache time on error
    const response = NextResponse.json(DEFAULT_SECONDARY_HERO);
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");

    return response;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const client = await clientPromise;
    const db = client.db("hackintowndb");

    // Check if _id is "default" and handle it specially
    if (data._id === "default") {
      // Create a new record without the _id field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...newData } = data;

      const heroData = {
        ...newData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await db.collection("secondaryHero").insertOne(heroData);
      const created = await db
        .collection("secondaryHero")
        .findOne({ _id: result.insertedId });

      // Create response with no-cache headers for mutations
      const response = NextResponse.json(created);
      response.headers.set(
        "Cache-Control",
        "no-cache, no-store, must-revalidate"
      );

      return response;
    }

    // Add timestamps
    const heroData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // If there's an _id, update the existing record
    if (data._id && data._id !== "default") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...updateData } = heroData;
        const objectId = new ObjectId(_id);

        const result = await db
          .collection("secondaryHero")
          .updateOne(
            { _id: objectId },
            { $set: { ...updateData, updatedAt: new Date().toISOString() } }
          );

        if (result.matchedCount === 0) {
          // If no document was matched, create a new one
          const newResult = await db.collection("secondaryHero").insertOne({
            ...updateData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          const created = await db
            .collection("secondaryHero")
            .findOne({ _id: newResult.insertedId });

          // Create response with no-cache headers for mutations
          const response = NextResponse.json(created);
          response.headers.set(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
          );

          return response;
        }

        const updated = await db
          .collection("secondaryHero")
          .findOne({ _id: objectId });

        // Create response with no-cache headers for mutations
        const response = NextResponse.json(updated);
        response.headers.set(
          "Cache-Control",
          "no-cache, no-store, must-revalidate"
        );

        return response;
      } catch (idError) {
        // If ObjectId conversion fails, create a new document
        console.error(
          "Invalid ObjectId, creating new document instead:",
          idError
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...newData } = heroData;

        const newResult = await db.collection("secondaryHero").insertOne({
          ...newData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const created = await db
          .collection("secondaryHero")
          .findOne({ _id: newResult.insertedId });

        // Create response with no-cache headers for mutations
        const response = NextResponse.json(created);
        response.headers.set(
          "Cache-Control",
          "no-cache, no-store, must-revalidate"
        );

        return response;
      }
    }

    // Otherwise, create a new record
    const result = await db.collection("secondaryHero").insertOne({
      ...heroData,
      createdAt: heroData.createdAt || new Date().toISOString(),
    });

    const created = await db
      .collection("secondaryHero")
      .findOne({ _id: result.insertedId });

    // Create response with no-cache headers for mutations
    const response = NextResponse.json(created);
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );

    return response;
  } catch (error) {
    console.error("Error saving secondary hero data:", error);
    return NextResponse.json(
      {
        error: "Failed to save secondary hero data",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
