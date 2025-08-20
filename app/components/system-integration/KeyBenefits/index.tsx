"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  TrendingUp, 
  Shield, 
  Target, 
  BarChart3,
  Zap,
  DollarSign,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { features } from "../Services/multiStepData";

const KeyBenefits = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const benefitIcons = {
    "Operational Efficiency": TrendingUp,
    "Error Reduction": Shield,
    "Improved Compliance": Target,
    "Real-Time Insights": BarChart3,
    "Scalable Solutions": Zap,
    "Cost Optimization": DollarSign,
  };

  const stats = [
    { value: "500+", label: "Processes Automated", icon: CheckCircle2 },
    { value: "95%", label: "Client Satisfaction", icon: TrendingUp },
    { value: "80%", label: "Average Time Savings", icon: Zap },
    { value: "24/7", label: "System Monitoring", icon: Shield }
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6"
          >
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Key Benefits</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Why Choose Our{" "}
            <span className="text-primary">BPA Solutions?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Transform your business operations with intelligent automation that delivers 
            measurable results across every department and process.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((benefit, index) => {
            const IconComponent = benefitIcons[benefit.title as keyof typeof benefitIcons];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="group"
              >
                <div className="relative p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-xl ${benefit.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        {IconComponent && (
                          <IconComponent className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      {benefit.description.map((desc, descIndex) => (
                        <p key={descIndex} className="text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      ))}
                    </div>

                    {/* Arrow Indicator */}
                    <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                      <span className="text-sm font-medium mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ROI Calculator Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Calculate Your ROI</h3>
            <p className="text-muted-foreground mb-6">
              Our clients typically see a return on investment within 3-6 months. 
              Find out how much your business could save with automation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-background/80 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">$250K</div>
                <div className="text-sm text-muted-foreground">Average Annual Savings</div>
              </div>
              <div className="p-4 bg-background/80 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">4.2x</div>
                <div className="text-sm text-muted-foreground">Average ROI Multiplier</div>
              </div>
              <div className="p-4 bg-background/80 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">6 Months</div>
                <div className="text-sm text-muted-foreground">Typical Payback Period</div>
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors duration-300">
              Start ROI Calculator
            </button>
          </div>
        </motion.div>

        {/* Process Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            From Manual to Automated in{" "}
            <span className="text-primary">4 Simple Steps</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Assess", description: "Analyze current processes and identify automation opportunities" },
              { step: "02", title: "Design", description: "Create optimized workflows and integration architecture" },
              { step: "03", title: "Implement", description: "Deploy automation solutions with minimal disruption" },
              { step: "04", title: "Optimize", description: "Monitor performance and continuously improve efficiency" }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-4 border-primary/20">
                    <span className="text-primary font-bold text-lg">{step.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyBenefits;
