"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, Shield, TrendingUp, Cpu } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import Tagline from "../../ui/Tagline";

const differences = [
  {
    icon: Clock,
    title: "Faster Checkouts & Operations",
    description: "Automation cutting down repetitive cycles for seamless customer experiences.",
    benefit: "Reduce checkout time by 60%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Data-Driven Personalization",
    description: "Boost customer engagement and loyalty with intelligent recommendations.",
    benefit: "Increase engagement by 40%",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Compliance & Fraud Protection",
    description: "Seamless compliance and fraud protection with audit-ready systems.",
    benefit: "99.9% fraud detection rate",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Operational Efficiency",
    description: "AI optimization reducing costs while scaling growth exponentially.",
    benefit: "Cut operational costs by 35%",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Cpu,
    title: "Future-Ready Platforms",
    description: "Keep your business competitive in evolving digital markets.",
    benefit: "Scale to 10x traffic instantly",
    color: "from-indigo-500 to-purple-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const iconVariants = {
  hidden: { rotate: -180, scale: 0 },
  visible: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
        ease: "easeOut" as const,
    },
  },
};

export default function DifferenceSection() {
  return (
    <section className="section-bg-capabilities relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <Tagline variant="center">The Difference We Deliver</Tagline>
          
          <h2 className="section-title mb-6">
            Beyond Transactions,&nbsp;
            <span className="highlight">Building Experiences</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Digital commerce isn't just about transactions—it's about building experiences that convert and retain.
            Our solutions ensure measurable results that transform your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {differences.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="h-full"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <motion.div
                    variants={iconVariants}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Benefit badge */}
                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2 mt-auto">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {item.benefit}
                    </span>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating visual elements */}
        <div className="absolute top-32 left-8 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-8 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-4 h-4 border-2 border-primary/30 rounded-full"
        />
        
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-6 h-6 border-2 border-accent/30 rounded-full"
        />
      </div>
    </section>
  );
}
