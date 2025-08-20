"use client";

import { motion } from "framer-motion";
import { 
  Cloud, 
  Shield, 
  Brain, 
  Smartphone, 
  Cog, 
  Lock,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/Button";

const solutions = [
  {
    icon: Cloud,
    title: "Digital-First Banking",
    subtitle: "Cloud-ready, API-driven platforms",
    description: "Transform legacy systems into agile, scalable digital ecosystems that adapt to your growing business needs.",
    features: [
      "Microservices architecture",
      "API-first design",
      "Cloud-native infrastructure",
      "Real-time data synchronization"
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: CheckCircle,
    title: "Smarter Compliance",
    subtitle: "Automated KYC/AML processes",
    description: "Reduce manual overhead and regulatory risks with audit-ready governance tools and automated compliance workflows.",
    features: [
      "Automated KYC verification",
      "Real-time AML monitoring",
      "Audit trail management",
      "Regulatory reporting"
    ],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: Brain,
    title: "Data with Foresight",
    subtitle: "Predictive analytics platform",
    description: "Leverage AI for fraud detection, credit scoring, and customer insights that drive business decisions.",
    features: [
      "ML-powered fraud detection",
      "Predictive credit scoring",
      "Customer behavior analytics",
      "Risk assessment models"
    ],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Smartphone,
    title: "Experiences Without Friction",
    subtitle: "Omnichannel customer journeys",
    description: "Seamlessly connect mobile, web, and in-branch touchpoints for unified customer experiences.",
    features: [
      "Unified customer profiles",
      "Cross-channel consistency",
      "Personalized interfaces",
      "Real-time sync across platforms"
    ],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    icon: Cog,
    title: "Automation at Work",
    subtitle: "RPA-enabled workflows",
    description: "Accelerate claims, loans, and back-office operations with intelligent process automation.",
    features: [
      "Automated loan processing",
      "Claims management workflows",
      "Document processing",
      "Back-office optimization"
    ],
    gradient: "from-teal-500 to-green-500",
    bgGradient: "from-teal-500/10 to-green-500/10",
  },
  {
    icon: Lock,
    title: "Security at the Core",
    subtitle: "Advanced encryption & monitoring",
    description: "Complete financial data protection with advanced encryption and 24/7 security monitoring.",
    features: [
      "End-to-end encryption",
      "24/7 threat monitoring",
      "Zero-trust architecture",
      "Compliance-ready security"
    ],
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-500/10 to-purple-500/10",
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



export default function SolutionsInAction() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("get-in-touch");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div  className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Solutions{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                in Action
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to transform your financial services 
              and deliver exceptional customer experiences.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <motion.div
                  key={index}
               
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${solution.bgGradient} border border-border/50 rounded-2xl p-8 h-full backdrop-blur-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${solution.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-4">
                        {solution.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {solution.description}
                      </p>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                          height: isHovered ? "auto" : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {solution.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: isHovered ? 1 : 0,
                              x: isHovered ? 0 : -20
                            }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center space-x-2 text-sm text-muted-foreground"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`} />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className={`w-5 h-5 text-transparent bg-gradient-to-r ${solution.gradient} bg-clip-text`} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div 
            
            className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 border border-border/50 backdrop-blur-sm"
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Financial Services?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our solutions can be tailored to your specific needs and 
              accelerate your digital transformation journey.
            </p>
            <Button
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={handleScrollToContact}
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
