import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";

// GET /api/blog/debug - Debug endpoint to check database contents
export async function GET(request: NextRequest) {
  try {
    // Get all posts without filters
    const allPosts = await BlogService.getBlogPosts({
      limit: 100,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    // Get categories
    const categories = await BlogService.getCategories();

    // Get tags
    const tags = await BlogService.getPopularTags(50);

    return NextResponse.json({
      success: true,
      data: {
        totalPosts: allPosts.posts.length,
        posts: allPosts.posts.map(post => ({
          _id: post._id?.toString(),
          title: post.title,
          slug: post.slug,
          status: post.status,
          category: post.category,
          createdAt: post.createdAt,
        })),
        categories: categories.map(cat => ({
          _id: cat._id?.toString(),
          name: cat.name,
          slug: cat.slug,
          color: cat.color,
        })),
        tags: tags.map(tag => ({
          _id: tag._id?.toString(),
          name: tag.name,
          slug: tag.slug,
        })),
      },
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
