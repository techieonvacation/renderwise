"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  EditIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  TagIcon,
  FolderIcon,
  TrendingUpIcon,
  FileTextIcon,
  ArchiveIcon
} from "lucide-react";
import { BlogPost, BlogStatus, BlogCategory } from "@/app/lib/models/blog";
import { format } from "date-fns";
import Link from "next/link";

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  totalLikes: number;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<BlogStatus | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedStatus, selectedCategory, currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch posts with filters
      const postsParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });
      
      if (searchQuery) postsParams.append("query", searchQuery);
      if (selectedStatus !== "all") postsParams.append("status", selectedStatus);
      if (selectedCategory !== "all") postsParams.append("category", selectedCategory);
      
      const [postsResponse, categoriesResponse, statsResponse] = await Promise.all([
        fetch(`/api/blog?${postsParams}`),
        fetch("/api/blog/categories"),
        fetch("/api/blog/stats"),
      ]);

      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData.data.posts);
        setTotalPages(postsData.data.pagination.totalPages);
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id?.toString() !== postId));
        setShowDeleteModal(null);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getStatusColor = (status: BlogStatus) => {
    switch (status) {
      case BlogStatus.PUBLISHED:
        return "bg-green-100 text-green-800";
      case BlogStatus.DRAFT:
        return "bg-yellow-100 text-yellow-800";
      case BlogStatus.ARCHIVED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Not set";
    return format(new Date(date), "MMM dd, yyyy");
  };

  if (loading && !posts.length) {
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts, categories, and content
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/blog/categories">
            <Button variant="outline">
              <FolderIcon className="w-4 h-4 mr-2" />
              Categories
            </Button>
          </Link>
          <Link href="/admin/blog/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center">
              <FileTextIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-foreground">{stats.publishedPosts}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center">
              <TrendingUpIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center">
              <FolderIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-card p-6 rounded-lg border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-[150px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as BlogStatus | "all")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value={BlogStatus.PUBLISHED}>Published</option>
              <option value={BlogStatus.DRAFT}>Draft</option>
              <option value={BlogStatus.ARCHIVED}>Archived</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="min-w-[150px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post._id?.toString()} className="hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {post.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {post.category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {post.author.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post._id}`}>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteModal(post._id?.toString() || "")}
                        className="text-destructive hover:text-destructive"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">No posts found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by creating a new blog post.
            </p>
            <div className="mt-6">
              <Link href="/admin/blog/create">
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Blog Post</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
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
                onClick={() => handleDeletePost(showDeleteModal)}
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
