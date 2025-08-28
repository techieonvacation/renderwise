import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";
import { UpdateBlogPostData, BlogStatus } from "@/app/lib/models/blog";
import { z } from "zod";

// Validation schema for updating blog posts
const updateBlogPostSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  excerpt: z.string().min(10).max(300).optional(),
  content: z.string().min(50).optional(),
  featuredImage: z.string().optional(),
  author: z
    .object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      avatar: z.string().optional(),
    })
    .optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(BlogStatus).optional(),
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),
  featured: z.boolean().optional(),
  allowComments: z.boolean().optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.array(z.string()).optional(),
      ogImage: z.string().optional(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      canonicalUrl: z.string().optional(),
    })
    .optional(),
});

// GET /api/blog/[id] - Get a single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post ID is required",
        },
        { status: 400 }
      );
    }

    const blogPost = await BlogService.getBlogPostById(id);

    if (!blogPost) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
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

// PUT /api/blog/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = updateBlogPostSchema.parse(body);

    // Convert date strings to Date objects
    const updateData: UpdateBlogPostData = {
      _id: id,
      ...validatedData,
      publishedAt: validatedData.publishedAt
        ? new Date(validatedData.publishedAt)
        : undefined,
      scheduledAt: validatedData.scheduledAt
        ? new Date(validatedData.scheduledAt)
        : undefined,
    };

    const updatedBlogPost = await BlogService.updateBlogPost(updateData);

    return NextResponse.json({
      success: true,
      data: updatedBlogPost,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog post:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog post data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update blog post",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post ID is required",
        },
        { status: 400 }
      );
    }

    const deleted = await BlogService.deleteBlogPost(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete blog post",
      },
      { status: 500 }
    );
  }
}
