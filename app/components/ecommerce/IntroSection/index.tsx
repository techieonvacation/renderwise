"use client";

import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, Shield, Zap } from "lucide-react";
import Tagline from "../../ui/Tagline";

const features = [
  {
    icon: ShoppingCart,
    title: "Digital Commerce Excellence",
    description: "Building experiences that convert and retain customers in today's hyperconnected world.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth Solutions",
    description: "Streamline operations and drive measurable growth with intelligent digital solutions.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Seamless compliance and fraud protection with audit-ready systems.",
  },
  {
    icon: Zap,
    title: "Speed & Performance",
    description: "Faster checkouts and smoother operations with cutting-edge automation.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function IntroSection() {
  return (
    <section className="section-bg-services relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div variants={itemVariants}>
            <Tagline variant="center">Digital Commerce Excellence</Tagline>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="section-title mb-6"
          >
            Unlocking Digital Commerce&nbsp;
            <span className="highlight">Excellence</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            In today's hyperconnected world, e-commerce brands thrive only when speed, personalization, and trust
            converge. Eleserv empowers online retailers with scalable digital solutions that streamline operations,
            enhance customer journeys, and drive measurable growth.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Floating animation elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional visual elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  );
}
