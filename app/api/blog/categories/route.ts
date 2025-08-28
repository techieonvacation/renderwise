import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";
import { CreateBlogCategoryData } from "@/app/lib/models/blog";
import { z } from "zod";

// Validation schema for creating categories
const createCategorySchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().optional(),
  description: z.string().max(200).optional(),
  color: z.string().optional(),
});

// GET /api/blog/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await BlogService.getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

// POST /api/blog/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createCategorySchema.parse(body);

    const createData: CreateBlogCategoryData = validatedData;

    const category = await BlogService.createCategory(createData);

    return NextResponse.json({
      success: true,
      data: category,
      message: "Category created successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid category data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create category",
      },
      { status: 500 }
    );
  }
}
