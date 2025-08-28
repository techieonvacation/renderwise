"use client";
import React from "react";
import { BlogPost } from "@/app/lib/models/blog";
import { CalendarIcon, ClockIcon, EyeIcon, HeartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  variant?: "grid" | "list";
  featured?: boolean;
}

export default function BlogCard({ post, variant = "grid", featured = false }: BlogCardProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const cardClasses = featured
    ? "group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
    : variant === "list"
    ? "group bg-card border rounded-lg hover:shadow-lg transition-all duration-300"
    : "group bg-card border rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300";

  if (variant === "list" && !featured) {
    return (
      <article className={cardClasses}>
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-80 sm:flex-shrink-0">
            <div className="relative h-48 sm:h-full overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                  <span className="text-muted-foreground text-4xl font-bold">
                    {post.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span 
                  className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
                  style={{ backgroundColor: post.category.color || "#3B82F6" }}
                >
                  {post.category.name}
                </span>
              </div>

              {post.featured && (
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <EyeIcon className="w-3 h-3" />
                <span>{post.views.toLocaleString()}</span>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`} className="block group">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-3 line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {post.author.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${tag.name}`}
                    className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Grid variant (default)
  return (
    <article className={cardClasses}>
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
            <span className="text-muted-foreground text-4xl font-bold">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span 
            className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
            style={{ backgroundColor: post.category.color || "#3B82F6" }} 
          >
            {post.category.name}
          </span>
        </div>

        {post.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block group">
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-3 line-clamp-2 ${
            featured ? "text-2xl" : "text-lg"
          }`}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Link
                key={index}
                href={`/blog?tag=${tag.name}`}
                className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Author and Stats */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-3 h-3 text-primary" />
              </div>
            )}
            <span className="text-sm font-medium text-foreground">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <HeartIcon className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
