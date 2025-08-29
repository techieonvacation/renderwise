"use client";

import React from "react";
import { motion } from "framer-motion";
import Tagline from "../../ui/Tagline";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { Button } from "../../ui/Button";

const solutions = [
  {
    icon: "⚡",
    title: "Claims Without Delays",
    description: "Automation-led claims processing that accelerates settlements and reduces manual intervention.",
    features: [
      "AI-powered damage assessment",
      "Automated validation workflows",
      "Real-time status tracking",
      "Digital documentation"
    ],
    color: "from-blue-500/20 to-blue-600/20",
    accent: "blue"
  },
  {
    icon: "📄",
    title: "Smarter Policy Management",
    description: "Digital-first systems that simplify policy issuance, renewals, and customer onboarding.",
    features: [
      "Instant policy generation",
      "Automated renewals",
      "Digital KYC processes",
      "Self-service portals"
    ],
    color: "from-green-500/20 to-green-600/20",
    accent: "green"
  },
  {
    icon: "🛡️",
    title: "Fraud Detection & Risk Analytics",
    description: "AI-powered tools to identify anomalies and minimize fraudulent claims.",
    features: [
      "Machine learning algorithms",
      "Behavioral pattern analysis",
      "Risk scoring models",
      "Predictive analytics"
    ],
    color: "from-red-500/20 to-red-600/20",
    accent: "red"
  },
  {
    icon: "💬",
    title: "Customer-Centric Platforms",
    description: "Omnichannel engagement portals for policyholders to access services anytime, anywhere.",
    features: [
      "Mobile-first design",
      "24/7 self-service",
      "Multi-channel support",
      "Personalized dashboards"
    ],
    color: "from-purple-500/20 to-purple-600/20",
    accent: "purple"
  },
  {
    icon: "⚖️",
    title: "Compliance-Ready Frameworks",
    description: "Built-in governance tools aligned with regulatory standards across global markets.",
    features: [
      "Automated compliance checks",
      "Regulatory reporting",
      "Audit trail management",
      "Policy enforcement"
    ],
    color: "from-yellow-500/20 to-yellow-600/20",
    accent: "yellow"
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description: "Predictive analytics for better underwriting, product design, and risk assessment.",
    features: [
      "Advanced analytics dashboard",
      "Predictive modeling",
      "Risk assessment tools",
      "Business intelligence"
    ],
    color: "from-indigo-500/20 to-indigo-600/20",
    accent: "indigo"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9 as const,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100, 
      damping: 15,
      duration: 0.8,
    } as const,
  }
};

const SolutionsSection = () => {
  return (
    <section className="py-16 md:py-24 section-bg-capabilities overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tagline>Our Solutions</Tagline>
          <h2 className="section-title mb-6">
            Solutions Tailored for <span className="highlight">Insurance</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Transform your insurance operations with our comprehensive suite of digital solutions 
            designed to accelerate growth, enhance customer experience, and ensure compliance.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {solution.icon}
                  </motion.div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {solution.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Learn More Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                  >
                    Learn More
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      →
                    </motion.span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { metric: "60%", label: "Faster Claims Processing" },
            { metric: "45%", label: "Reduction in Fraud" },
            { metric: "80%", label: "Improved Customer Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-lg bg-muted/30 border border-border/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
