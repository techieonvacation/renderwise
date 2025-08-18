// Structured data (JSON-LD) for services pages
// This improves SEO by providing search engines with structured information about your services

export interface ServiceStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
    logo: string;
  };
  areaServed: string;
  serviceType: string;
  category: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

// Base service provider data
const BASE_PROVIDER = {
  '@type': 'Organization',
  name: 'RenderWise',
  url: 'https://eleservsoftech.vercel.app',
  logo: 'https://eleservsoftech.vercel.app/images/logo.png',
};

// IT Staffing Service Structured Data
export const IT_STAFFING_STRUCTURED_DATA: ServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'IT Staffing Services',
  description: 'Professional IT staffing and recruitment services for businesses seeking top-tier technology talent. We specialize in placing software developers, engineers, IT professionals, and tech specialists.',
  provider: BASE_PROVIDER,
  areaServed: 'Worldwide',
  serviceType: 'IT Recruitment and Staffing',
  category: 'Human Resources',
  offers: {
    '@type': 'Offer',
    price: 'Contact for pricing',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

// QA Automation Service Structured Data
export const QA_AUTOMATION_STRUCTURED_DATA: ServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'QA Automation Services',
  description: 'Comprehensive quality assurance and test automation services including framework development, CI/CD integration, performance testing, and automated testing solutions.',
  provider: BASE_PROVIDER,
  areaServed: 'Worldwide',
  serviceType: 'Software Testing and Quality Assurance',
  category: 'Software Development',
  offers: {
    '@type': 'Offer',
    price: 'Contact for pricing',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

// Flutter Development Service Structured Data
export const FLUTTER_DEVELOPMENT_STRUCTURED_DATA: ServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flutter Development Services',
  description: 'Expert Flutter development services for cross-platform mobile applications. We create native-performance apps for iOS and Android using a single codebase.',
  provider: BASE_PROVIDER,
  areaServed: 'Worldwide',
  serviceType: 'Mobile App Development',
  category: 'Software Development',
  offers: {
    '@type': 'Offer',
    price: 'Contact for pricing',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

// System Integration Service Structured Data
export const SYSTEM_INTEGRATION_STRUCTURED_DATA: ServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'System Integration Services',
  description: 'Enterprise system integration services including API development, data migration, legacy system modernization, and seamless technology integration solutions.',
  provider: BASE_PROVIDER,
  areaServed: 'Worldwide',
  serviceType: 'System Integration and API Development',
  category: 'Information Technology',
  offers: {
    '@type': 'Offer',
    price: 'Contact for pricing',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

// Organization Structured Data for RenderWise
export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RenderWise',
  alternateName: 'RenderWise Technologies',
  description: 'RenderWise is a leading technology company specializing in digital solutions, IT services, and custom software development. We help businesses transform their digital presence and achieve technological excellence.',
  url: 'https://eleservsoftech.vercel.app',
  logo: 'https://eleservsoftech.vercel.app/images/logo.png',
  sameAs: [
    'https://linkedin.com/company/renderwise',
    'https://twitter.com/renderwise',
    'https://facebook.com/renderwise',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
    contactType: 'customer service',
    email: 'info@renderwise.com',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressLocality: 'Your City',
    addressRegion: 'Your State',
  },
  founder: {
    '@type': 'Person',
    name: 'RenderWise Team',
  },
  foundingDate: '2020',
  numberOfEmployees: '50-100',
  industry: 'Information Technology',
  serviceArea: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'IT Staffing Services',
          description: 'Professional IT recruitment and staffing solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'QA Automation Services',
          description: 'Test automation and quality assurance solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flutter Development Services',
          description: 'Cross-platform mobile app development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'System Integration Services',
          description: 'Enterprise integration and API development',
        },
      },
    ],
  },
};

// WebSite Structured Data
export const WEBSITE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RenderWise',
  description: 'Professional digital services and IT solutions company',
  url: 'https://eleservsoftech.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://eleservsoftech.vercel.app/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'RenderWise',
    logo: {
      '@type': 'ImageObject',
      url: 'https://eleservsoftech.vercel.app/images/logo.png',
    },
  },
};

// Breadcrumb Structured Data for Services
export const SERVICES_BREADCRUMB_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://eleservsoftech.vercel.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://eleservsoftech.vercel.app/services',
    },
  ],
};

// Helper function to generate breadcrumb data for specific services
export function generateServiceBreadcrumb(serviceName: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://eleservsoftech.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://eleservsoftech.vercel.app/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: serviceName,
        item: `https://eleservsoftech.vercel.app${serviceUrl}`,
      },
    ],
  };
}

// FAQ Structured Data
export const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does RenderWise offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RenderWise offers comprehensive digital services including IT staffing, QA automation, Flutter development, system integration, web development, mobile app development, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I get started with RenderWise services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can get started by contacting our team through our website, email, or phone. We offer free consultations to understand your requirements and provide customized solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does RenderWise work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, RenderWise serves clients worldwide. We have experience working with international businesses and can accommodate different time zones and requirements.',
      },
    },
  ],
};
