"use client";
import React, { useState, useEffect } from "react";
import { BlogPost } from "@/app/lib/models/blog";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  UserIcon,
  ArrowLeftIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/app/components/ui/Button";
import BlogCard from "./BlogCard";

interface BlogPostDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostDetail({
  post,
  relatedPosts,
}: BlogPostDetailProps) {
  // Safety check for post data
  if (!post || !post.slug || !post.title) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested blog post could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [viewCount, setViewCount] = useState(post.views || 0);

  useEffect(() => {
    // Increment view count when component mounts
    incrementViewCount();
  }, []);

  const incrementViewCount = async () => {
    try {
      const response = await fetch(`/api/blog/slug/${post.slug}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setViewCount(data.data.post.views);
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/slug/${post.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: liked ? "unlike" : "like",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.data.likes);
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = async (platform: string) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const title = post.title;
    const text = post.excerpt;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          // You might want to show a toast notification here
          alert("Link copied to clipboard!");
        } catch (error) {
          console.error("Error copying to clipboard:", error);
        }
        break;
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";
    return format(new Date(date), "MMMM dd, yyyy");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title || "Blog Post",
    description: post.excerpt || "Blog post content",
    image: post.featuredImage,
    author: {
      "@type": "Person",
      name: post.author?.name || "Unknown Author",
      email: post.author?.email || "",
    },
    publisher: {
      "@type": "Organization",
      name: "RenderWise",
    },
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${post.slug}`,
    },
    articleSection: post.category?.name || "General",
    keywords: post.tags?.map((tag) => tag.name).join(", ") || "",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Navigation */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        {post.featuredImage && (
          <div className="relative h-96 lg:h-[500px] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="container mx-auto px-4 pb-12">
                <div className="max-w-4xl">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                      style={{
                        backgroundColor: post.category?.color || "#3B82F6",
                      }}
                    >
                      {post.category?.name || "General"}
                    </span>
                    {post.featured && (
                      <span className="ml-3 inline-block px-3 py-1 text-sm font-semibold bg-yellow-500 text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      {post.author?.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name || "Author"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <UserIcon className="w-4 h-4" />
                        </div>
                      )}
                      <span className="font-medium">{post.author?.name || "Unknown Author"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{viewCount.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Title Section (if no featured image) */}
        {!post.featuredImage && (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Category Badge */}
                <div className="mb-6">
                  <span
                    className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                    style={{
                      backgroundColor: post.category?.color || "#3B82F6",
                    }}
                  >
                    {post.category?.name || "General"}
                  </span>
                  {post.featured && (
                    <span className="ml-3 inline-block px-3 py-1 text-sm font-semibold bg-yellow-500 text-white rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name || "Author"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon className="w-4 h-4" />
                      </div>
                    )}
                    <span className="font-medium">{post.author?.name || "Unknown Author"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{viewCount.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          <div className="text-xl text-muted-foreground mb-8 p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
            {post.excerpt}
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between mb-8 p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-4">
              <Button
                variant={liked ? "primary" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <HeartIcon
                  className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                />
                <span>{likeCount}</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="text-blue-600 hover:text-blue-700"
              >
                <FacebookIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="text-sky-500 hover:text-sky-600"
              >
                <TwitterIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="text-blue-700 hover:text-blue-800"
              >
                <LinkedinIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("copy")}
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-content"
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${tag?.name || ""}`}
                    className="inline-block px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    #{tag?.name || "tag"}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-start gap-4 p-6 bg-card rounded-lg border">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name || "Author"}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-1">
                  {post.author?.name || "Unknown Author"}
                </h4>
                <p className="text-muted-foreground">
                  Author and IT expert sharing insights on technology, software
                  development, and digital transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost._id?.toString()}
                    post={relatedPost}
                    variant="grid"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-content h1 {
          font-size: 2.25rem;
        }

        .blog-content h2 {
          font-size: 1.875rem;
        }

        .blog-content h3 {
          font-size: 1.5rem;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .blog-content pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .blog-content code {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: "Courier New", monospace;
          font-size: 0.875rem;
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem auto;
          display: block;
        }

        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #1d4ed8;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }

        .blog-content th {
          background: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
