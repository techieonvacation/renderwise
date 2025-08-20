"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Shield, 
  Target,
  CheckCircle,
  ArrowUpRight,
  Zap,
  BarChart3
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";

const ImpactSection = () => {
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
        ease: "easeOut",
      },
    },
  };

  const metrics = [
    {
      icon: TrendingUp,
      value: "35%",
      label: "Forecasting Accuracy",
      description: "Improved demand prediction",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      icon: DollarSign,
      value: "40%",
      label: "Cost Reduction",
      description: "Operational expense savings",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      icon: Clock,
      value: "50%",
      label: "Faster Processing",
      description: "Automation efficiency gains",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600",
    },
    {
      icon: Shield,
      value: "99.5%",
      label: "System Reliability",
      description: "Network uptime guarantee",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-600",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Enhanced Visibility",
      description: "End-to-end transparency across the entire supply chain network",
    },
    {
      icon: CheckCircle,
      title: "Predictive Intelligence",
      description: "AI-powered insights for proactive decision-making and risk mitigation",
    },
    {
      icon: CheckCircle,
      title: "Operational Excellence",
      description: "Streamlined processes and automated workflows for maximum efficiency",
    },
    {
      icon: CheckCircle,
      title: "Adaptive Resilience",
      description: "Dynamic systems that respond and adapt to disruptions seamlessly",
    },
    {
      icon: CheckCircle,
      title: "Sustainable Growth",
      description: "Eco-friendly solutions supporting green logistics and sustainability goals",
    },
    {
      icon: CheckCircle,
      title: "Customer Satisfaction",
      description: "Exceeding expectations with faster deliveries and greater reliability",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/white-bg.png')] opacity-20"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/5 to-primary/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div >
            <Tagline variant="center">Measurable Results</Tagline>
          </motion.div>
          
          <motion.h2 
            
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight"
          >
            Driving{" "}
            <span className="text-primary relative">
              Meaningful Impact
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
            Supply chains become faster, smarter, and more resilient when powered by intelligent technology. 
            With end-to-end transparency and future-ready infrastructures, organizations can scale sustainably 
            while exceeding customer expectations.
          </motion.p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              <Card className="h-full border-2 border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardContent className="p-6 text-center relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${metric.bgColor} ${metric.textColor} mb-4 group-hover:scale-110 transition-all duration-300`}>
                    <metric.icon className="w-7 h-7" />
                  </div>
                  
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-dm-sans"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {metric.value}
                  </motion.div>
                  
                  <div className="text-sm font-semibold text-primary mb-1 font-space-grotesk">
                    {metric.label}
                  </div>
                  
                  <div className="text-xs text-muted-foreground font-inter">
                    {metric.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed font-inter">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Story */}
        <motion.div
          
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <BarChart3 className="w-8 h-8" />
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-dm-sans">
                  Future-Ready Logistics Excellence
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed font-inter">
                  The supply chain is no longer just about moving goods—it's about moving them smarter, 
                  safer, and more efficiently. Our solutions empower businesses to strengthen resilience, 
                  achieve sustainability, and deliver with precision.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-primary mb-1 font-dm-sans">85%</div>
                <div className="text-sm text-muted-foreground font-inter">Disruption Recovery</div>
              </motion.div>
              
              <motion.div 
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-accent mb-1 font-dm-sans">30%</div>
                <div className="text-sm text-muted-foreground font-inter">Carbon Reduction</div>
              </motion.div>
              
              <motion.div 
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-primary mb-1 font-dm-sans">60%</div>
                <div className="text-sm text-muted-foreground font-inter">Faster Delivery</div>
              </motion.div>
              
              <motion.div 
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-accent mb-1 font-dm-sans">98%</div>
                <div className="text-sm text-muted-foreground font-inter">Customer Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
