"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Code,
  Database,
  Shield,
  Server,
  Globe,
  Zap,
} from "lucide-react";
import Tagline from "../Tagline";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom Software Development",
      question: "What technologies do you use for custom software development?",
      answer:
        "We specialize in modern tech stacks including React, Node.js, Python, Java, and cloud-native solutions. Our development process follows Agile methodologies with continuous integration/deployment (CI/CD) pipelines. We build scalable, secure applications using microservices architecture, containerization with Docker, and cloud platforms like AWS, Azure, and Google Cloud. Our team ensures code quality through automated testing, code reviews, and adherence to industry best practices.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Analytics & AI Solutions",
      question: "How do you implement AI and machine learning solutions?",
      answer:
        "Our AI implementation follows a structured approach starting with data assessment and preparation. We use advanced frameworks like TensorFlow, PyTorch, and scikit-learn for machine learning models. Our solutions include predictive analytics, natural language processing, computer vision, and recommendation systems. We implement MLOps practices for model monitoring, retraining, and deployment. Our AI solutions are designed to integrate seamlessly with existing systems while providing explainable AI capabilities for business stakeholders.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cybersecurity Services",
      question: "What cybersecurity measures do you implement?",
      answer:
        "Our cybersecurity approach includes comprehensive threat assessment, penetration testing, and security audits. We implement multi-layered security including network security, application security, and data encryption. Our services cover vulnerability management, incident response planning, and compliance with standards like ISO 27001, SOC 2, and GDPR. We provide 24/7 security monitoring, threat intelligence, and regular security training for your team to ensure ongoing protection against evolving cyber threats.",
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Cloud Infrastructure & DevOps",
      question: "How do you handle cloud migration and DevOps implementation?",
      answer:
        "Our cloud migration strategy follows a phased approach with minimal business disruption. We assess your current infrastructure, design target architecture, and create detailed migration roadmaps. Our DevOps implementation includes automated CI/CD pipelines, infrastructure as code (IaC) using Terraform, container orchestration with Kubernetes, and monitoring with tools like Prometheus and Grafana. We ensure high availability, disaster recovery, and cost optimization across multi-cloud environments.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Digital Transformation",
      question: "What is your approach to digital transformation projects?",
      answer:
        "Our digital transformation methodology focuses on business outcomes rather than just technology implementation. We begin with a comprehensive digital maturity assessment and create a strategic roadmap aligned with your business goals. Our approach includes process automation, legacy system modernization, and digital workplace solutions. We implement change management strategies, provide training programs, and ensure measurable ROI through KPIs and analytics dashboards. Our team works as an extension of your organization to drive sustainable digital growth.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "IT Consulting & Strategy",
      question: "How do you help with IT strategy and technology roadmapping?",
      answer:
        "Our IT consulting services start with understanding your business objectives and current technology landscape. We conduct technology assessments, identify optimization opportunities, and create strategic roadmaps aligned with your business goals. Our expertise covers enterprise architecture, technology selection, vendor management, and digital innovation strategies. We provide ongoing advisory services, technology trend analysis, and help you make informed decisions about emerging technologies like blockchain, IoT, and edge computing.",
    },
  ];

  return (
    <div className="py-10">
      <div className="container !max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">FAQ</Tagline>
          <h2 className="title">
            Frequently Asked &nbsp;
            <span className="highlight">Questions</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            Explore our detailed answers to complex technical questions about
            our IT services and solutions
          </p>
        </div>

        <div className="space-y-4 relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20 hidden sm:block" />
          {faqItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline node */}
              <div
                className={`
                  absolute left-0 top-0 w-16 h-16 rounded-full hidden sm:flex items-center justify-center z-10
                  ${
                    activeIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                  transition-colors duration-300
                `}
              >
                {item.icon}
              </div>

              {/* Content card */}
              <div className="sm:ml-24 bg-card rounded-xl overflow-hidden shadow-sm border border-border">
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="sm:hidden mr-4">
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${
                          activeIndex === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </h3>
                      <p className="text-lg font-semibold mt-1">
                        {item.question}
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 ml-4">
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
