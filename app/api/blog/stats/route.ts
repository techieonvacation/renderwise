import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";

// GET /api/blog/stats - Get blog statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await BlogService.getBlogStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch blog statistics",
      },
      { status: 500 }
    );
  }
}
