import React from "react";
import { BlogService } from "@/app/lib/services/blogService";
import { BlogStatus } from "@/app/lib/models/blog";
import BlogListing from "@/app/components/Blog/BlogListing";
import { Metadata } from "next";
import { serializeForClient, serializeArrayForClient } from "@/app/lib/utils/serialization";

export const metadata: Metadata = {
  title: "Blog | RenderWise - IT Solutions & Insights",
  description: "Stay updated with the latest insights, trends, and solutions in IT services, software development, and digital transformation.",
  keywords: ["blog", "IT insights", "technology trends", "software development", "digital transformation", "RenderWise"],
  openGraph: {
    title: "Blog | RenderWise - IT Solutions & Insights",
    description: "Stay updated with the latest insights, trends, and solutions in IT services, software development, and digital transformation.",
    type: "website",
    url: "/blog",
  },
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || "1");
  const category = searchParams.category;
  const tag = searchParams.tag;
  const search = searchParams.search;

  try {
    console.log("🔍 Loading blog page with params:", { page, category, tag, search });

    const [postsData, categoriesData, tagsData, featuredPostsData] = await Promise.all([
      BlogService.getBlogPosts({
        status: BlogStatus.PUBLISHED,
        category,
        tags: tag ? [tag] : undefined,
        query: search,
        page,
        limit: 12,
        sortBy: "publishedAt",
        sortOrder: "desc",
      }),
      BlogService.getCategories(),
      BlogService.getPopularTags(20),
      BlogService.getFeaturedPosts(3),
    ]);

    console.log("📊 Blog data loaded:", {
      posts: postsData.posts.length,
      categories: categoriesData.length,
      tags: tagsData.length,
      featured: featuredPostsData.length
    });

    // If no posts exist at all, show a helpful message in development
    if (postsData.posts.length === 0 && process.env.NODE_ENV === 'development') {
      console.log("⚠️ No blog posts found. You may need to create some posts first.");
      console.log("💡 Tip: Visit /api/blog/test-setup with POST method and action: 'create-sample-data'");
    }

    return (
      <BlogListing
        posts={serializeArrayForClient(postsData.posts)}
        pagination={serializeForClient(postsData.pagination)}
        categories={serializeArrayForClient(categoriesData)}
        tags={serializeArrayForClient(tagsData)}
        featuredPosts={serializeArrayForClient(featuredPostsData)}
        currentCategory={category}
        currentTag={tag}
        currentSearch={search}
      />
    );
  } catch (error) {
    console.error("❌ Error loading blog page:", error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Unable to load blog posts
          </h1>
          <p className="text-muted-foreground mb-6">
            There was an error loading the blog content. This might be due to a database connection issue or missing blog posts.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-muted p-4 rounded-lg text-left">
              <h3 className="font-semibold mb-2">Development Tips:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your MongoDB connection</li>
                <li>• Ensure blog categories exist</li>
                <li>• Create sample blog posts using the test endpoint</li>
                <li>• Check the console for detailed error messages</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
