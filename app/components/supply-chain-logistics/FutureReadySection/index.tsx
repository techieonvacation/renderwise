"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Rocket, 
  Shield, 
  Target, 
  Zap,
  CheckCircle,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Button } from "@/app/components/ui/Button";

const FutureReadySection = () => {
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

  const keyPrinciples = [
    {
      icon: Rocket,
      title: "Moving Smarter",
      description: "Intelligent routing and optimization for maximum efficiency",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Moving Safer",
      description: "Enhanced security and risk management throughout the supply chain",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Zap,
      title: "Moving Efficiently",
      description: "Streamlined processes that reduce waste and improve performance",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const nextSteps = [
    {
      icon: Calendar,
      title: "Schedule Consultation",
      description: "Book a free 30-minute consultation with our supply chain experts",
      action: "Book Now",
    },
    {
      icon: Phone,
      title: "Get Demo",
      description: "See our solutions in action with a personalized product demonstration",
      action: "Request Demo",
    },
    {
      icon: Mail,
      title: "Start Pilot",
      description: "Begin with a pilot project to experience the transformation firsthand",
      action: "Get Started",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/white-bg.png')] opacity-30"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div >
            <Tagline variant="center">The Future is Now</Tagline>
          </motion.div>
          
          <motion.h2 
            
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight"
          >
            Future-Ready{" "}
            <span className="text-primary relative">
              Logistics
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
            The supply chain is no longer just about moving goods—it's about moving them smarter, 
            safer, and more efficiently. Our solutions empower businesses to strengthen resilience, 
            achieve sustainability, and deliver with precision, even in the face of constant change.
          </motion.p>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {keyPrinciples.map((principle, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 space-y-4">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${principle.color} text-white group-hover:scale-110 transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <principle.icon className="w-8 h-8" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                  {principle.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed font-inter">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 100 
                }}
              >
                <Target className="w-8 h-8" />
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-dm-sans">
                  Ready to Transform Your Operations?
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed font-inter">
                  Join industry leaders who have already transformed their supply chains with our 
                  intelligent solutions. Experience the power of connected, resilient, and sustainable logistics.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                "Reduce operational costs by up to 40%",
                "Improve delivery times by 60%",
                "Achieve 99.9% system reliability",
                "Enable real-time visibility across networks",
                "Support sustainable business practices"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-inter">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {nextSteps.map((step, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                    {step.description}
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  {step.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-10 py-5 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-urbanist">Transform Your Supply Chain Today</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground mt-4 font-inter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join thousands of companies already using our solutions • Free consultation available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureReadySection;
