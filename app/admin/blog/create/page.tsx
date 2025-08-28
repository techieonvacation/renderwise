"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { ImageUpload } from "@/app/components/ui/ImageUpload";
import { RichTextEditor } from "@/app/components/ui/RichTextEditor";
import {
  SaveIcon,
  EyeIcon,
  ArrowLeftIcon,
  CalendarIcon,
  TagIcon,
  FolderIcon,
  UserIcon,
  ImageIcon,
  FileTextIcon,
  GlobeIcon,
} from "lucide-react";
import {
  BlogStatus,
  BlogCategory,
  CreateBlogPostData,
  generateSlug,
  extractExcerpt,
} from "@/app/lib/models/blog";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBlogPostData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: {
      name: "",
      email: "",
      avatar: "",
    },
    categoryId: "",
    tags: [],
    status: BlogStatus.DRAFT,
    featured: false,
    allowComments: true,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
      ogImage: "",
      ogTitle: "",
      ogDescription: "",
    },
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !formData.slug) {
      const generatedSlug = generateSlug(formData.title);
      console.log("Auto-generating slug:", {
        title: formData.title,
        generatedSlug,
      });
      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  }, [formData.title]);

  useEffect(() => {
    // Auto-generate excerpt from content
    if (formData.content && !formData.excerpt) {
      setFormData((prev) => ({
        ...prev,
        excerpt: extractExcerpt(formData.content || "", 160),
      }));
    }
  }, [formData.content]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof CreateBlogPostData] as any),
        [field]: value,
      },
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.slug?.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (!formData.excerpt?.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length < 10) {
      newErrors.excerpt = "Excerpt must be at least 10 characters";
    }

    if (!formData.content?.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 50) {
      newErrors.content = "Content must be at least 50 characters";
    }

    if (!formData.author.name?.trim()) {
      newErrors.authorName = "Author name is required";
    }

    if (!formData.author.email?.trim()) {
      newErrors.authorEmail = "Author email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.author.email)) {
      newErrors.authorEmail = "Please enter a valid email";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status: BlogStatus) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        status,
        publishedAt:
          status === BlogStatus.PUBLISHED
            ? new Date().toISOString()
            : undefined,
      };

      console.log("Sending data to API:", dataToSend);
      console.log("Slug being sent:", dataToSend.slug);

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/admin/blog`);
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        // Handle error - show toast or error message
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create New Post
            </h1>
            <p className="text-muted-foreground">
              Write and publish your blog post
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSave(BlogStatus.DRAFT)}
            disabled={loading}
          >
            <SaveIcon className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(BlogStatus.PUBLISHED)}
            disabled={loading}
          >
            <GlobeIcon className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter your blog post title"
              className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.title ? "border-destructive" : ""
              }`}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              URL Slug <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center">
              <span className="text-muted-foreground text-sm mr-2">/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="url-slug"
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.slug ? "border-destructive" : ""
                }`}
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Excerpt <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              placeholder="Brief description of your post (will be auto-generated if left empty)"
              rows={3}
              maxLength={300}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.excerpt ? "border-destructive" : ""
              }`}
            />
            <div className="flex justify-between text-sm">
              {errors.excerpt && (
                <p className="text-destructive">{errors.excerpt}</p>
              )}
              <p className="text-muted-foreground ml-auto">
                {formData.excerpt.length}/300
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <ImageUpload
              label="Featured Image"
              value={formData.featuredImage}
              onChange={(url) => handleInputChange("featuredImage", url)}
              placeholder="Upload a featured image for your post"
              helperText="Recommended size: 1200x630px"
              aspectRatio={1200 / 630}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Content <span className="text-destructive">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => handleInputChange("content", content)}
              placeholder="Write your blog post content here..."
              minHeight="400px"
              onImageUpload={handleImageUpload}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author */}
          <div className="bg-card p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              Author
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.author.name}
                  onChange={(e) =>
                    handleNestedInputChange("author", "name", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.authorName ? "border-destructive" : ""
                  }`}
                />
                {errors.authorName && (
                  <p className="text-sm text-destructive">
                    {errors.authorName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={formData.author.email}
                  onChange={(e) =>
                    handleNestedInputChange("author", "email", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.authorEmail ? "border-destructive" : ""
                  }`}
                />
                {errors.authorEmail && (
                  <p className="text-sm text-destructive">
                    {errors.authorEmail}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.author.avatar}
                  onChange={(e) =>
                    handleNestedInputChange("author", "avatar", e.target.value)
                  }
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-card p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <FolderIcon className="w-4 h-4 mr-2" />
              Category
            </h3>
            <select
              value={formData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.categoryId ? "border-destructive" : ""
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option
                  key={category._id?.toString()}
                  value={category._id?.toString()}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-destructive">{errors.categoryId}</p>
            )}
            {categories.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No categories found.{" "}
                <Link
                  href="/admin/blog/categories"
                  className="text-primary hover:underline"
                >
                  Create one
                </Link>
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="bg-card p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <TagIcon className="w-4 h-4 mr-2" />
              Tags
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-primary/60 hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-card p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-foreground">Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="mr-2"
                />
                <span className="text-sm">Featured Post</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={(e) =>
                    handleInputChange("allowComments", e.target.checked)
                  }
                  className="mr-2"
                />
                <span className="text-sm">Allow Comments</span>
              </label>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-card p-6 rounded-lg border space-y-4">
            <h3 className="font-semibold text-foreground">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ""}
                  onChange={(e) =>
                    handleNestedInputChange("seo", "metaTitle", e.target.value)
                  }
                  placeholder="SEO title (leave empty to use post title)"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Meta Description
                </label>
                <textarea
                  value={formData.seo?.metaDescription || ""}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "seo",
                      "metaDescription",
                      e.target.value
                    )
                  }
                  placeholder="SEO description (leave empty to use excerpt)"
                  rows={2}
                  maxLength={160}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
