import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";
import { UpdateBlogCategoryData } from "@/app/lib/models/blog";
import { z } from "zod";

// Validation schema for updating categories
const updateCategorySchema = z.object({
  name: z.string().min(2).max(50).optional(),
  slug: z.string().optional(),
  description: z.string().max(200).optional(),
  color: z.string().optional(),
});

// GET /api/blog/categories/[id] - Get a single category by ID
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
          error: "Category ID is required",
        },
        { status: 400 }
      );
    }

    const category = await BlogService.getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch category",
      },
      { status: 500 }
    );
  }
}

// PUT /api/blog/categories/[id] - Update a category
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
          error: "Category ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = updateCategorySchema.parse(body);

    const updateData: UpdateBlogCategoryData = {
      _id: id,
      ...validatedData,
    };

    const updatedCategory = await BlogService.updateCategory(updateData);

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);

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
        error:
          error instanceof Error ? error.message : "Failed to update category",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/categories/[id] - Delete a category
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
          error: "Category ID is required",
        },
        { status: 400 }
      );
    }

    const deleted = await BlogService.deleteCategory(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete category",
      },
      { status: 500 }
    );
  }
}
