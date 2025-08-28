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
  BookOpenIcon,
  TagIcon,
  ArrowUpIcon,
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Increment view count when component mounts
    incrementViewCount();

    // Add scroll listener for scroll-to-top button and reading progress
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Calculate reading progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate table of contents from content headings
  const generateTableOfContents = () => {
    if (!post.content) return [];

    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/g;
    const headings: Array<{ level: number; text: string; id: string }> = [];
    let match;

    while ((match = headingRegex.exec(post.content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, ""); // Remove HTML tags
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      headings.push({ level, text, id });
    }

    return headings;
  };

  // Add IDs to headings in content for table of contents
  const addIdsToHeadings = (content: string) => {
    if (!content) return content;

    return content.replace(
      /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/g,
      (match, level, text) => {
        const cleanText = text.replace(/<[^>]*>/g, "");
        const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return `<h${level} id="${id}">${text}</h${level}>`;
      }
    );
  };

  const tableOfContents = generateTableOfContents();

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

      {/* Hero Section */}
      <section className="relative">
        {post.featuredImage && (
          <div className="relative h-[600px] sm:h-[500px] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="container mx-auto px-4 pb-16">
                <div className="max-w-5xl">
                  {/* Category Badge */}
                  <div className="mb-6">
                    <span
                      className="inline-block px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg"
                      style={{
                        backgroundColor: post.category?.color || "#b22e2e",
                      }}
                    >
                      {post.category?.name || "General"}
                    </span>
                    {post.featured && (
                      <span className="ml-3 inline-block px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full shadow-lg">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 mb-8">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full">
                      {post.author?.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name || "Author"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <UserIcon className="w-5 h-5" />
                        </div>
                      )}
                      <span className="font-medium">
                        {post.author?.name || "Unknown Author"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full">
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
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                  <Link href="/blog">
                    <Button
                      variant="ghost"
                      className="text-foreground hover:bg-foreground/10"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>

                {/* Category Badge */}
                <div className="mb-8">
                  <span
                    className="inline-block px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg"
                    style={{
                      backgroundColor: post.category?.color || "#b22e2e",
                    }}
                  >
                    {post.category?.name || "General"}
                  </span>
                  {post.featured && (
                    <span className="ml-3 inline-block px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full shadow-lg">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name || "Author"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-muted"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                    <span className="font-medium">
                      {post.author?.name || "Unknown Author"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                    <EyeIcon className="w-4 h-4" />
                    <span>{viewCount.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-card rounded-2xl border border-border shadow-lg p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <BookOpenIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    Table of Contents
                  </h3>
                </div>

                {tableOfContents.length > 0 ? (
                  <nav className="space-y-1 md:space-y-2">
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-xs md:text-sm transition-colors duration-200 hover:text-primary ${
                          heading.level === 1
                            ? "font-semibold text-foreground"
                            : heading.level === 2
                            ? "font-medium text-foreground ml-2 md:ml-3"
                            : "text-muted-foreground ml-4 md:ml-6"
                        }`}
                        style={{
                          paddingLeft: `${(heading.level - 1) * 8}px`,
                        }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                ) : (
                  <p className="text-muted-foreground text-xs md:text-sm">
                    No headings found in this article.
                  </p>
                )}

                {/* Reading Progress */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
                    <span>Reading Progress</span>
                    <span>{readingProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 md:h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-1.5 md:h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${readingProgress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Excerpt */}
            <div className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 p-6 md:p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl md:rounded-2xl border-l-4 border-primary shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                <p className="leading-relaxed">{post.excerpt}</p>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 p-4 md:p-6 bg-card rounded-xl md:rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <Button
                  variant={liked ? "primary" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <HeartIcon
                    className={`w-4 h-4 ${liked ? "fill-primary" : ""}`}
                  />
                  <span>{likeCount}</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-muted-foreground mr-2 md:mr-3">
                  Share:
                </span>
                <div className="flex items-center gap-1 md:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("facebook")}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:scale-110 p-2"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("twitter")}
                    className="text-sky-500 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200 hover:scale-110 p-2"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("linkedin")}
                    className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 hover:scale-110 p-2"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("copy")}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110 p-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-sm md:prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: addIdsToHeadings(post.content),
                }}
                className="blog-content"
              />
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <TagIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${tag?.name || ""}`}
                      className="inline-block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full hover:from-primary/20 hover:to-accent/20 transition-all duration-200 hover:scale-105 border border-primary/20"
                    >
                      #{tag?.name || "tag"}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl md:rounded-2xl border border-primary/10 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                  {post.author?.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name || "Author"}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-4 border-white shadow-lg mx-auto sm:mx-0"
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 md:border-4 border-white shadow-lg mx-auto sm:mx-0">
                      <UserIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                      {post.author?.name || "Unknown Author"}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      Author and IT expert sharing insights on technology,
                      software development, and digital transformation.
                      Passionate about helping businesses leverage technology
                      for growth and innovation.
                    </p>
                    <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                      <span>• IT Expert</span>
                      <span>• Technology Writer</span>
                      <span>• Digital Transformation Specialist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-r from-muted/30 to-muted/50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
                  Related Articles
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                  Continue exploring more insights and knowledge from our expert
                  team
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 md:bottom-8 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 flex items-center justify-center"
        >
          <ArrowUpIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
          color: rgb(var(--foreground));
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          color: rgb(var(--foreground));
          scroll-margin-top: 100px;
        }

        .blog-content h1 {
          font-size: 2.5rem;
          color: rgb(var(--primary));
          border-bottom: 3px solid rgb(var(--primary));
          padding-bottom: 0.5rem;
        }

        .blog-content h2 {
          font-size: 2rem;
          color: rgb(var(--secondary));
          border-left: 4px solid rgb(var(--primary));
          padding-left: 1rem;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          color: rgb(var(--accent));
        }

        .blog-content p {
          margin-bottom: 1.8rem;
          font-size: 1.1rem;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 2rem 0;
          padding-left: 2.5rem;
        }

        .blog-content li {
          margin-bottom: 0.8rem;
          position: relative;
        }

        .blog-content ul li::before {
          content: "•";
          color: rgb(var(--primary));
          font-weight: bold;
          position: absolute;
          left: -1.5rem;
        }

        .blog-content ol li::before {
          content: counter(list-item);
          color: rgb(var(--primary));
          font-weight: bold;
          position: absolute;
          left: -2rem;
        }

        .blog-content blockquote {
          border-left: 4px solid rgb(var(--primary));
          padding: 2rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: rgb(var(--muted-foreground));
          background: linear-gradient(
            135deg,
            rgb(var(--primary) / 5),
            rgb(var(--accent) / 5)
          );
          border-radius: 1rem;
          position: relative;
        }

        .blog-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: rgb(var(--primary));
          position: absolute;
          top: -1rem;
          left: 1rem;
          font-family: serif;
        }

        .blog-content pre {
          background: linear-gradient(
            135deg,
            rgb(var(--secondary)),
            rgb(var(--foreground))
          );
          color: rgb(var(--background));
          padding: 2rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid rgb(var(--border));
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .blog-content code {
          background: rgb(var(--muted));
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-family: "Courier New", monospace;
          font-size: 0.9rem;
          color: rgb(var(--primary));
          border: 1px solid rgb(var(--border));
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
          border: none;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2.5rem auto;
          display: block;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgb(var(--border));
        }

        .blog-content a {
          color: rgb(var(--primary));
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .blog-content a:hover {
          color: rgb(var(--accent));
          border-bottom-color: rgb(var(--accent));
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid rgb(var(--border));
          padding: 1rem;
          text-align: left;
        }

        .blog-content th {
          background: linear-gradient(
            135deg,
            rgb(var(--primary) / 10),
            rgb(var(--accent) / 10)
          );
          font-weight: 600;
          color: rgb(var(--foreground));
        }

        .blog-content tr:nth-child(even) {
          background: rgb(var(--muted) / 30);
        }

        .blog-content tr:hover {
          background: rgb(var(--primary) / 5);
        }

        /* Custom scrollbar for the entire page */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgb(var(--muted));
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgb(var(--primary)),
            rgb(var(--accent))
          );
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgb(var(--primary-hover)),
            rgb(var(--accent-hover))
          );
        }
      `}</style>
    </div>
  );
}
