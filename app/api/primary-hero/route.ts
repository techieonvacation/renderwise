import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * Default primary hero data - used as fallback when no database content exists
 * This ensures the site always has content even if database is unavailable
 */
const DEFAULT_PRIMARY_HERO = [
  {
    _id: "default_1",
    subTitle: "Welcome to RenderWise",
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
    image: "/images/hero/hero-thum2.png",
    profileImage: "/images/hero/hero-pro.png",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");

    // Get all primary hero slides, sorted by order
    const heroData = await db
      .collection("primaryHero")
      .find({})
      .sort({ order: 1 })
      .toArray();

    const responseData = heroData.length > 0 ? heroData : DEFAULT_PRIMARY_HERO;

    // Create response with proper caching headers
    const response = NextResponse.json(responseData);

    // Cache for 1 minute in production, 30 seconds in development
    const cacheTime = process.env.NODE_ENV === "production" ? 60 : 30;
    response.headers.set(
      "Cache-Control",
      `public, max-age=${cacheTime}, s-maxage=${cacheTime}`
    );
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    console.error("Error fetching primary hero data:", error);

    // Return default data with shorter cache time on error
    const response = NextResponse.json(DEFAULT_PRIMARY_HERO);
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");

    return response;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const client = await clientPromise;
    const db = client.db("hackintowndb");

    // Handle default IDs
    if (data._id?.startsWith("default_")) {
      // Create a new record without the _id field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...newData } = data;

      const heroData = {
        ...newData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await db.collection("primaryHero").insertOne(heroData);
      const created = await db
        .collection("primaryHero")
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
    if (data._id && !data._id.startsWith("default_")) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...updateData } = heroData;
        const objectId = new ObjectId(_id);

        const result = await db
          .collection("primaryHero")
          .updateOne(
            { _id: objectId },
            { $set: { ...updateData, updatedAt: new Date().toISOString() } }
          );

        if (result.matchedCount === 0) {
          // If no document was matched, create a new one
          const newResult = await db.collection("primaryHero").insertOne({
            ...updateData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          const created = await db
            .collection("primaryHero")
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
          .collection("primaryHero")
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

        const newResult = await db.collection("primaryHero").insertOne({
          ...newData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const created = await db
          .collection("primaryHero")
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
    const result = await db.collection("primaryHero").insertOne({
      ...heroData,
      createdAt: heroData.createdAt || new Date().toISOString(),
    });

    const created = await db
      .collection("primaryHero")
      .findOne({ _id: result.insertedId });

    // Create response with no-cache headers for mutations
    const response = NextResponse.json(created);
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );

    return response;
  } catch (error) {
    console.error("Error saving primary hero data:", error);
    return NextResponse.json(
      {
        error: "Failed to save primary hero data",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a slide
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("hackintowndb");

    const objectId = new ObjectId(id);
    const result = await db
      .collection("primaryHero")
      .deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting primary hero slide:", error);
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 }
    );
  }
}
