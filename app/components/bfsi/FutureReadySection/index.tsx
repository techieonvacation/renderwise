"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { useState } from "react";

const partnerships = [
  {
    icon: Building2,
    title: "Strategic Partnership",
    description:
      "We become an extension of your team, working closely with your stakeholders to ensure success.",
    features: ["Dedicated team", "Regular reviews", "Aligned objectives"],
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description:
      "Continuous innovation keeps you ahead of the curve with emerging technologies and methodologies.",
    features: [
      "Latest technologies",
      "Best practices",
      "Future-proof solutions",
    ],
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Every solution is designed with measurable outcomes and tangible business value in mind.",
    features: ["Clear KPIs", "ROI tracking", "Success metrics"],
  },
];

const values = [
  {
    icon: CheckCircle2,
    title: "Security with Innovation",
    description:
      "Advanced protection without compromising on cutting-edge features",
  },
  {
    icon: CheckCircle2,
    title: "Compliance with Agility",
    description: "Regulatory adherence that enables rapid business adaptation",
  },
  {
    icon: CheckCircle2,
    title: "Customer Delight with Resilience",
    description:
      "Exceptional experiences built on rock-solid operational foundations",
  },
];

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

export default function FutureReadySection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
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
          <motion.div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Future of Finance
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Eleserv is more than a technology provider—we're a partner in
              shaping tomorrow's financial ecosystem. We design solutions that
              balance innovation with reliability.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Core Values */}
          <motion.div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Our Balanced Approach
              </h3>
              <p className="text-lg text-muted-foreground">
                We understand that financial services require the perfect
                balance of innovation and stability
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3 },
                    }}
                    className="group"
                  >
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center group-hover:shadow-lg transition-all duration-300 h-full">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-4">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Partnership Approach */}
          <motion.div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Eleserv
              </h3>
              <p className="text-lg text-muted-foreground">
                We're committed to your long-term success through strategic
                partnership and continuous innovation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {partnerships.map((partnership, index) => {
                const Icon = partnership.icon;
                const isHovered = hoveredCard === index;

                return (
                  <motion.div
                    key={index}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    className="group relative"
                  >
                    <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                      {/* Animated Background */}
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h4 className="text-xl font-bold text-foreground mb-4">
                          {partnership.title}
                        </h4>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {partnership.description}
                        </p>

                        {/* Features */}
                        <motion.div
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0.7 }}
                          transition={{ duration: 0.3 }}
                        >
                          {partnership.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: isHovered ? 1 : 0.8,
                                x: isHovered ? 0 : -10,
                              }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center space-x-3"
                            >
                              <Star className="w-4 h-4 text-accent" />
                              <span className="text-sm text-foreground font-medium">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 md:p-16 border border-border/50 backdrop-blur-sm relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-8 animate-pulse">
                <Users className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Shape the Future of Your Financial Services?
              </h3>

              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Join leading financial institutions who trust Eleserv to deliver
                secure, innovative, and scalable solutions that drive growth and
                customer satisfaction.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  scrollToBottom={true}
                  scrollTarget="#get-in-touch"
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Digital Transformation
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  scrollToBottom={true}
                  scrollTarget="#get-in-touch"
                >
                  Download Case Studies
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Proven Results</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
