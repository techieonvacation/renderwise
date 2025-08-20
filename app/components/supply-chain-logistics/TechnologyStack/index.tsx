"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Bot,
  BarChart3,
  Network,
  Cpu,
  Globe,
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";

const TechnologyStack = () => {
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

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const technologies = [
    {
      icon: Brain,
      name: "Artificial Intelligence",
      description:
        "Machine learning algorithms for predictive analytics and intelligent decision-making",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      delay: 0.1,
    },
    {
      icon: Database,
      name: "Big Data Analytics",
      description:
        "Advanced data processing and analytics for actionable business insights",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      delay: 0.2,
    },
    {
      icon: Cloud,
      name: "Cloud Computing",
      description:
        "Scalable cloud infrastructure for global supply chain management",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500/10",
      delay: 0.3,
    },
    {
      icon: Smartphone,
      name: "IoT Integration",
      description:
        "Smart sensors and connected devices for real-time monitoring",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      delay: 0.4,
    },
    {
      icon: Bot,
      name: "Robotic Process Automation",
      description: "Automated workflows and processes for maximum efficiency",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      delay: 0.5,
    },
    {
      icon: Shield,
      name: "Cybersecurity",
      description:
        "Enterprise-grade security for data protection and compliance",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10",
      delay: 0.6,
    },
    {
      icon: BarChart3,
      name: "Advanced Analytics",
      description:
        "Real-time dashboards and reporting for data-driven decisions",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-500/10",
      delay: 0.7,
    },
    {
      icon: Network,
      name: "Blockchain Technology",
      description:
        "Secure and transparent tracking across the supply chain network",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-500/10",
      delay: 0.8,
    },
  ];

  const coreFeatures = [
    {
      icon: Cpu,
      title: "Edge Computing",
      description:
        "Processing data closer to the source for faster response times",
    },
    {
      icon: Globe,
      title: "Global Connectivity",
      description:
        "Seamless integration across international supply chain networks",
    },
    {
      icon: Brain,
      title: "Predictive Intelligence",
      description: "AI-powered forecasting and risk assessment capabilities",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div>
            <Tagline variant="center">Technology Excellence</Tagline>
          </motion.div>

          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight">
            Powered by{" "}
            <span className="text-primary relative">
              Cutting-Edge
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            Technology
          </motion.h2>

          <motion.p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Our supply chain solutions leverage the latest technologies to
            create intelligent, connected, and resilient logistics networks that
            drive operational excellence and competitive advantage.
          </motion.p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: tech.delay,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative"
            >
              <motion.div
                className={`bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full ${tech.bgColor}/20 hover:${tech.bgColor}/40`}
                variants={floatingVariants}
                animate="floating"
                style={{ animationDelay: `${tech.delay}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 text-center space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${tech.bgColor} group-hover:scale-110 transition-all duration-300`}
                  >
                    <tech.icon
                      className={`w-8 h-8 bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                    {tech.name}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-inter">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {coreFeatures.map((feature, index) => (
            <motion.div key={index} className="group text-center space-y-4">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground mx-auto group-hover:scale-110 transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <feature.icon className="w-10 h-10" />
              </motion.div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-dm-sans">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed font-inter">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Integration */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <Network className="w-8 h-8" />
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-dm-sans">
            Integrated Technology Ecosystem
          </h3>

          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto font-inter">
            Our comprehensive technology stack works seamlessly together to
            create a unified, intelligent supply chain platform that scales with
            your business needs and adapts to market changes in real-time.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "99.9% Uptime",
              "Real-time Processing",
              "Global Scale",
              "Enterprise Security",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-sm font-semibold text-primary font-space-grotesk">
                  {feature}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
