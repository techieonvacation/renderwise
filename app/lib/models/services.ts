import { z } from "zod";
import { ObjectId } from "mongodb";

// Service feature schema for individual service items
export const ServiceFeatureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon name is required"),
  image: z.string().min(1, "Image URL is required"),
  bulletPoints: z.array(z.string().min(1, "Bullet point cannot be empty")),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional().default(true),
});

// Services section configuration schema
export const ServicesConfigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  highlight: z.string().min(1, "Highlight text is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(ServiceFeatureSchema),
  showNavigation: z.boolean().optional().default(true),
  showAutoplay: z.boolean().optional().default(true),
  autoplaySpeed: z.number().int().min(1000).max(10000).optional().default(3000),
  slidesToShow: z.number().int().min(1).max(6).optional().default(4),
  slidesToScroll: z.number().int().min(1).max(3).optional().default(1),
  showDots: z.boolean().optional().default(false),
  showArrows: z.boolean().optional().default(true),
  enableHoverEffects: z.boolean().optional().default(true),
  enableFlipAnimation: z.boolean().optional().default(true),
  enableProgressAnimation: z.boolean().optional().default(true),
});

// MongoDB document interface
export interface ServicesDocument {
  _id?: ObjectId;
  id: string;
  config: z.infer<typeof ServicesConfigSchema>;
  createdAt: string;
  updatedAt: string;
  version: number;
}

// TypeScript interfaces for type safety
export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
  image: string;
  bulletPoints: string[];
  order?: number;
  isActive?: boolean;
}

export interface ServicesConfig {
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  showNavigation?: boolean;
  showAutoplay?: boolean;
  autoplaySpeed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  showDots?: boolean;
  showArrows?: boolean;
  enableHoverEffects?: boolean;
  enableFlipAnimation?: boolean;
  enableProgressAnimation?: boolean;
}

