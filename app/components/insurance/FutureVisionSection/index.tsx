"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";

const futureFeatures = [
  {
    icon: "🤖",
    title: "AI-Powered Decision Making",
    description: "Intelligent systems that learn and adapt to improve outcomes over time."
  },
  {
    icon: "🌐",
    title: "Ecosystem Integration",
    description: "Seamless connectivity with partners, regulators, and third-party services."
  },
  {
    icon: "📱",
    title: "Mobile-First Experience",
    description: "Complete insurance services accessible from anywhere, anytime."
  },
  {
    icon: "🔮",
    title: "Predictive Analytics",
    description: "Anticipate customer needs and market trends before they happen."
  }
];

const FutureVisionSection = () => {
  return (
    <section className="py-16 md:py-24 section-bg-contact overflow-hidden">
      <div className="container">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Vision Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Future of Insurance
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Reimagining Insurance for{" "}
              <span className="highlight">Tomorrow</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Insurance is not just about protection—it's about building trust at scale. Our solutions 
              empower insurers to create agile, data-driven, and customer-first organizations that are 
              ready to thrive in a digital-first future.
            </p>

            <div className="space-y-6 mb-8">
              {futureFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                className="group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Transformation
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  →
                </motion.span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Case Studies
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 border-primary/20 relative overflow-hidden">
              <CardContent className="p-0 relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Ready to Lead the Digital Insurance Revolution?
                  </h3>
                  <p className="text-muted-foreground">
                    Join forward-thinking insurers who are already transforming their operations 
                    with our cutting-edge solutions.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { number: "250+", label: "Insurance Clients" },
                    { number: "99.9%", label: "System Uptime" },
                    { number: "50M+", label: "Claims Processed" },
                    { number: "15+", label: "Years Experience" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-4 rounded-lg bg-card/50 border border-border/30"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(var(--primary), 0.05)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {["ISO 27001", "SOC 2", "GDPR Ready", "24/7 Support"].map((badge, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 text-xs bg-success/10 text-success rounded-full border border-success/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓ {badge}
                    </motion.span>
                  ))}
                </div>
              </CardContent>

              {/* Background Decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </Card>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-sm"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full blur-sm"
              animate={{ 
                y: [0, 10, 0],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Section - Call to Action */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your insurance operations? Let's discuss how we can help you 
            build a future-ready, customer-centric insurance business.
          </p>
          
          <motion.div
            className="inline-flex items-center space-x-2 text-sm text-primary font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span>🚀</span>
            <span>Free consultation available</span>
            <span>•</span>
            <span>No commitment required</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureVisionSection;
