import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  image: z.string().url("Image must be a valid URL"),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const teamMembers = await db
      .collection("team-members")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Create response with proper caching headers
    const response = NextResponse.json(teamMembers);
    
    // Cache for 10 minutes in production, 1 minute in development
    // Team member data changes less frequently than hero content
    const cacheTime = process.env.NODE_ENV === 'production' ? 600 : 60;
    response.headers.set('Cache-Control', `public, max-age=${cacheTime}, s-maxage=${cacheTime}`);
    response.headers.set('Content-Type', 'application/json');
    
    return response;
  } catch (error) {
    console.error("Error fetching team members:", error);
    
    // Return empty array with shorter cache time on error
    const response = NextResponse.json([]);
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    
    return response;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    const validatedData = teamMemberSchema.parse(data);
    
    const client = await clientPromise;
    const db = client.db("hackintowndb");
    
    const now = new Date();
    
    const result = await db.collection("team-members").insertOne({
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    });
    
    const responseData = {
      _id: result.insertedId,
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    };
    
    // Create response with no-cache headers for mutations
    const response = NextResponse.json(responseData);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;
  } catch (error) {
    console.error("Error creating team member:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
} 