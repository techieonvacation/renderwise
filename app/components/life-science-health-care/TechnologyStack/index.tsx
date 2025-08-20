"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Database,
  Lock,
  Smartphone,
  Monitor,
  Code,
  Zap,
  Shield,
  Activity,
  Microscope,
  Bot,
} from "lucide-react";

const technologies = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    gradient: "from-purple-500 to-indigo-500",
    technologies: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Azure ML",
      "AWS SageMaker",
      "Google AI Platform",
    ],
    description:
      "Advanced AI algorithms for drug discovery, diagnostics, and predictive analytics",
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    gradient: "from-blue-500 to-cyan-500",
    technologies: [
      "AWS HealthLake",
      "Azure Healthcare",
      "Google Cloud Healthcare",
      "HIPAA Compliant",
      "Multi-Cloud",
      "Edge Computing",
    ],
    description:
      "Scalable, secure cloud platforms designed for healthcare workloads",
  },
  {
    category: "Data & Analytics",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    technologies: [
      "MongoDB",
      "PostgreSQL",
      "Apache Kafka",
      "Elasticsearch",
      "Apache Spark",
      "Tableau",
    ],
    description:
      "Real-time data processing and analytics for clinical and operational insights",
  },
  {
    category: "Security & Compliance",
    icon: Lock,
    gradient: "from-red-500 to-pink-500",
    technologies: [
      "OAuth 2.0",
      "SAML",
      "Zero Trust",
      "End-to-End Encryption",
      "Audit Trails",
      "Compliance Automation",
    ],
    description:
      "Enterprise-grade security meeting HIPAA, FDA, and GDPR requirements",
  },
  {
    category: "Mobile & IoT",
    icon: Smartphone,
    gradient: "from-orange-500 to-yellow-500",
    technologies: [
      "React Native",
      "Flutter",
      "IoT Sensors",
      "Wearable Integration",
      "Real-time Monitoring",
      "Edge Analytics",
    ],
    description:
      "Connected devices and mobile solutions for patient monitoring and engagement",
  },
  {
    category: "Integration & APIs",
    icon: Code,
    gradient: "from-teal-500 to-blue-500",
    technologies: [
      "HL7 FHIR",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "API Gateway",
      "Event-Driven Architecture",
    ],
    description:
      "Seamless integration with existing healthcare systems and EHRs",
  },
];

const certifications = [
  { name: "HIPAA Compliant", icon: Shield },
  { name: "FDA Validated", icon: Activity },
  { name: "SOC 2 Certified", icon: Lock },
  { name: "ISO 27001", icon: Monitor },
  { name: "GDPR Ready", icon: Database },
  { name: "HL7 FHIR", icon: Code },
];

export default function TechnologyStack() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Tech Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-primary">
          <Bot className="w-24 h-24 rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10 text-primary">
          <Microscope className="w-32 h-32 -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary">
          <Zap className="w-20 h-20 rotate-45" />
        </div>
      </div>

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Advanced{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Powered by cutting-edge technologies and industry-leading
              platforms, our solutions deliver the performance, security, and
              scalability that healthcare organizations demand.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Technology Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${tech.gradient} group-hover:scale-125 transition-transform duration-500`}
                      />
                    </div>

                    <div className="relative">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {tech.category}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {tech.description}
                      </p>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        {tech.technologies.map((technology, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + techIndex * 0.05,
                            }}
                            className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-xs font-medium text-foreground rounded-full border border-border/50 hover:border-primary/50 transition-colors duration-300"
                          >
                            {technology}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Certifications */}
          <motion.div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Industry Certifications & Compliance
            </h3>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Our technology stack is continuously updated to meet evolving
                  healthcare standards and regulatory requirements, ensuring
                  your solutions remain compliant and secure.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
