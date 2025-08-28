"use client";
import React, { useState } from "react";
import { BlogPost, BlogCategory, BlogTag } from "@/app/lib/models/blog";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";
import BlogHero from "./BlogHero";
import { SearchIcon, FilterIcon, GridIcon, ListIcon } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogListingProps {
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  categories: BlogCategory[];
  tags: BlogTag[];
  featuredPosts: BlogPost[];
  currentCategory?: string;
  currentTag?: string;
  currentSearch?: string;
}

type ViewMode = "grid" | "list";

export default function BlogListing({
  posts,
  pagination,
  categories,
  tags,
  featuredPosts,
  currentCategory,
  currentTag,
  currentSearch,
}: BlogListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    
    params.delete("page"); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handleFilterChange = (type: "category" | "tag", value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (type === "category") {
      if (value && value !== "all") {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      params.delete("tag"); // Clear tag filter when changing category
    } else {
      if (value && value !== "all") {
        params.set("tag", value);
      } else {
        params.delete("tag");
      }
      params.delete("category"); // Clear category filter when changing tag
    }
    
    params.delete("page"); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/blog");
  };

  const hasActiveFilters = currentCategory || currentTag || currentSearch;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BlogHero featuredPosts={featuredPosts} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-card rounded-lg border p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </form>

                {/* View Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <GridIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <ListIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t lg:hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Category
                      </label>
                      <select
                        value={currentCategory || "all"}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category._id?.toString()} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tag
                      </label>
                      <select
                        value={currentTag || "all"}
                        onChange={(e) => handleFilterChange("tag", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="all">All Tags</option>
                        {tags.map((tag) => (
                          <option key={tag._id?.toString()} value={tag.name}>
                            {tag.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {currentCategory && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        Category: {categories.find(c => c.slug === currentCategory)?.name}
                        <button
                          onClick={() => handleFilterChange("category", "")}
                          className="ml-1 text-primary/60 hover:text-primary"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {currentTag && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        Tag: {currentTag}
                        <button
                          onClick={() => handleFilterChange("tag", "")}
                          className="ml-1 text-primary/60 hover:text-primary"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {currentSearch && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        Search: "{currentSearch}"
                        <button
                          onClick={clearFilters}
                          className="ml-1 text-primary/60 hover:text-primary"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs h-6"
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {posts.length} of {pagination.totalPosts} articles
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>

            {/* Posts Grid/List */}
            {posts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {posts.map((post) => (
                  <BlogCard 
                    key={post._id?.toString()} 
                    post={post} 
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <SearchIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your search criteria or clear the filters."
                    : "Check back later for new content."}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                >
                  Previous
                </Button>
                
                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === pagination.currentPage ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BlogSidebar
              categories={categories}
              tags={tags}
              currentCategory={currentCategory}
              currentTag={currentTag}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
