"use client";
import React from "react";
import { BlogPost } from "@/app/lib/models/blog";
import { CalendarIcon, ClockIcon, EyeIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/app/components/ui/Button";

interface BlogHeroProps {
  featuredPosts: BlogPost[];
}

export default function BlogHero({ featuredPosts }: BlogHeroProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const mainPost = featuredPosts[0];
  const sidebarPosts = featuredPosts.slice(1, 3);

  if (!mainPost) {
    return (
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and solutions in IT services, 
            software development, and digital transformation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and solutions in IT services, 
            software development, and digital transformation.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Featured Post */}
          <div className="lg:col-span-2">
            <article className="group relative overflow-hidden rounded-2xl bg-card border shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="relative h-80 lg:h-96 overflow-hidden">
                {mainPost.featuredImage ? (
                  <img
                    src={mainPost.featuredImage}
                    alt={mainPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary/40">
                      {mainPost.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span 
                      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                      style={{ backgroundColor: mainPost.category.color || "#3B82F6" }}
                    >
                      {mainPost.category.name}
                    </span>
                    <span className="ml-3 inline-block px-3 py-1 text-sm font-semibold bg-yellow-500 text-white rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(mainPost.publishedAt || mainPost.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{mainPost.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{mainPost.views.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Title and Excerpt */}
                  <Link href={`/blog/${mainPost.slug}`} className="block group-hover:text-primary transition-colors">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 line-clamp-2">
                      {mainPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-white/90 mb-4 line-clamp-2">
                    {mainPost.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Link href={`/blog/${mainPost.slug}`}>
                    <Button variant="secondary" className="group/btn">
                      Read Article
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Featured Posts */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6">More Featured</h3>
            {sidebarPosts.map((post) => (
              <article
                key={post._id?.toString()}
                className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-32 overflow-hidden">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span 
                      className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
                      style={{ backgroundColor: post.category.color || "#3B82F6" }}
                    >
                      {post.category.name}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium group"
                  >
                    Read more
                    <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {sidebarPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  More featured posts coming soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
