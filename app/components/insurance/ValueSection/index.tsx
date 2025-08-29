"use client";

import React from "react";
import { motion } from "framer-motion";
import Tagline from "../../ui/Tagline";
import { Card, CardContent } from "../../ui/Card";

const benefits = [
  {
    icon: "🚀",
    title: "Enhanced Speed",
    description: "Claims are processed faster with automated workflows and AI-powered decision making.",
    metrics: [
      { label: "Processing Time", value: "75% Faster" },
      { label: "Settlement Speed", value: "3x Quicker" }
    ]
  },
  {
    icon: "🔒",
    title: "Improved Security",
    description: "Advanced fraud detection and secure digital platforms protect against threats.",
    metrics: [
      { label: "Fraud Detection", value: "95% Accuracy" },
      { label: "Security Incidents", value: "80% Reduction" }
    ]
  },
  {
    icon: "📈",
    title: "Greater Scalability",
    description: "Cloud-native architectures that grow with your business and adapt to market changes.",
    metrics: [
      { label: "System Capacity", value: "10x Growth" },
      { label: "Market Expansion", value: "50% Faster" }
    ]
  },
  {
    icon: "😊",
    title: "Higher Satisfaction",
    description: "Seamless digital journeys create better customer experiences and loyalty.",
    metrics: [
      { label: "Customer Satisfaction", value: "92% Rate" },
      { label: "Digital Adoption", value: "85% Increase" }
    ]
  },
  {
    icon: "✅",
    title: "Proactive Compliance",
    description: "Built-in governance ensures regulatory requirements are met automatically.",
    metrics: [
      { label: "Compliance Score", value: "99.8%" },
      { label: "Audit Ready", value: "Real-time" }
    ]
  },
  {
    icon: "💰",
    title: "Cost Efficiency",
    description: "Operational costs decline while productivity and efficiency improve significantly.",
    metrics: [
      { label: "Operational Costs", value: "40% Reduction" },
      { label: "ROI Achievement", value: "18 Months" }
    ]
  }
];

const impactAreas = [
  {
    title: "Digital Transformation",
    description: "Future-ready architectures ensure technology investments stay relevant",
    progress: 95,
    color: "bg-blue-500"
  },
  {
    title: "Customer Experience",
    description: "Omnichannel platforms deliver consistent, personalized interactions",
    progress: 88,
    color: "bg-green-500"
  },
  {
    title: "Operational Excellence",
    description: "Automated processes reduce manual work and human error",
    progress: 92,
    color: "bg-purple-500"
  },
  {
    title: "Risk Management",
    description: "AI-powered analytics enable proactive risk assessment and mitigation",
    progress: 90,
    color: "bg-red-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 as const,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    } as const,
  }
};

const ValueSection = () => {
  return (
    <section className="py-16 md:py-24 section-bg-counter overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tagline>Value Creation</Tagline>
          <h2 className="section-title mb-6">
            The <span className="highlight">Value We Create</span>
          </h2>
          <p className="section-subtitle max-w-4xl mx-auto">
            Insurers adopting intelligent digital platforms gain speed, security, and scalability. Claims are processed 
            faster, customer satisfaction rises through seamless digital journeys, and compliance becomes proactive 
            instead of reactive. Operational efficiency improves while costs decline, and future-ready architectures 
            ensure technology investments stay relevant in a changing industry.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="h-full bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="space-y-3">
                    {benefit.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <span className="text-sm font-semibold text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Areas */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Side - Impact Stats */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Impact Across Key Areas</h3>
            <div className="space-y-6">
              {impactAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-foreground">{area.title}</h4>
                    <span className="text-sm font-semibold text-primary">{area.progress}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${area.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Overall Impact */}
          <div className="text-center lg:text-left">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-6">Overall Business Impact</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">3.2x</div>
                    <div className="text-sm text-muted-foreground">ROI Improvement</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">65%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">90%</div>
                    <div className="text-sm text-muted-foreground">Process Automation</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Service Availability</div>
                  </motion.div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our solutions deliver measurable business value through comprehensive digital transformation, 
                  enabling insurers to thrive in the digital-first future.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
