import { LucideIcons } from "../Icon";
import { NavItem, SocialIcon } from "./Navbar.types";

export const NAVBAR_CONFIG = {
  mainNavItems: [
    { name: "Home", href: "/", icon: LucideIcons.Home },
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Web Development",
          href: "/services/web-development",
          description: "Custom web applications and websites",
          icon: LucideIcons.Code,
        },
        {
          name: "Cloud Solutions",
          href: "/services/cloud",
          description: "Scalable cloud infrastructure",
          icon: LucideIcons.Cloud,
        },
        {
          name: "AI & Machine Learning",
          href: "/services/ai-ml",
          description: "Intelligent automation solutions",
          icon: LucideIcons.Brain,
        },
        {
          name: "Mobile Development",
          href: "/services/mobile",
          description: "iOS and Android applications",
          icon: LucideIcons.Zap,
        },
        {
          name: "DevOps & Security",
          href: "/services/devops",
          description: "Secure deployment pipelines",
          icon: LucideIcons.Shield,
        },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Enterprise Software",
          href: "/solutions/enterprise",
          description: "Large-scale business solutions",
          icon: LucideIcons.Layers,
        },
        {
          name: "E-commerce Platforms",
          href: "/solutions/ecommerce",
          description: "Online store development",
          icon: LucideIcons.Globe,
        },
        {
          name: "SaaS Products",
          href: "/solutions/saas",
          description: "Software as a Service solutions",
          icon: LucideIcons.Rocket,
        },
        {
          name: "API Development",
          href: "/solutions/api",
          description: "Robust API architectures",
          icon: LucideIcons.Settings,
        },
      ],
    },
    { name: "About", href: "/about", icon: LucideIcons.Users },
    { name: "Portfolio", href: "/portfolio", icon: LucideIcons.Award },
    { name: "Blog", href: "/blog", icon: LucideIcons.MessageCircle },
    { name: "Contact", href: "/contact", icon: LucideIcons.Mail },
  ] as NavItem[],
  secondaryNavItems: [
    { name: "Career", href: "/careers", icon: LucideIcons.Briefcase },
    { name: "Support", href: "/support", icon: LucideIcons.MessageCircle },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ] as NavItem[],
  socialIcons: [
    {
      icon: LucideIcons.Github,
      href: "https://github.com",
      label: "GitHub",
      external: true,
    },
    {
      icon: LucideIcons.Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      external: true,
    },
    {
      icon: LucideIcons.Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      external: true,
    },
    {
      icon: LucideIcons.Mail,
      href: "mailto:contact@renderwise.com",
      label: "Email",
      external: true,
    },
  ] as SocialIcon[],
  showSearch: true,
  showThemeToggle: true,
  showConsultation: true,
  companyName: "Renderwise",
};
