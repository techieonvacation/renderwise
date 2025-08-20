"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Eye, 
  DollarSign, 
  Shield, 
  Clock, 
  TrendingDown,
  ArrowRight,
  Zap
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";

const ChallengesSection = () => {
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const challenges = [
    {
      icon: AlertTriangle,
      title: "Siloed Operations",
      description: "Disconnected systems create data gaps and inefficiencies across the entire supply chain network.",
      color: "from-red-500/10 to-red-600/5",
      iconBg: "bg-red-500/10 text-red-600",
      borderColor: "border-red-200/50",
    },
    {
      icon: Eye,
      title: "Lack of Transparency",
      description: "Limited visibility into inventory, shipments, and processes leads to poor decision-making.",
      color: "from-blue-500/10 to-blue-600/5",
      iconBg: "bg-blue-500/10 text-blue-600",
      borderColor: "border-blue-200/50",
    },
    {
      icon: DollarSign,
      title: "High Transportation Costs",
      description: "Inefficient routing and resource utilization drive up operational expenses significantly.",
      color: "from-green-500/10 to-green-600/5",
      iconBg: "bg-green-500/10 text-green-600",
      borderColor: "border-green-200/50",
    },
    {
      icon: Shield,
      title: "Vulnerability to Disruptions",
      description: "Rigid systems struggle to adapt to unexpected changes and supply chain disruptions.",
      color: "from-purple-500/10 to-purple-600/5",
      iconBg: "bg-purple-500/10 text-purple-600",
      borderColor: "border-purple-200/50",
    },
    {
      icon: Clock,
      title: "Slow Response Times",
      description: "Manual processes and outdated systems delay critical business decisions and actions.",
      color: "from-orange-500/10 to-orange-600/5",
      iconBg: "bg-orange-500/10 text-orange-600",
      borderColor: "border-orange-200/50",
    },
    {
      icon: TrendingDown,
      title: "Customer Expectations Gap",
      description: "Growing demand for faster deliveries and greater reliability outpaces current capabilities.",
      color: "from-pink-500/10 to-pink-600/5",
      iconBg: "bg-pink-500/10 text-pink-600",
      borderColor: "border-pink-200/50",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl"></div>
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
            <Tagline variant="center">Industry Challenges</Tagline>
          </motion.div>
          
          <motion.h2 
            
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight"
          >
            The{" "}
            <span className="text-primary relative">
              Roadblocks
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            We Solve
          </motion.h2>
          
          <motion.p 
            
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter"
          >
            Supply chains face challenges that ripple across industries. With data-driven intelligence, 
            automation, and real-time tracking, these challenges turn into opportunities to build more 
            efficient, predictive, and customer-focused networks.
          </motion.p>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              <Card className={`h-full border-2 ${challenge.borderColor} hover:border-primary/30 transition-all duration-300 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${challenge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col items-start space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${challenge.iconBg} group-hover:scale-110 transition-all duration-300`}>
                      <challenge.icon className="w-7 h-7" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                        {challenge.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed font-inter text-sm">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Transition */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Zap className="w-8 h-8" />
          </motion.div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-dm-sans">
            Transform Challenges into Opportunities
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto font-inter">
            Our intelligent supply chain solutions turn these roadblocks into competitive advantages, 
            creating resilient networks that thrive in uncertainty.
          </p>
          
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-urbanist">Explore Our Solutions</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengesSection;
