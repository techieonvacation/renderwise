import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { z } from "zod";
export const dynamic = "force-dynamic";

// Define validation schema for team members
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  bio: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      email: z.string().optional(),
      instagram: z.string().optional(),
    })
    .optional(),
  featured: z.boolean().optional(),
});

// GET all team members
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eleservsoftech");

    const teamMembers = await db
      .collection("dedicated-team")
      .find({})
      .sort({ featured: -1, name: 1 })
      .toArray();

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST - Create a new team member
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate input data
    const validationResult = teamMemberSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Add timestamps
    const teamMemberData = {
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db("eleservsoftech");

    const result = await db
      .collection("dedicated-team")
      .insertOne(teamMemberData);

    return NextResponse.json({
      _id: result.insertedId,
      ...teamMemberData,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
