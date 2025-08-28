import { ObjectId, Collection } from "mongodb";
import { getCollection } from "../mongodb";
import {
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogComment,
  CreateBlogPostData,
  UpdateBlogPostData,
  CreateBlogCategoryData,
  UpdateBlogCategoryData,
  BlogSearchParams,
  BlogStatus,
  generateSlug,
  calculateReadingTime,
  extractExcerpt,
} from "../models/blog";

export class BlogService {
  private static async getBlogCollection(): Promise<Collection<BlogPost>> {
    return getCollection<BlogPost>("blogs");
  }

  private static async getCategoryCollection(): Promise<Collection<BlogCategory>> {
    return getCollection<BlogCategory>("blog_categories");
  }

  private static async getTagCollection(): Promise<Collection<BlogTag>> {
    return getCollection<BlogTag>("blog_tags");
  }

  private static async getCommentCollection(): Promise<Collection<BlogComment>> {
    return getCollection<BlogComment>("blog_comments");
  }

  // Blog Post CRUD Operations
  static async createBlogPost(data: CreateBlogPostData): Promise<BlogPost> {
    const collection = await this.getBlogCollection();
    
    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title);
    
    // Check if slug already exists
    const existingPost = await collection.findOne({ slug });
    if (existingPost) {
      throw new Error(`A blog post with slug "${slug}" already exists`);
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(data.content);

    // Auto-generate excerpt if not provided
    const excerpt = data.excerpt || extractExcerpt(data.content);

    // Get category details
    const categoryCollection = await this.getCategoryCollection();
    const category = await categoryCollection.findOne({ _id: new ObjectId(data.categoryId) });
    if (!category) {
      throw new Error("Invalid category ID");
    }

    // Process tags
    const tagCollection = await this.getTagCollection();
    const tags: BlogTag[] = [];
    
    for (const tagName of data.tags) {
      let tag = await tagCollection.findOne({ name: tagName });
      if (!tag) {
        // Create new tag
        const newTag: BlogTag = {
          name: tagName,
          slug: generateSlug(tagName),
          createdAt: new Date(),
        };
        const result = await tagCollection.insertOne(newTag);
        tag = { ...newTag, _id: result.insertedId };
      }
      tags.push(tag);
    }

    const blogPost: BlogPost = {
      title: data.title,
      slug,
      excerpt,
      content: data.content,
      featuredImage: data.featuredImage,
      author: data.author,
      category: {
        _id: category._id!,
        name: category.name,
        slug: category.slug,
        color: category.color || "#3B82F6", // Default color if not set
      },
      tags,
      status: data.status,
      publishedAt: data.status === BlogStatus.PUBLISHED ? (data.publishedAt || new Date()) : undefined,
      scheduledAt: data.scheduledAt,
      readingTime,
      views: 0,
      likes: 0,
      seo: data.seo || {},
      featured: data.featured || false,
      allowComments: data.allowComments !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(blogPost);
    return { ...blogPost, _id: result.insertedId };
  }

  static async updateBlogPost(data: UpdateBlogPostData): Promise<BlogPost> {
    const collection = await this.getBlogCollection();
    const postId = new ObjectId(data._id);

    const existingPost = await collection.findOne({ _id: postId });
    if (!existingPost) {
      throw new Error("Blog post not found");
    }

    const updateData: Partial<BlogPost> = {
      updatedAt: new Date(),
    };

    // Update title and slug
    if (data.title && data.title !== existingPost.title) {
      updateData.title = data.title;
      updateData.slug = data.slug || generateSlug(data.title);
      
      // Check if new slug conflicts with existing posts
      const slugConflict = await collection.findOne({ 
        slug: updateData.slug, 
        _id: { $ne: postId } 
      });
      if (slugConflict) {
        throw new Error(`A blog post with slug "${updateData.slug}" already exists`);
      }
    }

    // Update content and recalculate reading time
    if (data.content) {
      updateData.content = data.content;
      updateData.readingTime = calculateReadingTime(data.content);
      updateData.excerpt = data.excerpt || extractExcerpt(data.content);
    } else if (data.excerpt) {
      updateData.excerpt = data.excerpt;
    }

    // Update category
    if (data.categoryId && data.categoryId !== existingPost.category._id.toString()) {
      const categoryCollection = await this.getCategoryCollection();
      const category = await categoryCollection.findOne({ _id: new ObjectId(data.categoryId) });
      if (!category) {
        throw new Error("Invalid category ID");
      }
      updateData.category = {
        _id: category._id!,
        name: category.name,
        slug: category.slug,
        color: category.color || "#3B82F6", // Default color if not set
      };
    }

    // Update tags
    if (data.tags) {
      const tagCollection = await this.getTagCollection();
      const tags: BlogTag[] = [];
      
      for (const tagName of data.tags) {
        let tag = await tagCollection.findOne({ name: tagName });
        if (!tag) {
          const newTag: BlogTag = {
            name: tagName,
            slug: generateSlug(tagName),
            createdAt: new Date(),
          };
          const result = await tagCollection.insertOne(newTag);
          tag = { ...newTag, _id: result.insertedId };
        }
        tags.push(tag);
      }
      updateData.tags = tags;
    }

    // Handle status changes
    if (data.status && data.status !== existingPost.status) {
      updateData.status = data.status;
      if (data.status === BlogStatus.PUBLISHED && !existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    // Update other fields
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage;
    if (data.author) updateData.author = data.author;
    if (data.scheduledAt !== undefined) updateData.scheduledAt = data.scheduledAt;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.allowComments !== undefined) updateData.allowComments = data.allowComments;
    if (data.seo) updateData.seo = { ...existingPost.seo, ...data.seo };

    await collection.updateOne({ _id: postId }, { $set: updateData });
    
    const updatedPost = await collection.findOne({ _id: postId });
    if (!updatedPost) {
      throw new Error("Failed to retrieve updated blog post");
    }

    return updatedPost;
  }

  static async deleteBlogPost(id: string): Promise<boolean> {
    const collection = await this.getBlogCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    // Also delete associated comments
    const commentCollection = await this.getCommentCollection();
    await commentCollection.deleteMany({ blogId: new ObjectId(id) });
    
    return result.deletedCount > 0;
  }

  static async getBlogPost(slug: string): Promise<BlogPost | null> {
    const collection = await this.getBlogCollection();
    return collection.findOne({ slug });
  }

  static async getBlogPostById(id: string): Promise<BlogPost | null> {
    const collection = await this.getBlogCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  static async getBlogPosts(params: BlogSearchParams = {}) {
    const collection = await this.getBlogCollection();
    const {
      query,
      category,
      tags,
      status,
      author,
      featured,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    // Build filter query
    const filter: any = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      filter['category.slug'] = category;
    }

    if (tags && tags.length > 0) {
      filter['tags.name'] = { $in: tags };
    }

    if (status) {
      filter.status = status;
    }

    if (author) {
      filter['author.email'] = author;
    }

    if (featured !== undefined) {
      filter.featured = featured;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = dateFrom;
      if (dateTo) filter.createdAt.$lte = dateTo;
    }

    // Build sort options
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [posts, totalCount] = await Promise.all([
      collection
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static async incrementViews(slug: string): Promise<void> {
    const collection = await this.getBlogCollection();
    await collection.updateOne(
      { slug },
      { $inc: { views: 1 } }
    );
  }

  static async toggleLike(slug: string, increment: boolean = true): Promise<number> {
    const collection = await this.getBlogCollection();
    const result = await collection.findOneAndUpdate(
      { slug },
      { $inc: { likes: increment ? 1 : -1 } },
      { returnDocument: 'after' }
    );
    return result?.likes || 0;
  }

  // Category CRUD Operations
  static async createCategory(data: CreateBlogCategoryData): Promise<BlogCategory> {
    const collection = await this.getCategoryCollection();
    
    const slug = data.slug || generateSlug(data.name);
    
    // Check if slug already exists
    const existingCategory = await collection.findOne({ slug });
    if (existingCategory) {
      throw new Error(`A category with slug "${slug}" already exists`);
    }

    const category: BlogCategory = {
      name: data.name,
      slug,
      description: data.description,
      color: data.color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(category);
    return { ...category, _id: result.insertedId };
  }

  static async updateCategory(data: UpdateBlogCategoryData): Promise<BlogCategory> {
    const collection = await this.getCategoryCollection();
    const categoryId = new ObjectId(data._id);

    const updateData: Partial<BlogCategory> = {
      updatedAt: new Date(),
    };

    if (data.name) {
      updateData.name = data.name;
      updateData.slug = data.slug || generateSlug(data.name);
      
      // Check slug conflict
      const slugConflict = await collection.findOne({ 
        slug: updateData.slug, 
        _id: { $ne: categoryId } 
      });
      if (slugConflict) {
        throw new Error(`A category with slug "${updateData.slug}" already exists`);
      }
    }

    if (data.description !== undefined) updateData.description = data.description;
    if (data.color !== undefined) updateData.color = data.color;

    await collection.updateOne({ _id: categoryId }, { $set: updateData });
    
    const updatedCategory = await collection.findOne({ _id: categoryId });
    if (!updatedCategory) {
      throw new Error("Failed to retrieve updated category");
    }

    return updatedCategory;
  }

  static async deleteCategory(id: string): Promise<boolean> {
    const collection = await this.getCategoryCollection();
    
    // Check if category is used by any blog posts
    const blogCollection = await this.getBlogCollection();
    const postsUsingCategory = await blogCollection.countDocuments({
      'category._id': new ObjectId(id)
    });
    
    if (postsUsingCategory > 0) {
      throw new Error(`Cannot delete category. It is used by ${postsUsingCategory} blog post(s)`);
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async getCategories(): Promise<BlogCategory[]> {
    const collection = await this.getCategoryCollection();
    return collection.find({}).sort({ name: 1 }).toArray();
  }

  static async getCategoryById(id: string): Promise<BlogCategory | null> {
    const collection = await this.getCategoryCollection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  // Tag Operations
  static async getTags(): Promise<BlogTag[]> {
    const collection = await this.getTagCollection();
    return collection.find({}).sort({ name: 1 }).toArray();
  }

  static async getPopularTags(limit: number = 10): Promise<BlogTag[]> {
    const blogCollection = await this.getBlogCollection();
    const pipeline = [
      { $unwind: '$tags' },
      { $group: { _id: '$tags._id', count: { $sum: 1 }, tag: { $first: '$tags' } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $replaceRoot: { newRoot: '$tag' } }
    ];
    
    return blogCollection.aggregate(pipeline).toArray() as Promise<BlogTag[]>;
  }

  // Featured Posts
  static async getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
    const collection = await this.getBlogCollection();
    return collection
      .find({ featured: true, status: BlogStatus.PUBLISHED })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();
  }

  // Related Posts
  static async getRelatedPosts(postId: string, limit: number = 4): Promise<BlogPost[]> {
    const collection = await this.getBlogCollection();
    const post = await collection.findOne({ _id: new ObjectId(postId) });
    
    if (!post) return [];

    return collection
      .find({
        _id: { $ne: new ObjectId(postId) },
        status: BlogStatus.PUBLISHED,
        $or: [
          { 'category._id': post.category._id },
          { 'tags.name': { $in: post.tags.map(tag => tag.name) } }
        ]
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();
  }

  // Analytics
  static async getBlogStats() {
    const blogCollection = await this.getBlogCollection();
    const categoryCollection = await this.getCategoryCollection();
    const tagCollection = await this.getTagCollection();

    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalTags,
      totalViews,
      totalLikes
    ] = await Promise.all([
      blogCollection.countDocuments({}),
      blogCollection.countDocuments({ status: BlogStatus.PUBLISHED }),
      blogCollection.countDocuments({ status: BlogStatus.DRAFT }),
      categoryCollection.countDocuments({}),
      tagCollection.countDocuments({}),
      blogCollection.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]).toArray().then(result => result[0]?.total || 0),
      blogCollection.aggregate([
        { $group: { _id: null, total: { $sum: '$likes' } } }
      ]).toArray().then(result => result[0]?.total || 0),
    ]);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalTags,
      totalViews,
      totalLikes,
    };
  }
}
