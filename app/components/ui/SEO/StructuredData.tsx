'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
  type?: 'application/ld+json' | 'application/json';
}

/**
 * SEO Component for rendering structured data (JSON-LD)
 * This component injects structured data into the document head for better SEO
 */
export default function StructuredData({ 
  data, 
  type = 'application/ld+json' 
}: StructuredDataProps) {
  useEffect(() => {
    // Create script element for structured data
    const script = document.createElement('script');
    script.type = type;
    script.text = JSON.stringify(data);
    script.id = `structured-data-${Date.now()}`; // Unique ID to avoid conflicts
    
    // Add to document head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data, type]);

  // This component doesn't render anything visible
  return null;
}

/**
 * SEO Component for rendering multiple structured data objects
 * Useful when you need to include multiple types of structured data on a page
 */
export function MultipleStructuredData({ dataArray }: { dataArray: any[] }) {
  return (
    <>
      {dataArray.map((data, index) => (
        <StructuredData key={`structured-data-${index}`} data={data} />
      ))}
    </>
  );
}

/**
 * SEO Component for rendering organization structured data
 * This should be included on every page for consistent brand representation
 */
export function OrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RenderWise',
    alternateName: 'RenderWise Technologies',
    description: 'RenderWise is a leading technology company specializing in digital solutions, IT services, and custom software development.',
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
  };

  return <StructuredData data={organizationData} />;
}

/**
 * SEO Component for rendering website structured data
 * This should be included on the main layout or home page
 */
export function WebsiteStructuredData() {
  const websiteData = {
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

  return <StructuredData data={websiteData} />;
}

/**
 * SEO Component for rendering breadcrumb structured data
 * Use this component on pages that have breadcrumb navigation
 */
export function BreadcrumbStructuredData({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={breadcrumbData} />;
}

/**
 * SEO Component for rendering FAQ structured data
 * Use this component on pages that have FAQ sections
 */
export function FAQStructuredData({ 
  faqs 
}: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={faqData} />;
}
