import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";
import {
  CreateBlogPostData,
  BlogSearchParams,
  BlogStatus,
} from "@/app/lib/models/blog";
import { z } from "zod";

// Validation schemas
const createBlogPostSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().optional(),
  excerpt: z.string().min(10).max(300),
  content: z.string().min(50),
  featuredImage: z.string().optional(),
  author: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    avatar: z.string().optional(),
  }),
  categoryId: z.string(),
  tags: z.array(z.string()),
  status: z.nativeEnum(BlogStatus),
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

const searchParamsSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(BlogStatus).optional(),
  author: z.string().optional(),
  featured: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z
    .enum(["createdAt", "publishedAt", "title", "views", "likes"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// GET /api/blog - Get all blog posts with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const rawParams = {
      query: searchParams.get("query") || undefined,
      category: searchParams.get("category") || undefined,
      tags:
        searchParams.getAll("tags").length > 0
          ? searchParams.getAll("tags")
          : undefined,
      status: searchParams.get("status") || undefined,
      author: searchParams.get("author") || undefined,
      featured: searchParams.get("featured") || undefined,
      dateFrom: searchParams.get("dateFrom") || undefined,
      dateTo: searchParams.get("dateTo") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") || undefined,
    };

    // Validate search parameters
    const validatedRawParams = searchParamsSchema.parse(rawParams);

    // Transform to proper types for BlogSearchParams
    const validatedParams: BlogSearchParams = {
      ...validatedRawParams,
      status: validatedRawParams.status as BlogStatus | undefined,
      featured:
        validatedRawParams.featured === "true"
          ? true
          : validatedRawParams.featured === "false"
          ? false
          : undefined,
      dateFrom: validatedRawParams.dateFrom
        ? new Date(validatedRawParams.dateFrom)
        : undefined,
      dateTo: validatedRawParams.dateTo
        ? new Date(validatedRawParams.dateTo)
        : undefined,
      page: validatedRawParams.page ? parseInt(validatedRawParams.page) : 1,
      limit: validatedRawParams.limit ? parseInt(validatedRawParams.limit) : 10,
    };

    const result = await BlogService.getBlogPosts(validatedParams);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid search parameters",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch blog posts",
      },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createBlogPostSchema.parse(body);

    // Convert date strings to Date objects
    const createData: CreateBlogPostData = {
      ...validatedData,
      publishedAt: validatedData.publishedAt
        ? new Date(validatedData.publishedAt)
        : undefined,
      scheduledAt: validatedData.scheduledAt
        ? new Date(validatedData.scheduledAt)
        : undefined,
    };

    const blogPost = await BlogService.createBlogPost(createData);

    return NextResponse.json(
      {
        success: true,
        data: blogPost,
        message: "Blog post created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);

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
          error instanceof Error ? error.message : "Failed to create blog post",
      },
      { status: 500 }
    );
  }
}
