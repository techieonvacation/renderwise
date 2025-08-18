import { Metadata } from 'next';

// Base metadata configuration for all services
export const BASE_SERVICES_METADATA: Partial<Metadata> = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  authors: [{ name: 'RenderWise Team' }],
  creator: 'RenderWise',
  publisher: 'RenderWise',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://eleservsoftech.vercel.app'),
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    type: 'website',
    siteName: 'RenderWise',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@renderwise',
    creator: '@renderwise',
  },
};

// IT Staffing Service Metadata
export const IT_STAFFING_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: 'IT Staffing Services | Professional IT Recruitment | RenderWise',
  description: 'Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent. Custom recruitment strategies, rapid placement, and ongoing support.',
  keywords: [
    'IT staffing',
    'IT recruitment',
    'tech talent',
    'software developers',
    'IT professionals',
    'technology recruitment',
    'IT consulting',
    'staff augmentation',
    'contract IT staff',
    'permanent IT hiring'
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: 'IT Staffing Services | Professional IT Recruitment | RenderWise',
    description: 'Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent.',
    url: '/services/it-staffing',
    images: [
      {
        url: '/images/itstaff_whychs.webp',
        width: 1200,
        height: 630,
        alt: 'IT Staffing Services - RenderWise',
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: 'IT Staffing Services | Professional IT Recruitment | RenderWise',
    description: 'Expert IT staffing solutions for businesses. Find top-tier IT professionals, developers, engineers, and tech talent.',
    images: ['/images/itstaff_whychs.webp'],
  },
  alternates: {
    canonical: '/services/it-staffing',
  },
  other: {
    'DC.title': 'IT Staffing Services',
    'DC.description': 'Expert IT staffing solutions for businesses',
    'DC.subject': 'IT Staffing, IT Recruitment, Tech Talent',
    'DC.creator': 'RenderWise',
    'DC.publisher': 'RenderWise',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright RenderWise',
  },
};

// QA Automation Service Metadata
export const QA_AUTOMATION_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: 'QA Automation Services | Test Automation Solutions | RenderWise',
  description: 'Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions. Boost your software quality and delivery speed.',
  keywords: [
    'QA automation',
    'test automation',
    'software testing',
    'automated testing',
    'CI/CD testing',
    'performance testing',
    'quality assurance',
    'test frameworks',
    'Selenium',
    'Cypress',
    'Jest',
    'Playwright'
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: 'QA Automation Services | Test Automation Solutions | RenderWise',
    description: 'Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions.',
    url: '/services/qa-automation',
    images: [
      {
        url: '/images/home/artifical-intelligence.webp',
        width: 1200,
        height: 630,
        alt: 'QA Automation Services - RenderWise',
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: 'QA Automation Services | Test Automation Solutions | RenderWise',
    description: 'Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions.',
    images: ['/images/home/artifical-intelligence.webp'],
  },
  alternates: {
    canonical: '/services/qa-automation',
  },
  other: {
    'DC.title': 'QA Automation Services',
    'DC.description': 'Professional QA automation services including test automation frameworks, CI/CD integration, performance testing, and quality assurance solutions',
    'DC.subject': 'QA Automation, Test Automation, Software Testing, Quality Assurance',
    'DC.creator': 'RenderWise',
    'DC.publisher': 'RenderWise',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright RenderWise',
  },
};

// Flutter Development Service Metadata
export const FLUTTER_DEVELOPMENT_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: 'Flutter Development Services | Cross-Platform Mobile Apps | RenderWise',
  description: 'Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design for iOS and Android.',
  keywords: [
    'Flutter development',
    'cross-platform mobile apps',
    'mobile app development',
    'Flutter apps',
    'iOS development',
    'Android development',
    'mobile UI/UX',
    'Dart programming',
    'mobile app design',
    'app store optimization'
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: 'Flutter Development Services | Cross-Platform Mobile Apps | RenderWise',
    description: 'Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design.',
    url: '/services/flutter',
    images: [
      {
        url: '/images/home/mbl-app-dev.webp',
        width: 1200,
        height: 630,
        alt: 'Flutter Development Services - RenderWise',
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: 'Flutter Development Services | Cross-Platform Mobile Apps | RenderWise',
    description: 'Expert Flutter development services for cross-platform mobile applications. Native performance, single codebase, rapid development, and beautiful UI/UX design.',
    images: ['/images/home/mbl-app-dev.webp'],
  },
  alternates: {
    canonical: '/services/flutter',
  },
  other: {
    'DC.title': 'Flutter Development Services',
    'DC.description': 'Expert Flutter development services for cross-platform mobile applications',
    'DC.subject': 'Flutter Development, Cross-Platform Mobile Apps, Mobile App Development',
    'DC.creator': 'RenderWise',
    'DC.publisher': 'RenderWise',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright RenderWise',
  },
};

// System Integration Service Metadata
export const SYSTEM_INTEGRATION_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: 'System Integration Services | Enterprise Solutions | RenderWise',
  description: 'Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration solutions.',
  keywords: [
    'system integration',
    'enterprise integration',
    'API development',
    'data migration',
    'legacy system modernization',
    'enterprise solutions',
    'technology integration',
    'middleware development',
    'data synchronization',
    'business process automation'
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: 'System Integration Services | Enterprise Solutions | RenderWise',
    description: 'Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration.',
    url: '/services/system-integration',
    images: [
      {
        url: '/images/home/custom-dev.webp',
        width: 1200,
        height: 630,
        alt: 'System Integration Services - RenderWise',
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: 'System Integration Services | Enterprise Solutions | RenderWise',
    description: 'Comprehensive system integration services for enterprise applications. API development, data migration, legacy system modernization, and seamless technology integration.',
    images: ['/images/home/custom-dev.webp'],
  },
  alternates: {
    canonical: '/services/system-integration',
  },
  other: {
    'DC.title': 'System Integration Services',
    'DC.description': 'Comprehensive system integration services for enterprise applications',
    'DC.subject': 'System Integration, Enterprise Solutions, API Development, Data Migration',
    'DC.creator': 'RenderWise',
    'DC.publisher': 'RenderWise',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright RenderWise',
  },
};

// Main Services Page Metadata
export const SERVICES_INDEX_METADATA: Metadata = {
  ...BASE_SERVICES_METADATA,
  title: 'Our Services | Digital Solutions & IT Services | RenderWise',
  description: 'Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more. Transform your business with RenderWise.',
  keywords: [
    'digital services',
    'web development',
    'mobile app development',
    'IT services',
    'software development',
    'digital transformation',
    'technology solutions',
    'IT consulting',
    'custom software',
    'enterprise solutions'
  ],
  openGraph: {
    ...BASE_SERVICES_METADATA.openGraph,
    title: 'Our Services | Digital Solutions & IT Services | RenderWise',
    description: 'Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more.',
    url: '/services',
    images: [
      {
        url: '/images/home/custom-dev.webp',
        width: 1200,
        height: 630,
        alt: 'RenderWise Services - Digital Solutions & IT Services',
      },
    ],
  },
  twitter: {
    ...BASE_SERVICES_METADATA.twitter,
    title: 'Our Services | Digital Solutions & IT Services | RenderWise',
    description: 'Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more.',
    images: ['/images/home/custom-dev.webp'],
  },
  alternates: {
    canonical: '/services',
  },
  other: {
    'DC.title': 'Our Services - Digital Solutions & IT Services',
    'DC.description': 'Comprehensive digital services including web development, mobile apps, IT staffing, QA automation, system integration, and more',
    'DC.subject': 'Digital Services, Web Development, Mobile Apps, IT Services, Software Development',
    'DC.creator': 'RenderWise',
    'DC.publisher': 'RenderWise',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright RenderWise',
  },
};
