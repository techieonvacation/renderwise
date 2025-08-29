"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  Quote,
  Building2,
  Package,
  Truck
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";

const SuccessStories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const, 
      },
    },
  };

  const caseStudies = [
    {
      icon: Building2,
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "Siloed operations across 50+ locations",
      solution: "End-to-end visibility platform with predictive analytics",
      results: [
        { metric: "40%", label: "Cost Reduction", icon: DollarSign },
        { metric: "60%", label: "Faster Processing", icon: Clock },
        { metric: "95%", label: "Accuracy Improvement", icon: TrendingUp },
      ],
      quote: "The transformation was remarkable. We now have complete visibility across our entire supply chain network.",
      author: "Sarah Johnson, Supply Chain Director",
      color: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-200/50",
    },
    {
      icon: Package,
      company: "E-Commerce Giant",
      industry: "Retail & E-commerce",
      challenge: "Managing peak season demand fluctuations",
      solution: "AI-powered demand forecasting and automated fulfillment",
      results: [
        { metric: "75%", label: "Demand Accuracy", icon: TrendingUp },
        { metric: "50%", label: "Faster Delivery", icon: Clock },
        { metric: "30%", label: "Inventory Reduction", icon: Package },
      ],
      quote: "Our customers now receive their orders faster than ever, even during peak seasons.",
      author: "Michael Chen, Operations Manager",
      color: "from-green-500/10 to-green-600/5",
      borderColor: "border-green-200/50",
    },
    {
      icon: Truck,
      company: "Logistics Leader",
      industry: "Transportation & Logistics",
      challenge: "Route optimization and fuel cost management",
      solution: "Smart routing with real-time traffic and weather integration",
      results: [
        { metric: "35%", label: "Fuel Savings", icon: DollarSign },
        { metric: "25%", label: "Route Efficiency", icon: TrendingUp },
        { metric: "90%", label: "On-time Delivery", icon: Clock },
      ],
      quote: "The intelligent routing system has revolutionized our operations and significantly reduced costs.",
      author: "David Rodriguez, Fleet Manager",
      color: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-200/50",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div >
            <Tagline variant="center">Proven Success</Tagline>
          </motion.div>
          
          <motion.h2 
            
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight"
          >
            Real{" "}
            <span className="text-primary relative">
              Success Stories
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter"
          >
            Discover how leading companies have transformed their supply chains with our solutions, 
            achieving remarkable results and setting new industry standards.
          </motion.p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              
              className="group relative"
            >
              <Card className={`border-2 ${study.borderColor} hover:border-primary/30 transition-all duration-300 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                          <study.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground font-dm-sans">
                            {study.company}
                          </h3>
                          <p className="text-sm text-muted-foreground font-inter">
                            {study.industry}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 font-space-grotesk uppercase tracking-wide">
                            Challenge
                          </h4>
                          <p className="text-muted-foreground text-sm font-inter">
                            {study.challenge}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 font-space-grotesk uppercase tracking-wide">
                            Solution
                          </h4>
                          <p className="text-muted-foreground text-sm font-inter">
                            {study.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-foreground mb-4 font-space-grotesk uppercase tracking-wide">
                        Results Achieved
                      </h4>
                      
                      <div className="grid gap-4">
                        {study.results.map((result, resultIndex) => (
                          <motion.div
                            key={resultIndex}
                            className="flex items-center space-x-4 bg-card/50 border border-border rounded-lg p-4"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: resultIndex * 0.1 }}
                          >
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                              <result.icon className="w-5 h-5" />
                            </div>
                            
                            <div>
                              <div className="text-2xl font-bold text-foreground font-dm-sans">
                                {result.metric}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">
                                {result.label}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-foreground mb-4 font-space-grotesk uppercase tracking-wide">
                        Client Testimonial
                      </h4>
                      
                      <div className="relative">
                        <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                        
                        <blockquote className="text-foreground italic leading-relaxed font-inter pl-6 mb-4">
                          "{study.quote}"
                        </blockquote>
                        
                        <div className="flex items-center space-x-3 pl-6">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                            {study.author.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground font-dm-sans">
                              {study.author}
                            </div>
                            <div className="text-xs text-muted-foreground font-inter">
                              {study.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-urbanist">Join Our Success Stories</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.div>
          
          <p className="text-sm text-muted-foreground mt-4 font-inter">
            Ready to write your own supply chain success story?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
