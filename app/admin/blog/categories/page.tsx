"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  FolderIcon,
  SaveIcon,
  XIcon
} from "lucide-react";
import { BlogCategory, CreateBlogCategoryData, UpdateBlogCategoryData, generateSlug } from "@/app/lib/models/blog";
import Link from "next/link";

const colorOptions = [
  { value: "#3B82F6", label: "Blue", class: "bg-blue-500" },
  { value: "#10B981", label: "Green", class: "bg-green-500" },
  { value: "#F59E0B", label: "Yellow", class: "bg-yellow-500" },
  { value: "#EF4444", label: "Red", class: "bg-red-500" },
  { value: "#8B5CF6", label: "Purple", class: "bg-purple-500" },
  { value: "#06B6D4", label: "Cyan", class: "bg-cyan-500" },
  { value: "#F97316", label: "Orange", class: "bg-orange-500" },
  { value: "#84CC16", label: "Lime", class: "bg-lime-500" },
];

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBlogCategoryData>({
    name: "",
    slug: "",
    description: "",
    color: colorOptions[0].value,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from name
    if (formData.name && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.name)
      }));
    }
  }, [formData.name]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    // Check for duplicate slug
    const duplicateSlug = categories.find(cat => 
      cat.slug === formData.slug && cat._id?.toString() !== editingCategory?._id?.toString()
    );
    if (duplicateSlug) {
      newErrors.slug = "A category with this slug already exists";
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Description must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      if (editingCategory) {
        // Update existing category
        const updateData: UpdateBlogCategoryData = {
          _id: editingCategory._id!.toString(),
          ...formData,
        };

        const response = await fetch(`/api/blog/categories/${editingCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          await fetchCategories();
          handleCloseModal();
        } else {
          const errorData = await response.json();
          console.error("Error updating category:", errorData);
        }
      } else {
        // Create new category
        const response = await fetch("/api/blog/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchCategories();
          handleCloseModal();
        } else {
          const errorData = await response.json();
          console.error("Error creating category:", errorData);
        }
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: BlogCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      color: category.color || colorOptions[0].value,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat._id?.toString() !== categoryId));
        setShowDeleteModal(null);
      } else {
        const errorData = await response.json();
        console.error("Error deleting category:", errorData);
        alert(errorData.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: colorOptions[0].value,
    });
    setErrors({});
  };

  const handleNewCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: colorOptions[0].value,
    });
    setErrors({});
    setShowModal(true);
  };

  if (loading && !categories.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your blog categories
            </p>
          </div>
        </div>
        <Button onClick={handleNewCategory}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id?.toString()} className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color || colorOptions[0].value }}
                />
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">/{category.slug}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteModal(category._id?.toString() || "")}
                  className="text-destructive hover:text-destructive"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {category.description && (
              <p className="text-sm text-muted-foreground">{category.description}</p>
            )}
            <div className="mt-4 text-xs text-muted-foreground">
              Created {new Date(category.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FolderIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">No categories</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by creating your first category.
            </p>
            <div className="mt-6">
              <Button onClick={handleNewCategory}>
                <PlusIcon className="w-4 h-4 mr-2" />
                New Category
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {editingCategory ? "Edit Category" : "New Category"}
              </h3>
              <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Category name"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Slug <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center">
                  <span className="text-muted-foreground text-sm mr-2">/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="category-slug"
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.slug ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Optional category description"
                  rows={3}
                  maxLength={200}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.description ? "border-destructive" : ""
                  }`}
                />
                <div className="flex justify-between text-sm mt-1">
                  {errors.description && <p className="text-destructive">{errors.description}</p>}
                  <p className="text-muted-foreground ml-auto">{formData.description.length}/200</p>
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleInputChange("color", color.value)}
                      className={`w-full h-10 rounded-md border-2 ${color.class} ${
                        formData.color === color.value ? "border-foreground" : "border-transparent"
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                <SaveIcon className="w-4 h-4 mr-2" />
                {editingCategory ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Category</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this category? This action cannot be undone and may affect existing blog posts.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(showDeleteModal)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
