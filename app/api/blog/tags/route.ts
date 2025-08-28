import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";

// GET /api/blog/tags - Get all tags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const popular = searchParams.get('popular');
    const limit = searchParams.get('limit');

    let tags;
    
    if (popular === 'true') {
      const limitNum = limit ? parseInt(limit) : 10;
      tags = await BlogService.getPopularTags(limitNum);
    } else {
      tags = await BlogService.getTags();
    }

    return NextResponse.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch tags",
      },
      { status: 500 }
    );
  }
}
