import { ObjectId } from "mongodb";

// Blog post status enum
export enum BlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

// Blog category interface
export interface BlogCategory {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog tag interface
export interface BlogTag {
  _id?: ObjectId;
  name: string;
  slug: string;
  createdAt: Date;
}

// SEO metadata interface
export interface BlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

// Blog post interface
export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  category: {
    _id: ObjectId;
    name: string;
    slug: string;
    color: string;
  };
  tags: BlogTag[];
  status: BlogStatus;
  publishedAt?: Date;
  scheduledAt?: Date;
  readingTime: number; // in minutes
  views: number;
  likes: number;
  seo: BlogSEO;
  featured: boolean;
  allowComments: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Blog comment interface
export interface BlogComment {
  _id?: ObjectId;
  blogId: ObjectId;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  parentId?: ObjectId; // for nested comments
  approved: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API response interfaces
export interface BlogPostResponse {
  success: boolean;
  data?: BlogPost;
  message?: string;
  error?: string;
}

export interface BlogPostsResponse {
  success: boolean;
  data?: {
    posts: BlogPost[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalPosts: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message?: string;
  error?: string;
}

export interface BlogCategoriesResponse {
  success: boolean;
  data?: BlogCategory[];
  message?: string;
  error?: string;
}

export interface BlogTagsResponse {
  success: boolean;
  data?: BlogTag[];
  message?: string;
  error?: string;
}

// Form data interfaces for creating/updating
export interface CreateBlogPostData {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  categoryId: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: Date;
  scheduledAt?: Date;
  featured?: boolean;
  allowComments?: boolean;
  seo?: BlogSEO;
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  _id: string;
}

export interface CreateBlogCategoryData {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

export interface UpdateBlogCategoryData extends Partial<CreateBlogCategoryData> {
  _id: string;
}

// Search and filter interfaces
export interface BlogSearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  status?: BlogStatus;
  author?: string;
  featured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'title' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .trim(); // Remove any remaining whitespace
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

// Validation schemas
export const blogPostValidation = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  slug: {
    required: true,
    pattern: /^[a-z0-9-]+$/,
    maxLength: 200,
  },
  excerpt: {
    required: true,
    minLength: 10,
    maxLength: 300,
  },
  content: {
    required: true,
    minLength: 50,
  },
  categoryId: {
    required: true,
  },
  author: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
};

export const blogCategoryValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  slug: {
    required: true,
    pattern: /^[a-z0-9-]+$/,
    maxLength: 50,
  },
  description: {
    maxLength: 200,
  },
};
