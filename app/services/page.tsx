import { Metadata } from "next";
import Link from "next/link";
import { SERVICES_INDEX_METADATA } from "../lib/metadata/servicesMetadata";
import {
  SERVICES_BREADCRUMB_STRUCTURED_DATA,
  ORGANIZATION_STRUCTURED_DATA,
} from "../lib/structured-data/servicesStructuredData";
import StructuredData from "../components/ui/SEO/StructuredData";

// Generate metadata for the page
export const metadata: Metadata = SERVICES_INDEX_METADATA;

// Services data
const services = [
  {
    id: "it-staffing",
    title: "IT Staffing Services",
    description:
      "Professional IT recruitment and staffing solutions for businesses seeking top-tier technology talent.",
    icon: "👥",
    image: "/images/itstaff_whychs.webp",
    features: [
      "Custom recruitment strategies",
      "Rapid placement",
      "Ongoing support",
      "Tech talent sourcing",
    ],
    url: "/services/it-staffing",
  },
  {
    id: "qa-automation",
    title: "QA Automation Services",
    description:
      "Comprehensive quality assurance and test automation services including framework development and CI/CD integration.",
    icon: "🔧",
    image: "/images/home/artifical-intelligence.webp",
    features: [
      "Test automation frameworks",
      "CI/CD integration",
      "Performance testing",
      "Quality assurance",
    ],
    url: "/services/qa-automation",
  },
  {
    id: "flutter",
    title: "Flutter Development",
    description:
      "Expert Flutter development services for cross-platform mobile applications with native performance.",
    icon: "📱",
    image: "/images/home/mbl-app-dev.webp",
    features: [
      "Cross-platform development",
      "Native performance",
      "Single codebase",
      "Beautiful UI/UX",
    ],
    url: "/services/flutter",
  },
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "Enterprise system integration services including API development, data migration, and legacy modernization.",
    icon: "🔗",
    image: "/images/home/custom-dev.webp",
    features: [
      "API development",
      "Data migration",
      "Legacy modernization",
      "Enterprise solutions",
    ],
    url: "/services/system-integration",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom web application development with modern technologies and scalable architecture.",
    icon: "🌐",
    image: "/images/home/web-dev.webp",
    features: [
      "Custom web apps",
      "Progressive Web Apps",
      "Full-stack development",
      "API development",
    ],
    url: "/services/web-development",
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    icon: "📲",
    image: "/images/home/mbl-app-dev.webp",
    features: [
      "Native iOS & Android",
      "Cross-platform apps",
      "App maintenance",
      "UI/UX design",
    ],
    url: "/services/mobile-development",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={SERVICES_BREADCRUMB_STRUCTURED_DATA} />
      <StructuredData data={ORGANIZATION_STRUCTURED_DATA} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-yellow-300">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Comprehensive digital solutions to transform your business and drive
            growth in the digital landscape
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From IT staffing to custom development, we provide end-to-end
              solutions that help businesses thrive in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-4xl">
                    {service.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.url}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RenderWise?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business understanding to
              deliver solutions that drive real results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovation First
              </h3>
              <p className="text-gray-600">
                We stay ahead of technology trends to deliver cutting-edge
                solutions that give you a competitive edge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our experienced professionals bring deep expertise across
                technologies and industries.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                We use agile methodologies to deliver high-quality solutions
                quickly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your digital
            transformation goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
