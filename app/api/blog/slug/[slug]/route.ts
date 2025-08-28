import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";

// GET /api/blog/slug/[slug] - Get a blog post by slug and increment views
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await Promise.resolve(params);

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post slug is required",
        },
        { status: 400 }
      );
    }

    const blogPost = await BlogService.getBlogPost(slug);

    if (!blogPost) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post not found",
        },
        { status: 404 }
      );
    }

    // Increment views for published posts
    if (blogPost.status === "published") {
      await BlogService.incrementViews(slug);
      blogPost.views += 1;
    }

    // Get related posts
    const relatedPosts = await BlogService.getRelatedPosts(
      blogPost._id!.toString()
    );

    return NextResponse.json({
      success: true,
      data: {
        post: blogPost,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch blog post",
      },
      { status: 500 }
    );
  }
}

// POST /api/blog/slug/[slug] - Toggle like for a blog post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await Promise.resolve(params);
    const body = await request.json();
    const { action } = body; // 'like' or 'unlike'

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post slug is required",
        },
        { status: 400 }
      );
    }

    if (!action || !["like", "unlike"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid action. Use 'like' or 'unlike'",
        },
        { status: 400 }
      );
    }

    const newLikeCount = await BlogService.toggleLike(slug, action === "like");

    return NextResponse.json({
      success: true,
      data: {
        likes: newLikeCount,
        action,
      },
      message: `Blog post ${action}d successfully`,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to toggle like",
      },
      { status: 500 }
    );
  }
}
