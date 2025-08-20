"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Users, Zap } from "lucide-react";
import { Button } from "../../ui/Button";
import Tagline from "../../ui/Tagline";

const stats = [
  { icon: TrendingUp, value: "40%", label: "Faster Processing" },
  { icon: Shield, value: "99.9%", label: "Security Uptime" },
  { icon: Users, value: "500K+", label: "Users Served" },
  { icon: Zap, value: "24/7", label: "Real-time Support" },
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function IntroSection() {
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div className="space-y-6">
                <Tagline variant="left">BFSI Transformation</Tagline>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Finance,{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h2>

                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Banking and financial services have entered a new era.
                    Customers are digital-first, compliance is tighter than
                    ever, and competition moves at the speed of technology.
                    Traditional systems can't keep up.
                  </p>
                  <p>
                    At Eleserv, we don't just modernize BFSI—we reinvent it. By
                    blending AI, automation, data-driven intelligence, and
                    secure cloud architectures, we help institutions deliver
                    faster, safer, and more personalized financial experiences.
                  </p>
                </div>
              </motion.div>

              <motion.div>
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={handleScrollToContact}
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Transformation
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Stats Grid */}
            <motion.div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
