import { Metadata } from "next";

// Base metadata configuration for all services
export const BASE_SERVICES_METADATA: Partial<Metadata> = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  authors: [{ name: "Eleservsoftech Team" }],
  creator: "Eleservsoftech",
  publisher: "Eleservsoftech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://eleservsoftech.vercel.app"
  ),
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    siteName: "Eleservsoftech",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Eleservsoftech",
    creator: "@Eleservsoftech",
  },
};

// IT Staffing Service Metadata
export const IT_STAFFING_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "IT Staffing Services | Professional IT Recruitment | Eleservsoftech",
  description:
    "Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent. Custom recruitment strategies, rapid placement, and ongoing support.",
  keywords: [
    "IT staffing",
    "IT recruitment",
    "tech talent",
    "software developers",
    "IT professionals",
    "technology recruitment",
    "IT consulting",
    "staff augmentation",
    "contract IT staff",
    "permanent IT hiring",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title:
      "IT Staffing Services | Professional IT Recruitment | Eleservsoftech",
    description:
      "Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent.",
    url: "/services/it-staffing",
    images: [
      {
        url: "/images/itstaff_whychs.webp",
        width: 1200,
        height: 630,
        alt: "IT Staffing Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title:
      "IT Staffing Services | Professional IT Recruitment | Eleservsoftech",
    description:
      "Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent.",
    images: ["/images/itstaff_whychs.webp"],
  },
  alternates: {
    canonical: "/services/it-staffing",
  },
  other: {
    "DC.title": "IT Staffing Services",
    "DC.description": "Expert IT staffing solutions for businesses",
    "DC.subject": "IT Staffing, IT Recruitment, Tech Talent",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// QA Automation Service Metadata
export const QA_AUTOMATION_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "QA Automation Services | Test Automation Solutions | Eleservsoftech",
  description:
    "Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions. Boost your software quality and delivery speed.",
  keywords: [
    "QA automation",
    "test automation",
    "software testing",
    "automated testing",
    "CI/CD testing",
    "performance testing",
    "quality assurance",
    "test frameworks",
    "Selenium",
    "Cypress",
    "Jest",
    "Playwright",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title:
      "QA Automation Services | Test Automation Solutions | Eleservsoftech",
    description:
      "Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions.",
    url: "/services/qa-automation",
    images: [
      {
        url: "/images/home/artifical-intelligence.webp",
        width: 1200,
        height: 630,
        alt: "QA Automation Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title:
      "QA Automation Services | Test Automation Solutions | Eleservsoftech",
    description:
      "Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions.",
    images: ["/images/home/artifical-intelligence.webp"],
  },
  alternates: {
    canonical: "/services/qa-automation",
  },
  other: {
    "DC.title": "QA Automation Services",
    "DC.description":
      "Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions",
    "DC.subject":
      "QA Automation, Test Automation, Software Testing, Quality Assurance",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Flutter Development Service Metadata
export const FLUTTER_DEVELOPMENT_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title:
    "Flutter Development Services | Cross-Platform Mobile Apps | Eleservsoftech",
  description:
    "Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design for iOS and Android.",
  keywords: [
    "Flutter development",
    "cross-platform mobile apps",
    "mobile app development",
    "Flutter apps",
    "iOS development",
    "Android development",
    "mobile UI/UX",
    "Dart programming",
    "mobile app design",
    "app store optimization",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title:
      "Flutter Development Services | Cross-Platform Mobile Apps | Eleservsoftech",
    description:
      "Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design.",
    url: "/services/flutter",
    images: [
      {
        url: "/images/home/mbl-app-dev.webp",
        width: 1200,
        height: 630,
        alt: "Flutter Development Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title:
      "Flutter Development Services | Cross-Platform Mobile Apps | Eleservsoftech",
    description:
      "Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design.",
    images: ["/images/home/mbl-app-dev.webp"],
  },
  alternates: {
    canonical: "/services/flutter",
  },
  other: {
    "DC.title": "Flutter Development Services",
    "DC.description":
      "Expert Flutter development services for cross-platform mobile applications",
    "DC.subject":
      "Flutter Development, Cross-Platform Mobile Apps, Mobile App Development",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// System Integration Service Metadata
export const SYSTEM_INTEGRATION_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "System Integration Services | Enterprise Solutions | Eleservsoftech",
  description:
    "Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration solutions.",
  keywords: [
    "system integration",
    "enterprise integration",
    "API development",
    "data migration",
    "legacy system modernization",
    "enterprise solutions",
    "technology integration",
    "middleware development",
    "data synchronization",
    "business process automation",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title:
      "System Integration Services | Enterprise Solutions | Eleservsoftech",
    description:
      "Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration.",
    url: "/services/system-integration",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "System Integration Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title:
      "System Integration Services | Enterprise Solutions | Eleservsoftech",
    description:
      "Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/services/system-integration",
  },
  other: {
    "DC.title": "System Integration Services",
    "DC.description":
      "Comprehensive system integration services for enterprise applications",
    "DC.subject":
      "System Integration, Enterprise Solutions, API Development, Data Migration",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// BFSI Services Metadata
export const BFSI_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title:
    "BFSI Services | Banking, Insurance, and Financial Services | Eleservsoftech",
  description:
    "Banking and financial services have entered a new era. Customers are digital-first, compliance is tighter than ever, and competition moves at the speed of technology.",
  keywords: [
    "BFSI services",
    "banking services",
    "insurance services",
    "financial services",
    "core banking",
    "payments",
    "risk management",
    "regulatory compliance",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title:
      "BFSI Services | Banking, Insurance, and Financial Services | Eleservsoftech",
    description:
      "Banking and financial services have entered a new era. Customers are digital-first, compliance is tighter than ever, and competition moves at the speed of technology.",
    url: "/solutions/bfsi",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "BFSI Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title:
      "BFSI Services | Banking, Insurance, and Financial Services | Eleservsoftech",
    description:
      "Banking and financial services have entered a new era. Customers are digital-first, compliance is tighter than ever, and competition moves at the speed of technology.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/bfsi",
  },
  other: {
    "DC.title": "BFSI Services",
    "DC.description": "Banking and financial services have entered a new era",
    "DC.subject": "BFSI Services, Banking, Insurance, Financial Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Life Science & Health Care Services Metadata
export const LIFE_SCIENCE_HEALTH_CARE_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Life Science & Health Care Services | Eleservsoftech",
  description:
    "The life sciences and healthcare industry stands at the intersection of innovation and responsibility. Patients expect faster, more personalized care, researchers push for quicker drug development, and providers must navigate strict regulatory landscapes.",
  keywords: [
    "Life Science & Health Care Services",
    "Life Science & Health Care",
    "Health Care Services",
    "Life Science",
    "Health Care",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Life Science & Health Care Services | Eleservsoftech",
    description:
      "The life sciences and healthcare industry stands at the intersection of innovation and responsibility. Patients expect faster, more personalized care, researchers push for quicker drug development, and providers must navigate strict regulatory landscapes.",
    url: "/solutions/life-science-health-care",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Life Science & Health Care Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Life Science & Health Care Services | Eleservsoftech",
    description:
      "The life sciences and healthcare industry stands at the intersection of innovation and responsibility. Patients expect faster, more personalized care, researchers push for quicker drug development, and providers must navigate strict regulatory landscapes.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/life-science-health-care",
  },
  other: {
    "DC.title": "Life Science & Health Care Services",
    "DC.description":
      "The life sciences and healthcare industry stands at the intersection of innovation and responsibility",
    "DC.subject":
      "Life Science & Health Care Services, Life Science, Health Care, Life Science & Health Care Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Supply Chain & Logistics Services Metadata
export const SUPPLY_CHAIN_LOGISTICS_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Supply Chain & Logistics Services | Eleservsoftech",
  description:
    "Supply chain and logistics are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
  keywords: [
    "Supply Chain & Logistics Services",
    "Supply Chain & Logistics",
    "Logistics Services",
    "Supply Chain",
    "Logistics",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Supply Chain & Logistics Services | Eleservsoftech",
    description:
      "Supply chain and logistics are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    url: "/solutions/supply-chain-logistics",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Supply Chain & Logistics Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Supply Chain & Logistics Services | Eleservsoftech",
    description:
      "Supply chain and logistics are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/supply-chain-logistics",
  },
  other: {
    "DC.title": "Supply Chain & Logistics Services",
    "DC.description":
      "Supply chain and logistics are the backbone of modern business",
    "DC.subject":
      "Supply Chain & Logistics Services, Supply Chain, Logistics, Supply Chain & Logistics Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Telecom Services Metadata
export const TELECOM_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Telecom Services | Eleservsoftech",
  description:
    "Telecom services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
  keywords: [
    "Telecom Services",
    "Telecom Solutions",
    "Telecom Infrastructure Services",
    "Telecom Services",
    "Telecom Solutions",
    "Telecom Infrastructure Services",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Telecom Services | Eleservsoftech",
    description:
      "Telecom services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    url: "/solutions/telecom",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Telecom Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Telecom Services | Eleservsoftech",
    description:
      "Supply chain and logistics are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/telecom",
  },
  other: {
    "DC.title": "Telecom Services",
    "DC.description": "Telecom services are the backbone of modern business",
    "DC.subject":
      "Telecom Services, Telecom Solutions, Telecom Infrastructure Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Insurance Services Metadata
export const INSURANCE_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Insurance Services | Eleservsoftech",
  description:
    "Insurance services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
  keywords: [
    "Insurance Services",
    "Insurance Solutions",
    "Insurance Infrastructure Services",
    "Insurance Services",
    "Insurance Solutions",
    "Insurance Infrastructure Services",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Insurance Services | Eleservsoftech",
    description:
      "Insurance services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    url: "/solutions/insurance",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Insurance Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Insurance Services | Eleservsoftech",
    description:
      "Insurance services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/insurance",
  },
  other: {
    "DC.title": "Insurance Services",
    "DC.description": "Insurance services are the backbone of modern business",
    "DC.subject":
      "Insurance Services, Insurance Solutions, Insurance Infrastructure Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Ecommerce Services Metadata
export const ECOMMERCE_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Ecommerce Services | Eleservsoftech",
  description:
    "Ecommerce services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
  keywords: [
    "Ecommerce Services",
    "Ecommerce Solutions",
    "Ecommerce Infrastructure Services",
    "Ecommerce Services",
    "Ecommerce Solutions",
    "Ecommerce Infrastructure Services",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Ecommerce Services | Eleservsoftech",
    description:
      "Ecommerce services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    url: "/solutions/ecommerce",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Ecommerce Services - Eleservsoftech",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Ecommerce Services | Eleservsoftech",
    description:
      "Ecommerce services are the backbone of modern business. They ensure products and services reach customers efficiently and cost-effectively.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/solutions/ecommerce",
  },
  other: {
    "DC.title": "Ecommerce Services",
    "DC.description": "Ecommerce services are the backbone of modern business",
    "DC.subject":
      "Ecommerce Services, Ecommerce Solutions, Ecommerce Infrastructure Services",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};

// Main Services Page Metadata
export const SERVICES_INDEX_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: "Our Services | Digital Solutions & IT Services | Eleservsoftech",
  description:
    "Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more. Transform your business with Eleservsoftech.",
  keywords: [
    "digital services",
    "web development",
    "mobile app development",
    "IT services",
    "software development",
    "digital transformation",
    "technology solutions",
    "IT consulting",
    "custom software",
    "enterprise solutions",
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: "Our Services | Digital Solutions & IT Services | Eleservsoftech",
    description:
      "Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more.",
    url: "/services",
    images: [
      {
        url: "/images/home/custom-dev.webp",
        width: 1200,
        height: 630,
        alt: "Eleservsoftech Services - Digital Solutions & IT Services",
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: "Our Services | Digital Solutions & IT Services | Eleservsoftech",
    description:
      "Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more.",
    images: ["/images/home/custom-dev.webp"],
  },
  alternates: {
    canonical: "/services",
  },
  other: {
    "DC.title": "Our Services - Digital Solutions & IT Services",
    "DC.description":
      "Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more",
    "DC.subject":
      "Digital Services, Web Development, Mobile Apps, IT Services, Software Development",
    "DC.creator": "Eleservsoftech",
    "DC.publisher": "Eleservsoftech",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright Eleservsoftech",
  },
};
