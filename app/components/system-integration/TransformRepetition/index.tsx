"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

const TransformRepetition = () => {
  const floatingElements = [
    { icon: Bot, delay: 0, position: "top-10 left-10" },
    { icon: Zap, delay: 0.2, position: "top-20 right-20" },
    { icon: TrendingUp, delay: 0.4, position: "bottom-20 left-16" },
    { icon: Shield, delay: 0.6, position: "bottom-10 right-10" },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.position} hidden lg:block`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: element.delay, duration: 0.8 }}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <element.icon className="w-16 h-16 text-primary/20" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8"
          >
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Business Process Automation
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Transform{" "}
            <span className="relative">
              <span className="text-primary">Repetition</span>
              <motion.div
                className="absolute inset-0 bg-primary/20 -skew-x-12"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}  
              />
            </span>{" "}
            into{" "}
            <span className="relative inline-block">
              Innovation
              <motion.div
                className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent/30 to-primary/30 -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Manual, repetitive processes drain time, introduce human error, and
            limit scalability. With our Business Process Automation services, we
            help you reimagine and redesign workflows using intelligent
            automation—freeing your teams to focus on higher-value tasks and
            innovation.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { value: "80%", label: "Time Saved" },
              { value: "95%", label: "Error Reduction" },
              { value: "60%", label: "Cost Savings" },
              { value: "24/7", label: "Automation" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              scrollToBottom={true}
              scrollTarget="#get-in-touch"
              className="group bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg"
            >
              Start Your Automation Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              scrollToBottom={true}
              scrollTarget="#get-in-touch"
              className="px-8 py-4 text-lg border-2 hover:bg-primary/5"
            >
              View Case Studies
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 500+ businesses worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Placeholder for client logos */}
              <div className="w-24 h-8 bg-muted rounded" />
              <div className="w-24 h-8 bg-muted rounded" />
              <div className="w-24 h-8 bg-muted rounded" />
              <div className="w-24 h-8 bg-muted rounded" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformRepetition;