// Default services configuration with all the current services
export const DEFAULT_SERVICES_CONFIG: ServicesConfig = {
  title: "Customized Solutions to Meet Client's",
  highlight: "Needs",
  subtitle: "Our Services",
  description:
    "We specialize in crafting custom platforms that elevate your online presence. Let us help you thrive in the digital landscape!",
  features: [
    {
      title: "Web Development",
      description:
        "Build scalable minimum viable products with modern technologies to validate your business ideas quickly and efficiently.",
      icon: "Code2",
      image: "/images/home/web-dev.webp",
      bulletPoints: [
        "Custom web application development",
        "Progressive Web Apps (PWA)",
        "Full-stack development",
        "API development & integration",
        "Database design & optimization",
      ],
      order: 1,
      isActive: true,
    },
    {
      title: "Mobile App Development",
      description:
        "Create powerful, modern web applications and solutions using cutting-edge technologies and best practices.",
      icon: "Globe",
      image: "/images/home/mbl-app-dev.webp",
      bulletPoints: [
        "Native iOS & Android development",
        "Cross-platform development",
        "App maintenance & support",
        "UI/UX design for mobile",
        "App store optimization",
      ],
      order: 2,
      isActive: true,
    },
    {
      title: "On Demand App Development",
      description:
        "Develop native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: "Smartphone",
      image: "/images/home/custom-dev.webp",
      bulletPoints: [
        "Custom app solutions",
        "Real-time tracking features",
        "Payment gateway integration",
        "Push notification system",
        "Analytics implementation",
      ],
      order: 3,
      isActive: true,
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Build custom online store solutions with secure payment integration and seamless user experience.",
      icon: "ShoppingCart",
      image: "/images/home/ecommerce.webp",
      bulletPoints: [
        "Custom e-commerce platforms",
        "Payment gateway integration",
        "Inventory management systems",
        "Shopping cart optimization",
        "Order tracking system",
      ],
      order: 4,
      isActive: true,
    },
    {
      title: "UI/UX Design",
      description:
        "Design and implement scalable cloud infrastructure that grows with your business needs.",
      icon: "Cloud",
      image: "/images/home/ui-ux-design.webp",
      bulletPoints: [
        "User interface design",
        "User experience optimization",
        "Wireframing & prototyping",
        "Design system creation",
        "Usability testing",
      ],
      order: 5,
      isActive: true,
    },
    {
      title: "SEO Services",
      description:
        "Streamline your development workflow with continuous integration and deployment automation solutions.",
      icon: "Settings",
      image: "/images/home/seo-services.webp",
      bulletPoints: [
        "Keyword research & analysis",
        "On-page optimization",
        "Technical SEO audit",
        "Content optimization",
        "Link building strategies",
      ],
      order: 6,
      isActive: true,
    },
    {
      title: "Content Writing",
      description:
        "Implement robust security measures to protect your applications and data in the cloud environment.",
      icon: "Shield",
      image: "/images/home/content-writing.webp",
      bulletPoints: [
        "Blog post writing",
        "Website content creation",
        "Technical writing",
        "SEO content optimization",
        "Content strategy planning",
      ],
      order: 7,
      isActive: true,
    },
    {
      title: "Influencer Marketing",
      description:
        "Create efficient and scalable network architectures that support your business operations.",
      icon: "Network",
      image: "/images/home/influencer-marketing.webp",
      bulletPoints: [
        "Influencer identification",
        "Campaign planning",
        "Performance tracking",
        "Content collaboration",
        "ROI analysis",
      ],
      order: 8,
      isActive: true,
    },
    {
      title: "RFP Management Solutions",
      description:
        "Streamline your Request for Proposal process with our comprehensive management system, ensuring efficient bid responses and proposal tracking.",
      icon: "MessageSquare",
      image: "/images/home/rpf-management.webp",
      bulletPoints: [
        "RFP process automation",
        "Proposal template creation",
        "Bid tracking system",
        "Document management",
        "Analytics & reporting",
      ],
      order: 9,
      isActive: true,
    },
    {
      title: "SMS API Integration",
      description:
        "Integrate powerful SMS capabilities into your applications with our reliable API solutions, enabling seamless communication with your customers.",
      icon: "MessageCircle",
      image: "/images/home/sms-api.webp",
      bulletPoints: [
        "API integration setup",
        "Bulk SMS capabilities",
        "Delivery tracking",
        "Message scheduling",
        "Custom SMS templates",
      ],
      order: 10,
      isActive: true,
    },
    {
      title: "SMS Bundle Services",
      description:
        "Cost-effective bulk SMS packages designed for businesses of all sizes, with high delivery rates and comprehensive analytics.",
      icon: "Package",
      image: "/images/home/sms-bundle.webp",
      bulletPoints: [
        "Customized SMS packages",
        "High delivery rates",
        "Analytics dashboard",
        "Message personalization",
        "Campaign management",
      ],
      order: 11,
      isActive: true,
    },
    {
      title: "WhatsApp Business API",
      description:
        "Enhance customer engagement with official WhatsApp Business API integration, enabling automated responses and personalized messaging at scale.",
      icon: "MessageSquareMore",
      image: "/images/home/wp-bussiness-api.webp",
      bulletPoints: [
        "API setup & configuration",
        "Automated responses",
        "Message templates",
        "Chat automation",
        "Analytics & reporting",
      ],
      order: 12,
      isActive: true,
    },
    {
      title: "Social Media Automation",
      description:
        "Optimize your social media presence with intelligent automation tools for scheduling, analytics, and engagement management across platforms.",
      icon: "Share2",
      image: "/images/home/social-media-auto.webp",
      bulletPoints: [
        "Content scheduling",
        "Analytics tracking",
        "Engagement automation",
        "Cross-platform posting",
        "Performance reporting",
      ],
      order: 13,
      isActive: true,
    },
    {
      title: "Email Marketing Automation",
      description:
        "Deploy sophisticated email campaigns with advanced automation, segmentation, and analytics to drive engagement and conversions.",
      icon: "Mail",
      image: "/images/home/email-mark-auto.webp",
      bulletPoints: [
        "Campaign automation",
        "Email template design",
        "List segmentation",
        "A/B testing",
        "Performance analytics",
      ],
      order: 14,
      isActive: true,
    },
  ],
  showNavigation: true,
  showAutoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  showDots: false,
  showArrows: true,
  enableHoverEffects: true,
  enableFlipAnimation: true,
  enableProgressAnimation: true,
};

// Available icon options for the CMS
export const AVAILABLE_ICONS = [
  "Code2",
  "Cloud",
  "Globe",
  "Smartphone",
  "ShoppingCart",
  "Shield",
  "Settings",
  "Network",
  "MessageSquare",
  "MessageCircle",
  "Package",
  "MessageSquareMore",
  "Share2",
  "Mail",
  "Code",
  "Palette",
  "Server",
  "GitBranch",
  "Database",
  "Zap",
  "Users",
  "BarChart3",
  "TrendingUp",
  "Target",
  "Rocket",
  "Lightbulb",
  "Star",
  "Heart",
  "Award",
  "CheckCircle",
] as const;

export type AvailableIcon = (typeof AVAILABLE_ICONS)[number];
