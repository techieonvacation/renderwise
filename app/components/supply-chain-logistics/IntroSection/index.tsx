"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, Shield, Zap } from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";

const IntroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const stats = [
    {
      icon: Globe,
      value: "95%",
      label: "Global Coverage",
      description: "Worldwide logistics networks",
    },
    {
      icon: TrendingUp,
      value: "40%",
      label: "Cost Reduction",
      description: "Average operational savings",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Reliability",
      description: "System uptime guarantee",
    },
    {
      icon: Zap,
      value: "3x",
      label: "Faster Delivery",
      description: "Improved processing speed",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/white-bg.png')] opacity-30"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div >
            <Tagline variant="center">Industry Transformation</Tagline>
          </motion.div>
          
          <motion.h2 
            
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight"
          >
            Revolutionizing Global{" "}
            <span className="text-primary relative">
              Supply Chain
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            Networks
          </motion.h2>
          
          <motion.p 
            
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter"
          >
            In a world defined by fluctuating demand, rising costs, and evolving customer expectations, 
            traditional systems fall short. Businesses need intelligent, connected, and resilient supply 
            chains to stay competitive in today's dynamic marketplace.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-dm-sans"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-sm font-semibold text-primary mb-1 font-space-grotesk">
                  {stat.label}
                </div>
                
                <div className="text-xs text-muted-foreground font-inter">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-urbanist">Discover Our Solutions</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
