import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/app/lib/services/blogService";
import { BlogStatus } from "@/app/lib/models/blog";

// Test endpoint to create sample blog data
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === "create-sample-data") {
      // Create sample categories first
      const categories = [
        {
          name: "Technology",
          slug: "technology",
          description: "Latest in tech trends and innovations",
          color: "#3B82F6"
        },
        {
          name: "Web Development",
          slug: "web-development", 
          description: "Frontend and backend development insights",
          color: "#10B981"
        },
        {
          name: "Digital Transformation",
          slug: "digital-transformation",
          description: "Business digitalization strategies",
          color: "#8B5CF6"
        }
      ];

      const createdCategories = [];
      for (const categoryData of categories) {
        try {
          const category = await BlogService.createCategory(categoryData);
          createdCategories.push(category);
        } catch (error) {
          // Category might already exist, try to get it
          const existingCategories = await BlogService.getCategories();
          const existing = existingCategories.find(c => c.slug === categoryData.slug);
          if (existing) {
            createdCategories.push(existing);
          }
        }
      }

      // Create sample blog posts
      const samplePosts = [
        {
          title: "Getting Started with Next.js 14",
          excerpt: "Learn how to build modern web applications with Next.js 14 and its latest features including Server Components and improved performance.",
          content: `
            <h2>Introduction to Next.js 14</h2>
            <p>Next.js 14 brings exciting new features that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your projects.</p>
            
            <h3>Key Features</h3>
            <ul>
              <li>Improved Server Components performance</li>
              <li>Enhanced Turbopack support</li>
              <li>Better TypeScript integration</li>
              <li>Optimized bundling and caching</li>
            </ul>
            
            <h3>Getting Started</h3>
            <p>To create a new Next.js 14 project, simply run:</p>
            <pre><code>npx create-next-app@latest my-app</code></pre>
            
            <p>This will set up a new project with all the latest features and best practices built-in.</p>
            
            <h3>Server Components</h3>
            <p>One of the most significant improvements in Next.js 14 is the enhanced Server Components support. These components run on the server, reducing the JavaScript bundle size sent to the client and improving initial page load times.</p>
            
            <h3>Conclusion</h3>
            <p>Next.js 14 represents a major step forward in React development, offering improved performance, better developer experience, and more powerful features for building modern web applications.</p>
          `,
          author: {
            name: "John Doe",
            email: "john@renderwise.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          },
          categoryId: createdCategories.find(c => c.slug === "web-development")?._id?.toString() || "",
          tags: ["Next.js", "React", "Web Development", "JavaScript"],
          status: BlogStatus.PUBLISHED,
          featured: true,
          allowComments: true,
          seo: {
            metaTitle: "Getting Started with Next.js 14 - Complete Guide",
            metaDescription: "Learn how to build modern web applications with Next.js 14 and its latest features including Server Components and improved performance.",
            metaKeywords: ["Next.js", "React", "Web Development", "JavaScript", "Server Components"]
          }
        },
        {
          title: "The Future of AI in Software Development",
          excerpt: "Explore how artificial intelligence is transforming the software development landscape and what it means for developers in 2024 and beyond.",
          content: `
            <h2>AI Revolution in Development</h2>
            <p>Artificial Intelligence is reshaping how we approach software development, from code generation to testing and deployment. This transformation is not just changing tools—it's revolutionizing the entire development process.</p>
            
            <h3>Current AI Tools for Developers</h3>
            <ul>
              <li><strong>GitHub Copilot:</strong> AI-powered code completion and generation</li>
              <li><strong>ChatGPT:</strong> Code explanation and problem-solving assistance</li>
              <li><strong>Tabnine:</strong> Intelligent code predictions</li>
              <li><strong>DeepCode:</strong> AI-powered code review and bug detection</li>
            </ul>
            
            <h3>Impact on Development Workflows</h3>
            <p>AI tools are significantly improving developer productivity by:</p>
            <ul>
              <li>Reducing time spent on boilerplate code</li>
              <li>Providing instant code reviews and suggestions</li>
              <li>Helping with debugging and error resolution</li>
              <li>Generating documentation automatically</li>
            </ul>
            
            <h3>Challenges and Considerations</h3>
            <p>While AI brings many benefits, developers should be aware of potential challenges:</p>
            <ul>
              <li>Code quality and security concerns</li>
              <li>Over-reliance on AI-generated solutions</li>
              <li>Need for human oversight and validation</li>
              <li>Intellectual property and licensing issues</li>
            </ul>
            
            <h3>The Future Outlook</h3>
            <p>As AI continues to evolve, we can expect even more sophisticated tools that will further enhance the development experience. The key is to embrace these technologies while maintaining critical thinking and code quality standards.</p>
          `,
          author: {
            name: "Jane Smith",
            email: "jane@renderwise.com",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          },
          categoryId: createdCategories.find(c => c.slug === "technology")?._id?.toString() || "",
          tags: ["AI", "Machine Learning", "Software Development", "Future Tech"],
          status: BlogStatus.PUBLISHED,
          featured: false,
          allowComments: true,
          seo: {
            metaTitle: "The Future of AI in Software Development - 2024 Trends",
            metaDescription: "Explore how artificial intelligence is transforming the software development landscape and what it means for developers in 2024 and beyond.",
            metaKeywords: ["AI", "Artificial Intelligence", "Software Development", "Machine Learning", "Developer Tools"]
          }
        },
        {
          title: "Digital Transformation Strategies for Modern Businesses",
          excerpt: "Discover proven strategies for successfully implementing digital transformation initiatives in your organization and staying competitive in the digital age.",
          content: `
            <h2>Understanding Digital Transformation</h2>
            <p>Digital transformation is more than just adopting new technologies—it's a fundamental shift in how businesses operate, deliver value to customers, and stay competitive in an increasingly digital world.</p>
            
            <h3>Key Components of Digital Transformation</h3>
            <ul>
              <li><strong>Technology Infrastructure:</strong> Cloud computing, APIs, and modern architectures</li>
              <li><strong>Data and Analytics:</strong> Data-driven decision making and insights</li>
              <li><strong>Customer Experience:</strong> Digital touchpoints and personalization</li>
              <li><strong>Organizational Culture:</strong> Agile mindset and continuous learning</li>
            </ul>
            
            <h3>Implementation Strategy</h3>
            <p>Successful digital transformation requires a structured approach:</p>
            
            <h4>1. Assessment and Planning</h4>
            <p>Start by evaluating your current state and defining clear objectives for the transformation journey.</p>
            
            <h4>2. Technology Modernization</h4>
            <p>Upgrade legacy systems and adopt cloud-native solutions that provide scalability and flexibility.</p>
            
            <h4>3. Data Integration</h4>
            <p>Create a unified data ecosystem that enables real-time insights and informed decision-making.</p>
            
            <h4>4. Change Management</h4>
            <p>Invest in training and support to help employees adapt to new processes and technologies.</p>
            
            <h3>Common Challenges</h3>
            <ul>
              <li>Resistance to change from employees</li>
              <li>Legacy system integration complexities</li>
              <li>Budget constraints and ROI concerns</li>
              <li>Skills gaps and talent shortage</li>
            </ul>
            
            <h3>Measuring Success</h3>
            <p>Track key metrics such as operational efficiency, customer satisfaction, revenue growth, and employee engagement to measure the success of your digital transformation initiatives.</p>
          `,
          author: {
            name: "Mike Johnson",
            email: "mike@renderwise.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          categoryId: createdCategories.find(c => c.slug === "digital-transformation")?._id?.toString() || "",
          tags: ["Digital Transformation", "Business Strategy", "Technology", "Innovation"],
          status: BlogStatus.PUBLISHED,
          featured: true,
          allowComments: true,
          seo: {
            metaTitle: "Digital Transformation Strategies for Modern Businesses",
            metaDescription: "Discover proven strategies for successfully implementing digital transformation initiatives in your organization and staying competitive in the digital age.",
            metaKeywords: ["Digital Transformation", "Business Strategy", "Technology Innovation", "Enterprise Solutions"]
          }
        }
      ];

      const createdPosts = [];
      for (const postData of samplePosts) {
        try {
          const post = await BlogService.createBlogPost(postData);
          createdPosts.push(post);
        } catch (error) {
          console.error("Error creating post:", error);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Sample data created successfully",
        data: {
          categories: createdCategories.length,
          posts: createdPosts.length,
          createdPosts: createdPosts.map(p => ({
            title: p.title,
            slug: p.slug,
            status: p.status
          }))
        }
      });
    }

    if (action === "clear-all-data") {
      // This is for testing purposes only - be careful with this in production
      const allPosts = await BlogService.getBlogPosts({ limit: 1000 });
      const deletedPosts = [];
      
      for (const post of allPosts.posts) {
        if (post._id) {
          await BlogService.deleteBlogPost(post._id.toString());
          deletedPosts.push(post.title);
        }
      }

      return NextResponse.json({
        success: true,
        message: "All blog data cleared",
        data: {
          deletedPosts: deletedPosts.length
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: "Invalid action. Use 'create-sample-data' or 'clear-all-data'"
    }, { status: 400 });

  } catch (error) {
    console.error("Error in test setup:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}

// Get current blog stats
export async function GET() {
  try {
    const stats = await BlogService.getBlogStats();
    const allPosts = await BlogService.getBlogPosts({ limit: 10 });
    const categories = await BlogService.getCategories();

    return NextResponse.json({
      success: true,
      data: {
        stats,
        samplePosts: allPosts.posts.map(p => ({
          title: p.title,
          slug: p.slug,
          status: p.status,
          category: p.category.name,
          url: `/blog/${p.slug}`
        })),
        categories: categories.map(c => ({
          name: c.name,
          slug: c.slug
        }))
      }
    });
  } catch (error) {
    console.error("Error getting blog stats:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}
