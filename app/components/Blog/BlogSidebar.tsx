"use client";
import React from "react";
import { BlogCategory, BlogTag } from "@/app/lib/models/blog";
import { FolderIcon, TagIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";

interface BlogSidebarProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  currentCategory?: string;
  currentTag?: string;
  onFilterChange: (type: "category" | "tag", value: string) => void;
}

export default function BlogSidebar({
  categories,
  tags,
  currentCategory,
  currentTag,
  onFilterChange,
}: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="font-semibold text-foreground flex items-center mb-4">
          <FolderIcon className="w-4 h-4 mr-2" />
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange("category", "")}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !currentCategory
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id?.toString()}
              onClick={() => onFilterChange("category", category.slug)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                currentCategory === category.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color || "#3B82F6" }}
                />
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="font-semibold text-foreground flex items-center mb-4">
          <TagIcon className="w-4 h-4 mr-2" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <button
              key={tag._id?.toString()}
              onClick={() => onFilterChange("tag", tag.name)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                currentTag === tag.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border p-6">
        <h3 className="font-semibold text-foreground mb-3">
          Stay Updated
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscribe to our newsletter and never miss our latest insights and updates.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="font-semibold text-foreground flex items-center mb-4">
          <TrendingUpIcon className="w-4 h-4 mr-2" />
          Trending Topics
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">AI & Machine Learning</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">Hot</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cloud Computing</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">Trending</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cybersecurity</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">Popular</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Web Development</span>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">Rising</span>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg border p-6 text-center">
        <h3 className="font-semibold text-foreground mb-2">
          Need IT Solutions?
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Let's discuss how we can help transform your business with our IT services.
        </p>
        <Link 
          href="/contact-us"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
