"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  Shield,
  Zap,
  ArrowUp,
  Target,
  CheckCircle,
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({
  end,
  duration = 3000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = easeOutExpo * end;
      setCount(
        decimals > 0
          ? parseFloat(currentCount.toFixed(decimals))
          : Math.floor(currentCount)
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, decimals]);

  return (
    <div
      ref={counterRef}
      className="text-4xl md:text-5xl lg:text-6xl font-black text-primary"
    >
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </div>
  );
}

const impactMetrics = [
  {
    icon: TrendingUp,
    value: 40,
    suffix: "%",
    title: "Faster Service Rollouts",
    description: "Accelerated deployment of new services and features",
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Clock,
    value: 99.9,
    suffix: "%",
    title: "Reduced Downtime",
    description: "Improved network reliability and service availability",
    gradient: "from-green-600 to-emerald-500",
    iconBg: "bg-green-500/10",
    borderColor: "border-green-500/20",
    decimals: 1,
  },
  {
    icon: Users,
    value: 65,
    suffix: "%",
    title: "Enhanced Customer Engagement",
    description: "Better customer satisfaction and retention rates",
    gradient: "from-purple-600 to-violet-500",
    iconBg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: DollarSign,
    value: 35,
    suffix: "%",
    title: "Revenue Growth",
    description: "Increased revenue through smarter billing and insights",
    gradient: "from-orange-600 to-yellow-500",
    iconBg: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Predictive automation improves with intelligent systems",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Seamless Compliance",
    description: "Integrated governance makes regulatory adherence effortless",
    color: "text-green-500",
  },
  {
    icon: Target,
    title: "Future-Ready Platforms",
    description: "Networks stay ready for what's next—from 5G to beyond",
    color: "text-purple-500",
  },
];

export default function ImpactSection() {
  return (
    <section className="section-bg-counter py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Tagline variant="center">MEASURABLE RESULTS</Tagline>
            <h2 className="section-title mb-6">
              The Measurable <span className="text-primary">Impact</span>
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Telecom enterprises adopting intelligent systems experience
              transformative results across operations, customer satisfaction,
              and business growth.
            </p>
          </motion.div>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card
                className={`h-full hover:${metric.borderColor} transition-all duration-300 border-border/50 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm`}
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 ${metric.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 border ${metric.borderColor}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <metric.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Counter */}
                  <div className="mb-4">
                    <AnimatedCounter
                      end={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>

                  {/* Trend Indicator */}
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">
                      Trending Up
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Left - Benefits List */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-8">
              Why Choose Our Solutions?
            </h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-card rounded-xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Impact Statement */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
            <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-10">
                <motion.div
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-8 h-8 text-primary" />
                </motion.div>

                <h3 className="text-xl lg:text-2xl font-bold text-card-foreground mb-4">
                  Proven Track Record
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our solutions have helped telecom enterprises worldwide
                  achieve remarkable transformations, from faster deployments to
                  enhanced customer experiences.
                </p>

                {/* Achievement Tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "5G Implementation",
                    "Cloud Migration",
                    "AI Integration",
                    "Security Enhancement",
                  ].map((tag, index) => (
                    <motion.span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
