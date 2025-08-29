"use client";

import { motion } from "framer-motion";
import { 
  Cloud, 
  Brain, 
  Users, 
  CreditCard, 
  Shield, 
  Radio,
  ChevronRight,
  Sparkles,
  Network
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

const solutions = [
  {
    icon: Cloud,
    title: "Network Modernization",
    subtitle: "Cloud-Native & 5G-Ready",
    description: "Cloud-native and 5G-ready platforms that scale effortlessly to meet growing demand.",
    features: ["Microservices Architecture", "Auto-scaling Infrastructure", "Edge Computing"],
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    tag: "Infrastructure"
  },
  {
    icon: Brain,
    title: "AI-Driven Operations",
    subtitle: "Predictive Intelligence",
    description: "Predictive monitoring and automated fault detection to reduce downtime and enhance service reliability.",
    features: ["Predictive Analytics", "Automated Fault Detection", "Smart Maintenance"],
    gradient: "from-purple-600 via-violet-500 to-indigo-500",
    iconBg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    tag: "AI & ML"
  },
  {
    icon: Users,
    title: "Customer Experience Platforms",
    subtitle: "Mobile-First Solutions",
    description: "Unified portals and mobile-first solutions that put customer convenience at the center.",
    features: ["Unified Portals", "Mobile Apps", "Omnichannel Support"],
    gradient: "from-green-600 via-emerald-500 to-teal-500",
    iconBg: "bg-green-500/10",
    borderColor: "border-green-500/20",
    tag: "CX Platform"
  },
  {
    icon: CreditCard,
    title: "Smart Billing & Revenue",
    subtitle: "Automated Management",
    description: "Automated, transparent billing systems that increase accuracy and customer trust.",
    features: ["Real-time Billing", "Revenue Optimization", "Fraud Prevention"],
    gradient: "from-orange-600 via-amber-500 to-yellow-500",
    iconBg: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    tag: "FinTech"
  },
  {
    icon: Shield,
    title: "Regulatory & Security",
    subtitle: "Compliance Frameworks",
    description: "Compliance-ready platforms with advanced data protection and fraud prevention.",
    features: ["GDPR Compliance", "Data Encryption", "Security Monitoring"],
    gradient: "from-red-600 via-rose-500 to-pink-500",
    iconBg: "bg-red-500/10",
    borderColor: "border-red-500/20",
    tag: "Security"
  },
  {
    icon: Radio,
    title: "IoT & Edge Enablement",
    subtitle: "Connected Ecosystems",
    description: "Infrastructure to support IoT ecosystems, from connected homes to industrial networks.",
    features: ["Edge Computing", "IoT Platforms", "Industrial Networks"],
    gradient: "from-indigo-600 via-blue-500 to-purple-500",
    iconBg: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    tag: "IoT"
  }
];

export default function SolutionsSection() {
  return (
    <section className="section-bg-techstack py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Tagline variant="center">COMPREHENSIVE SOLUTIONS</Tagline>
            <h2 className="section-title mb-6">
              Solutions We{" "}
              <span className="text-primary">Power</span>
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Transforming telecom challenges into competitive advantages with cutting-edge 
              technology solutions designed for the future of connectivity.
            </p>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`h-full hover:${solution.borderColor} transition-all duration-500 border-border/50 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm overflow-hidden relative`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${solution.iconBg} text-primary border ${solution.borderColor}`}>
                    {solution.tag}
                  </span>
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon Section */}
                  <div className="mb-6">
                    <motion.div
                      className={`w-16 h-16 ${solution.iconBg} rounded-2xl flex items-center justify-center border ${solution.borderColor} relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <solution.icon className="w-8 h-8 text-primary" />
                      
                      {/* Sparkle Effect */}
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ 
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-sm font-medium text-primary/70 mb-3">
                      {solution.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.5 + index * 0.1 + featureIndex * 0.1 
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${solution.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
            <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <motion.div
                  className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Network className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                  Ready to Power Your Telecom Transformation?
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Let's discuss how our solutions can address your specific challenges and accelerate your digital journey.
                </p>
                <Button size="lg" className="animate-shine">
                  Start Your Transformation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
