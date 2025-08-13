"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Rocket,
  Target,
  CheckCircle,
  Shield,
  Zap,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative bg-background overflow-hidden min-h-screen bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: "url(/images/banner-bg.png)" }}
    >
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/80 rounded-full"
            initial={{
              x: isClient
                ? Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200)
                : 0,
              y: isClient
                ? Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800)
                : 0,
            }}
            animate={{
              x: mousePosition.x + (Math.random() - 0.5) * 100,
              y: mousePosition.y + (Math.random() - 0.5) * 100,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--gray-300)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--gray-300)/0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px]" />

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary-100/30 rounded-full blur-3xl animate-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 180, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary-100 border border-primary-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-primary-700 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
            <span className="font-medium font-urbanist">
              Your Payment Powerhouse
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl lg:max-w-5xl space-y-6 sm:space-y-8"
          >
            {/* Animated Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight font-dm-sans tracking-tight">
              {[
                "Issue",
                "Your",
                "Own",
                "Branded Cards",
                "Unlock",
                "Global",
                "Spending",
                "Power",
              ].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`inline-block mr-2 sm:mr-4 ${
                    word === "Branded Cards" ? "highlight" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl sm:max-w-3xl mx-auto font-dm-sans px-4"
            >
              Transform your business into a card issuer. Provide custom
              physical and virtual cards to your customers, employees, or
              partners, enabling seamless, real-time payments worldwide, all
              under your brand.
            </motion.p>
          </motion.div>

          {/* Interactive CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-6 sm:space-y-8 w-full max-w-lg mx-auto"
          >
            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <Button
                variant={"primary"}
                size={"lg"}
                className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:py-4"
              >
                Launch Your Card Program
              </Button>
              <Button
                variant={"secondary"}
                size={"lg"}
                leftIcon={<PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:py-4"
              >
                Request a Demo
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                <span className="font-medium">99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                <span className="font-medium">AI-Powered Insights</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                <span className="font-medium">Deploy in Minutes</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="relative w-full max-w-3xl lg:max-w-4xl mx-auto mt-8"
          >
            <div className="relative bg-card/80 border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-sm">
              {/* Mock Dashboard */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-card-foreground font-semibold text-base sm:text-lg">
                    Payment Analytics
                  </h3>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-destructive rounded-full" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-warning rounded-full" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    {
                      label: "Revenue",
                      value: "$2.4M",
                      change: "+12%",
                      icon: CheckCircle,
                    },
                    {
                      label: "Transactions",
                      value: "45.2K",
                      change: "+8%",
                      icon: Shield,
                    },
                    {
                      label: "Success Rate",
                      value: "99.8%",
                      change: "+0.2%",
                      icon: Zap,
                    },
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="bg-muted/30 rounded-lg p-3 sm:p-4 border border-border/50 hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                          <div className="text-muted-foreground text-xs sm:text-sm font-medium">
                            {stat.label}
                          </div>
                        </div>
                        <div className="text-card-foreground text-lg sm:text-xl lg:text-2xl font-bold">
                          {stat.value}
                        </div>
                        <div className="text-success text-xs sm:text-sm font-medium">
                          {stat.change}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl sm:rounded-2xl blur-xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
