"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Package, 
  Brain, 
  CreditCard, 
  Cloud,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import Tagline from "../../ui/Tagline";

const solutions = [
  {
    id: 1,
    icon: Globe,
    title: "Omnichannel Integration",
    shortDesc: "Unify web, mobile, and marketplace operations",
    fullDesc: "Seamlessly integrate all your sales channels into a unified platform that provides consistent customer experiences across web, mobile, social media, and marketplace platforms.",
    features: [
      "Unified inventory management",
      "Cross-channel customer data",
      "Consistent branding & messaging",
      "Real-time synchronization",
    ],
    color: "from-blue-500 to-cyan-500",
    bgImage: "/images/home/service-1.webp",
  },
  {
    id: 2,
    icon: Package,
    title: "Smart Inventory & Supply Chain",
    shortDesc: "Real-time visibility to optimize operations",
    fullDesc: "Advanced supply chain management with AI-powered demand forecasting, automated inventory optimization, and real-time tracking to minimize costs and maximize efficiency.",
    features: [
      "AI-powered demand forecasting",
      "Automated reorder points",
      "Real-time shipment tracking",
      "Supplier performance analytics",
    ],
    color: "from-green-500 to-emerald-500",
    bgImage: "/images/home/service-2.webp",
  },
  {
    id: 3,
    icon: Brain,
    title: "Personalized Shopping Journeys",
    shortDesc: "AI-driven recommendations and campaigns",
    fullDesc: "Leverage machine learning algorithms to deliver personalized product recommendations, dynamic pricing, and targeted marketing campaigns that increase conversion rates.",
    features: [
      "ML-powered recommendations",
      "Dynamic pricing optimization",
      "Behavioral targeting",
      "A/B testing automation",
    ],
    color: "from-purple-500 to-pink-500",
    bgImage: "/images/home/service-3.webp",
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Secure Payments & Fraud Prevention",
    shortDesc: "Robust, compliant checkout experiences",
    fullDesc: "Multi-gateway payment processing with advanced fraud detection, compliance management, and seamless checkout experiences that build customer trust.",
    features: [
      "Multi-gateway integration",
      "Real-time fraud detection",
      "PCI DSS compliance",
      "One-click checkout",
    ],
    color: "from-orange-500 to-red-500",
    bgImage: "/images/home/service-4.webp",
  },
  {
    id: 5,
    icon: Cloud,
    title: "Scalable Cloud Infrastructure",
    shortDesc: "Handle seasonal surges and global expansion",
    fullDesc: "Auto-scaling cloud infrastructure that handles traffic spikes, ensures 99.9% uptime, and provides global CDN capabilities for lightning-fast performance worldwide.",
    features: [
      "Auto-scaling architecture",
      "Global CDN network",
      "99.9% uptime guarantee",
      "Performance monitoring",
    ],
    color: "from-indigo-500 to-purple-500",
    bgImage: "/images/home/service-5.webp",
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

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const detailVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function TailoredSolutions() {
  const [activeSolution, setActiveSolution] = useState(solutions[0]);

  return (
    <section className="section-bg-services relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <Tagline variant="center">Tailored Solutions</Tagline>
          
          <h2 className="section-title mb-6">
            Solutions for&nbsp;
            <span className="highlight">E-Commerce Leaders</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We design and deliver capabilities that matter most for digital businesses,
            ensuring your platform scales with your ambitions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Solution Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {solutions.map((solution) => (
              <motion.div
                key={solution.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveSolution(solution)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeSolution.id === solution.id
                    ? 'ring-2 ring-primary/50'
                    : ''
                }`}
              >
                <Card className={`bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 ${
                  activeSolution.id === solution.id
                    ? 'bg-primary/5 border-primary/30'
                    : ''
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0`}>
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-lg mb-2 flex items-center justify-between">
                          {solution.title}
                          <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                            activeSolution.id === solution.id ? 'rotate-90' : ''
                          }`} />
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {solution.shortDesc}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Solution Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:sticky lg:top-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                variants={detailVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-border/50 overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url(${activeSolution.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  <CardContent className="relative z-10 p-8">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeSolution.color} flex items-center justify-center`}>
                        <activeSolution.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {activeSolution.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                      {activeSolution.fullDesc}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        Key Features:
                      </h4>
                      {activeSolution.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="mt-8 pt-6 border-t border-border/50"
                    >
                      <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-32 right-12 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 left-12 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
}
