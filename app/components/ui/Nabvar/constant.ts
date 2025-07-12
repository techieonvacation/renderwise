/**
 * Enhanced Navbar Configuration
 *
 * Comprehensive configuration for the Renderwise navbar including:
 * - Advanced sub-menu layouts with grouping
 * - Detailed service descriptions
 * - Dynamic icon assignments
 * - Footer configurations for sub-menus
 * - Backward compatibility with existing structure
 */

import { NavItem, SocialIcon } from "./Navbar.types";

export const NAVBAR_CONFIG = {
  mainNavItems: [
    {
      name: "Home",
      href: "/",
      icon: "Home",
    },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      layout: "grouped",
      subMenuHeading: ["Development", "Infrastructure", "Design"],
      subMenu: [
        // Development Group
        {
          name: "Web Development",
          href: "/services/web-development",
          desc: "Modern, responsive websites built with cutting-edge technologies and frameworks",
          iconName: "Code" as const,
          group: "Development",
        },
        {
          name: "Mobile Development",
          href: "/services/mobile",
          desc: "Native iOS and Android applications with cross-platform solutions",
          iconName: "Smartphone" as const,
          group: "Development",
        },
        {
          name: "API Development",
          href: "/services/api",
          desc: "Robust RESTful and GraphQL APIs with comprehensive documentation",
          iconName: "Server" as const,
          group: "Development",
        },
        {
          name: "Custom Software",
          href: "/services/custom-software",
          desc: "Tailored software solutions for unique business requirements",
          iconName: "Wrench" as const,
          group: "Development",
        },
        // Infrastructure Group
        {
          name: "Cloud Solutions",
          href: "/services/cloud",
          desc: "Scalable cloud infrastructure with AWS, Azure, and Google Cloud",
          iconName: "Cloud" as const,
          group: "Infrastructure",
        },
        {
          name: "DevOps & CI/CD",
          href: "/services/devops",
          desc: "Automated deployment pipelines and infrastructure as code",
          iconName: "GitBranch" as const,
          group: "Infrastructure",
        },
        {
          name: "Security & Compliance",
          href: "/services/security",
          desc: "Comprehensive security audits and compliance implementations",
          iconName: "Shield" as const,
          group: "Infrastructure",
        },
        {
          name: "Database Design",
          href: "/services/database",
          desc: "Optimized database architecture and migration services",
          iconName: "Database" as const,
          group: "Infrastructure",
        },
        // Design Group
        {
          name: "UI/UX Design",
          href: "/services/ui-ux",
          desc: "Beautiful and intuitive user experiences with modern design principles",
          iconName: "Palette" as const,
          group: "Design",
        },
        {
          name: "Brand Identity",
          href: "/services/branding",
          desc: "Complete brand identity development and visual design systems",
          iconName: "Brush" as const,
          group: "Design",
        },
        {
          name: "Prototyping",
          href: "/services/prototyping",
          desc: "Interactive prototypes and wireframes for user testing",
          iconName: "Layers" as const,
          group: "Design",
        },
      ],
      footerText: "Explore All Services",
      footerLink: "/services",
    },
    {
      name: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      layout: "grouped",
      subMenuHeading: ["Enterprise", "E-commerce", "Specialized"],
      subMenu: [
        // Enterprise Group
        {
          name: "Enterprise Software",
          href: "/solutions/enterprise",
          desc: "Large-scale business solutions with enterprise-grade security",
          iconName: "Building" as const,
          group: "Enterprise",
        },
        {
          name: "CRM Systems",
          href: "/solutions/crm",
          desc: "Customer relationship management platforms and integrations",
          iconName: "Users" as const,
          group: "Enterprise",
        },
        {
          name: "ERP Solutions",
          href: "/solutions/erp",
          desc: "Enterprise resource planning systems for streamlined operations",
          iconName: "Settings" as const,
          group: "Enterprise",
        },
        {
          name: "Business Intelligence",
          href: "/solutions/bi",
          desc: "Data analytics and reporting dashboards for informed decisions",
          iconName: "BarChart3" as const,
          group: "Enterprise",
        },
        // E-commerce Group
        {
          name: "E-commerce Platforms",
          href: "/solutions/ecommerce",
          desc: "Custom online stores with payment gateway integrations",
          iconName: "ShoppingCart" as const,
          group: "E-commerce",
        },
        {
          name: "Marketplace Solutions",
          href: "/solutions/marketplace",
          desc: "Multi-vendor marketplaces with advanced seller management",
          iconName: "Store" as const,
          group: "E-commerce",
        },
        {
          name: "Payment Systems",
          href: "/solutions/payments",
          desc: "Secure payment processing and financial transaction systems",
          iconName: "CreditCard" as const,
          group: "E-commerce",
        },
        // Specialized Group
        {
          name: "SaaS Products",
          href: "/solutions/saas",
          desc: "Software as a Service platforms with subscription management",
          iconName: "Rocket" as const,
          group: "Specialized",
        },
        {
          name: "AI & Machine Learning",
          href: "/solutions/ai-ml",
          desc: "Intelligent automation and predictive analytics solutions",
          iconName: "Brain" as const,
          group: "Specialized",
        },
        {
          name: "IoT Solutions",
          href: "/solutions/iot",
          desc: "Internet of Things applications and device management",
          iconName: "Wifi" as const,
          group: "Specialized",
        },
        {
          name: "Blockchain Development",
          href: "/solutions/blockchain",
          desc: "Decentralized applications and smart contract development",
          iconName: "Link" as const,
          group: "Specialized",
        },
      ],
      footerText: "View All Solutions",
      footerLink: "/solutions",
    },
    {
      name: "About",
      href: "/about",
      icon: "Users",
      hasDropdown: true,
      gridCols: 2,
      subMenu: [
        {
          name: "Our Story",
          href: "/about/story",
          desc: "Learn about our journey and mission to deliver exceptional solutions",
          iconName: "Book" as const,
        },
        {
          name: "Our Team",
          href: "/about/team",
          desc: "Meet the talented professionals behind our success",
          iconName: "Users" as const,
        },
        {
          name: "Careers",
          href: "/careers",
          desc: "Join our team and build the future of technology together",
          iconName: "Briefcase" as const,
        },
        {
          name: "Culture & Values",
          href: "/about/culture",
          desc: "Discover our core values and company culture",
          iconName: "Heart" as const,
        },
      ],
    },
    {
      name: "Portfolio",
      href: "/portfolio",
      icon: "Award",
      hasDropdown: true,
      gridCols: 1,
      subMenu: [
        {
          name: "Featured Projects",
          href: "/portfolio/featured",
          desc: "Showcase of our most impactful and innovative projects",
          iconName: "Star" as const,
        },
        {
          name: "Case Studies",
          href: "/portfolio/case-studies",
          desc: "In-depth analysis of our successful project implementations",
          iconName: "FileText" as const,
        },
        {
          name: "Client Testimonials",
          href: "/portfolio/testimonials",
          desc: "What our clients say about working with us",
          iconName: "MessageSquare" as const,
        },
        {
          name: "Industries We Serve",
          href: "/portfolio/industries",
          desc: "Explore our expertise across various industry sectors",
          iconName: "Globe" as const,
        },
      ],
    },
    {
      name: "Blog",
      href: "/blog",
      icon: "MessageCircle",
      hasDropdown: true,
      gridCols: 2,
      subMenu: [
        {
          name: "Technical Insights",
          href: "/blog/technical",
          desc: "Deep dives into the latest technologies and development practices",
          iconName: "Code2" as const,
        },
        {
          name: "Industry Trends",
          href: "/blog/trends",
          desc: "Analysis of current trends and future predictions in tech",
          iconName: "TrendingUp" as const,
        },
        {
          name: "Best Practices",
          href: "/blog/best-practices",
          desc: "Proven methodologies and strategies for successful projects",
          iconName: "CheckCircle" as const,
        },
        {
          name: "Company News",
          href: "/blog/news",
          desc: "Latest updates and announcements from Renderwise",
          iconName: "Newspaper" as const,
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact-us",
      icon: "Mail",
    },
  ] as NavItem[],

  secondaryNavItems: [
    {
      name: "Career",
      href: "/careers",
      icon: "Briefcase",
    },
    {
      name: "Support",
      href: "/support",
      icon: "MessageCircle",
      hasDropdown: true,
      gridCols: 1,
      subMenu: [
        {
          name: "Help Center",
          href: "/support/help",
          desc: "Find answers to frequently asked questions",
          iconName: "HelpCircle" as const,
        },
        {
          name: "Technical Support",
          href: "/support/technical",
          desc: "Get technical assistance for your projects",
          iconName: "Wrench" as const,
        },
        {
          name: "Contact Support",
          href: "/support/contact",
          desc: "Reach out to our support team directly",
          iconName: "Mail" as const,
        },
      ],
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
  ] as NavItem[],

  socialIcons: [
    {
      icon: "Github",
      href: "https://github.com/renderwise",
      label: "GitHub",
      external: true,
    },
    {
      icon: "Linkedin",
      href: "https://linkedin.com/company/renderwise",
      label: "LinkedIn",
      external: true,
    },
    {
      icon: "Twitter",
      href: "https://twitter.com/renderwise",
      label: "Twitter",
      external: true,
    },
    {
      icon: "Mail",
      href: "mailto:hello@renderwise.com",
      label: "Email",
      external: true,
    },
  ] as SocialIcon[],

  showSearch: true,
  showThemeToggle: true,
  showConsultation: true,
  companyName: "Renderwise",
};
