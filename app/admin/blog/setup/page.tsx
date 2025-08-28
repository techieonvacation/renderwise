"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { 
  RefreshCwIcon, 
  PlusIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  ExternalLinkIcon
} from "lucide-react";
import Link from "next/link";

interface BlogStats {
  stats: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalCategories: number;
    totalTags: number;
  };
  samplePosts: Array<{
    title: string;
    slug: string;
    status: string;
    category: string;
    url: string;
  }>;
  categories: Array<{
    name: string;
    slug: string;
  }>;
}

export default function BlogSetupPage() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog/test-setup');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load stats' });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      setMessage({ type: 'error', text: 'Failed to load blog statistics' });
    } finally {
      setLoading(false);
    }
  };

  const createSampleData = async () => {
    try {
      setLoading(true);
      setMessage(null);
      
      const response = await fetch('/api/blog/test-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create-sample-data' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Created ${data.data.categories} categories and ${data.data.posts} blog posts successfully!` 
        });
        await loadStats();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create sample data' });
      }
    } catch (error) {
      console.error('Error creating sample data:', error);
      setMessage({ type: 'error', text: 'Failed to create sample data' });
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = async () => {
    if (!confirm('Are you sure you want to delete ALL blog posts? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      setMessage(null);
      
      const response = await fetch('/api/blog/test-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear-all-data' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Deleted ${data.data.deletedPosts} blog posts successfully!` 
        });
        await loadStats();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to clear data' });
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      setMessage({ type: 'error', text: 'Failed to clear data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Setup & Testing</h1>
          <p className="text-muted-foreground mt-1">
            Manage blog data and test the blog system functionality
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadStats} disabled={loading}>
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Link href="/admin/blog">
            <Button variant="outline">
              Back to Blog Admin
            </Button>
          </Link>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : (
            <AlertCircleIcon className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Posts</h3>
            <p className="text-2xl font-bold text-foreground">{stats.stats.totalPosts}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
            <p className="text-2xl font-bold text-green-600">{stats.stats.publishedPosts}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.stats.totalCategories}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.stats.totalTags}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Setup</h2>
          <p className="text-muted-foreground mb-6">
            Create sample blog posts and categories to test the blog functionality.
          </p>
          <Button 
            onClick={createSampleData} 
            disabled={loading}
            className="w-full"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Sample Data
          </Button>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Reset Data</h2>
          <p className="text-muted-foreground mb-6">
            Clear all blog posts for testing purposes. Categories will remain.
          </p>
          <Button 
            variant="destructive" 
            onClick={clearAllData} 
            disabled={loading}
            className="w-full"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Clear All Posts
          </Button>
        </div>
      </div>

      {/* Current Posts */}
      {stats && stats.samplePosts.length > 0 && (
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Current Blog Posts</h2>
          <div className="space-y-3">
            {stats.samplePosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-foreground">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>/{post.slug}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <span>{post.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={post.url} target="_blank">
                    <Button variant="ghost" size="sm">
                      <ExternalLinkIcon className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {stats && stats.categories.length > 0 && (
        <div className="bg-card p-6 rounded-lg border mt-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Available Categories</h2>
          <div className="flex flex-wrap gap-2">
            {stats.categories.map((category, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {category.name} ({category.slug})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Testing Instructions */}
      <div className="bg-muted/50 p-6 rounded-lg border mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Testing Instructions</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong>1. Create Sample Data:</strong> Click "Create Sample Data" to generate test blog posts and categories.</p>
          <p><strong>2. Test Blog Navigation:</strong> Visit <Link href="/blog" className="text-primary hover:underline">/blog</Link> to see the blog listing page.</p>
          <p><strong>3. Test Blog Detail Pages:</strong> Click on any blog post card to view the detail page.</p>
          <p><strong>4. Test Admin Functions:</strong> Go to <Link href="/admin/blog" className="text-primary hover:underline">/admin/blog</Link> to manage posts.</p>
          <p><strong>5. Create New Posts:</strong> Use <Link href="/admin/blog/create" className="text-primary hover:underline">/admin/blog/create</Link> to add new content.</p>
        </div>
      </div>
    </div>
  );
}
