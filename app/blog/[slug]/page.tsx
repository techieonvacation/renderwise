import React from "react";
import { BlogService } from "@/app/lib/services/blogService";
import { BlogStatus } from "@/app/lib/models/blog";
import BlogPostDetail from "@/app/components/Blog/BlogPostDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serializeForClient, serializeArrayForClient } from "@/app/lib/utils/serialization";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await BlogService.getBlogPost(slug);
    
    if (!post || post.status !== BlogStatus.PUBLISHED) {
      return {
        title: "Post Not Found",
      };
    }

    const metaTitle = post.seo?.metaTitle || post.title;
    const metaDescription = post.seo?.metaDescription || post.excerpt;
    const ogImage = post.seo?.ogImage || post.featuredImage;

    return {
      title: `${metaTitle} | RenderWise Blog`,
      description: metaDescription,
      keywords: post.seo?.metaKeywords || post.tags.map(tag => tag.name),
      authors: [{ name: post.author.name }],
      openGraph: {
        title: post.seo?.ogTitle || metaTitle,
        description: post.seo?.ogDescription || metaDescription,
        type: "article",
        url: `/blog/${post.slug}`,
        images: ogImage ? [{ url: ogImage }] : undefined,
        publishedTime: post.publishedAt?.toISOString(),
        authors: [post.author.name],
        tags: post.tags.map(tag => tag.name),
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo?.ogTitle || metaTitle,
        description: post.seo?.ogDescription || metaDescription,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: post.seo?.canonicalUrl || `/blog/${post.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | RenderWise",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    console.log("🔍 Looking for post with slug:", slug);
    
    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.log("❌ Invalid slug format:", slug);
      notFound();
    }

    const post = await BlogService.getBlogPost(slug);
    console.log("📝 Found post:", post ? { 
      title: post.title, 
      slug: post.slug, 
      status: post.status,
      id: post._id?.toString() 
    } : null);
    
    if (!post) {
      console.log("❌ Post not found, calling notFound()");
      
      // In development, show helpful debug info
      if (process.env.NODE_ENV === 'development') {
        console.log("🔧 Debug: Checking all available posts...");
        try {
          const allPosts = await BlogService.getBlogPosts({ limit: 100 });
          console.log("📋 Available posts:", allPosts.posts.map(p => ({ 
            title: p.title, 
            slug: p.slug, 
            status: p.status 
          })));
        } catch (debugError) {
          console.error("❌ Error fetching debug posts:", debugError);
        }
      }
      
      notFound();
    }

    // Only show published posts to public
    if (post.status !== BlogStatus.PUBLISHED) {
      console.log("❌ Post not published, status:", post.status);
      notFound();
    }

    // Get related posts
    const relatedPosts = await BlogService.getRelatedPosts(post._id!.toString(), 4);
    console.log("🔗 Related posts found:", relatedPosts.length);

    // Increment views (this will be handled by the API route)
    // We'll call the API from the client component to avoid SSR issues

    return (
      <BlogPostDetail 
        post={serializeForClient(post)} 
        relatedPosts={serializeArrayForClient(relatedPosts)}
      />
    );
  } catch (error) {
    console.error("❌ Error loading blog post:", error);
    console.error("🔧 Error details:", {
      slug: (await params).slug,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    notFound();
  }
}

// Generate static params for popular blog posts (optional for better performance)
export async function generateStaticParams() {
  try {
    const { posts } = await BlogService.getBlogPosts({
      status: BlogStatus.PUBLISHED,
      limit: 50, // Generate static pages for top 50 posts
      sortBy: "views",
      sortOrder: "desc",
    });

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
