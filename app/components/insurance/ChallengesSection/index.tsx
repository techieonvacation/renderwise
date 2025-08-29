"use client";

import React from "react";
import { motion } from "framer-motion";
import Tagline from "../../ui/Tagline";
import { Card, CardContent } from "../../ui/Card";

const challenges = [
  {
    icon: "⏰",
    title: "Lengthy Claims Cycles",
    description: "Traditional claims processing creates delays that frustrate customers and increase operational costs.",
    impact: "Customer dissatisfaction"
  },
  {
    icon: "🏗️",
    title: "Legacy Infrastructure",
    description: "Outdated systems struggle to adapt to modern digital demands and regulatory requirements.",
    impact: "Operational inefficiency"
  },
  {
    icon: "🔍",
    title: "Rising Fraud Risks",
    description: "Fraudulent claims detection relies on manual processes, leading to significant financial losses.",
    impact: "Revenue loss"
  },
  {
    icon: "📋",
    title: "Evolving Regulatory Frameworks",
    description: "Constantly changing compliance requirements demand agile systems and proactive governance.",
    impact: "Compliance risks"
  },
  {
    icon: "🎯",
    title: "Customer Engagement Gaps",
    description: "Disconnected touchpoints result in fragmented customer experiences and reduced loyalty.",
    impact: "Market share loss"
  },
  {
    icon: "📈",
    title: "Data Silos",
    description: "Isolated data systems prevent comprehensive insights needed for better risk assessment.",
    impact: "Poor decision making"
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
    scale: 0.95 as const
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

const ChallengesSection = () => {
  return (
    <section className="py-16 md:py-24 section-bg-services overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tagline>Industry Challenges</Tagline>
          <h2 className="section-title mb-6">
            Breaking Through <span className="highlight">Industry Barriers</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            From lengthy claims cycles and legacy infrastructure to rising fraud risks and evolving regulatory 
            frameworks, insurers face challenges that impact both profitability and customer trust. With the right 
            digital platforms, these challenges become opportunities to drive efficiency, transparency, and growth.
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {challenge.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {challenge.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {challenge.description}
                  </p>
                  
                  {/* Impact Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                    <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
                    {challenge.impact}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-muted/50 border border-border">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">85%</span> of insurers struggle with legacy system modernization
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengesSection;
