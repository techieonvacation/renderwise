"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Globe,
  Award,
  Zap,
  Target,
  Star,
} from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import Tagline from "../../ui/Tagline";

const stats = [
  {
    icon: TrendingUp,
    value: "150%",
    label: "Average Revenue Growth",
    description: "Increase in online sales within 6 months",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: Users,
    value: "85%",
    label: "Customer Retention Rate",
    description: "Improved customer loyalty and repeat purchases",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: ShoppingCart,
    value: "60%",
    label: "Faster Checkout Process",
    description: "Reduced cart abandonment and improved UX",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Globe,
    value: "40+",
    label: "Global Markets Reached",
    description: "Successful international expansion",
    color: "from-orange-500 to-red-400",
  },
];

const achievements = [
  {
    icon: Award,
    title: "Industry Recognition",
    description:
      "Top-rated e-commerce solutions provider for 3 consecutive years",
  },
  {
    icon: Zap,
    title: "Lightning Fast Implementation",
    description:
      "Average project delivery time reduced by 40% with our agile methodology",
  },
  {
    icon: Target,
    title: "Success Rate",
    description:
      "99.5% project success rate with measurable ROI for our clients",
  },
  {
    icon: Star,
    title: "Client Satisfaction",
    description: "4.9/5 average client satisfaction score across all projects",
  },
];

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

const statVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const achievementVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const numberCounter = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function ImpactSection() {
  return (
    <section className="section-bg-counter relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <Tagline variant="center">Measurable Impact</Tagline>

          <h2 className="section-title mb-6">
            Delivering&nbsp;
            <span className="highlight">Exceptional Results</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our e-commerce solutions deliver measurable business impact,
            transforming digital operations and driving sustainable growth for
            businesses worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 text-center relative">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <motion.div
                    variants={numberCounter}
                    className="text-4xl lg:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
                  <div
                    className="absolute bottom-2 left-2 w-1 h-1 bg-accent/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={achievementVariants}
              whileHover={{
                x: 10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-8 h-8 border border-primary/20 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border border-accent/20 rounded-full" />
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 backdrop-blur-sm border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your E-commerce Business?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join hundreds of successful businesses that have scaled their
              operations with our proven solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Started Today
              <TrendingUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Animated background shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" as const },
            scale: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }}
          className="absolute top-32 left-8 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg"
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" as const },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }}
          className="absolute bottom-32 right-8 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-lg"
        />
      </div>
    </section>
  );
}
