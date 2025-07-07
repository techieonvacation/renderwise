import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Define validation schema for team members
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  bio: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    email: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),
  featured: z.boolean().optional(),
});

// GET a single team member by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid team member ID" },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const teamMember = await db
      .collection("dedicated-team")
      .findOne({ _id: new ObjectId(id) });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

// PUT - Update a team member
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid team member ID" },
        { status: 400 }
      );
    }
    
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
    
    // Add updated timestamp
    const teamMemberData = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const result = await db
      .collection("dedicated-team")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: teamMemberData }
      );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      _id: id,
      ...teamMemberData,
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a team member
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params)  ;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid team member ID" },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const result = await db
      .collection("dedicated-team")
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Team member deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}