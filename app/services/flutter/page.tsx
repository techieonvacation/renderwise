import { Metadata } from 'next';
import FAQ from "../../components/ui/Faq";
import InternalPageHero from "../../components/ui/InternalPageHero";
import { LogoMarquee } from "../../components/ui/MarqueeWrapper/logoMarquee";
import { getLogoMarqueeConfig } from "../../lib/services/logoMarqueeService";
import { FLUTTER_DEVELOPMENT_METADATA } from "../../lib/metadata/servicesMetadata";
import { 
  FLUTTER_DEVELOPMENT_STRUCTURED_DATA, 
  generateServiceBreadcrumb 
} from "../../lib/structured-data/servicesStructuredData";
import StructuredData from "../../components/ui/SEO/StructuredData";

// Generate metadata for the page
export const metadata: Metadata = FLUTTER_DEVELOPMENT_METADATA;

// Flutter service hero content
const flutterHeroContent = {
  badge: "Flutter Development",
  title: "Cross-Platform Mobile App Development",
  description: "Create stunning, high-performance mobile applications for both iOS and Android using Flutter's single codebase approach. We deliver native performance with beautiful UI/UX design.",
  flipWords: ["iOS", "Android", "Cross-Platform", "Native Performance"],
  imageSlides: ["/images/home/mbl-app-dev.webp"],
  buttonText: "Get Started"
};

export default async function FlutterDevelopmentPage() {
  const logoMarqueeConfig = await getLogoMarqueeConfig();
  
  // Generate breadcrumb structured data
  const breadcrumbData = generateServiceBreadcrumb('Flutter Development', '/services/flutter');
  
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={FLUTTER_DEVELOPMENT_STRUCTURED_DATA} />
      <StructuredData data={breadcrumbData} />
      
      {/* Page Content */}
      <div className="overflow-hidden">
        <InternalPageHero {...flutterHeroContent} />
        <LogoMarquee config={logoMarqueeConfig} />
        
        {/* Flutter Services Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Flutter for Your Mobile App?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flutter offers unparalleled advantages for cross-platform mobile development, 
                combining native performance with rapid development cycles.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Single Codebase</h3>
                <p className="text-gray-600 text-center">
                  Write once, run everywhere. Maintain a single codebase for both iOS and Android platforms.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Native Performance</h3>
                <p className="text-gray-600 text-center">
                  Achieve native performance with Flutter's compiled code and optimized rendering engine.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Rich UI Components</h3>
                <p className="text-gray-600 text-center">
                  Access to a comprehensive set of customizable widgets and Material Design components.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Flutter Development Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Flutter Development Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We follow a proven development methodology to ensure your Flutter app is delivered on time, 
                within budget, and exceeds expectations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Discovery & Planning</h3>
                <p className="text-gray-600">
                  We analyze your requirements, plan the architecture, and create a detailed project roadmap.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Design & Prototyping</h3>
                <p className="text-gray-600">
                  Our UI/UX designers create beautiful, intuitive interfaces with interactive prototypes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Development & Testing</h3>
                <p className="text-gray-600">
                  Expert Flutter developers build your app with comprehensive testing at every stage.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Deployment & Support</h3>
                <p className="text-gray-600">
                  We handle app store submissions and provide ongoing maintenance and support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FAQ />
      </div>
    </>
  );
}
