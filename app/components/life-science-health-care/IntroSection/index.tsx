"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Shield,
  Users,
  Zap,
  Microscope,
  HeartHandshake,
} from "lucide-react";
import { Button } from "../../ui/Button";
import Tagline from "../../ui/Tagline";

const stats = [
  { icon: Activity, value: "50%", label: "Faster Clinical Trials" },
  { icon: Shield, value: "99.9%", label: "Data Security" },
  { icon: Users, value: "1M+", label: "Patients Served" },
  { icon: Microscope, value: "24/7", label: "Research Support" },
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

      {/* Medical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-primary">
          <HeartHandshake className="w-32 h-32" />
        </div>
        <div className="absolute bottom-10 right-10 text-primary rotate-45">
          <Microscope className="w-24 h-24" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary">
          <Activity className="w-40 h-40" />
        </div>
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
                <Tagline variant="left">Healthcare Innovation</Tagline>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Health{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h2>

                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The life sciences and healthcare industry stands at the
                    intersection of innovation and responsibility. Patients
                    expect faster, more personalized care, researchers push for
                    quicker drug development, and providers must navigate strict
                    regulatory landscapes.
                  </p>
                  <p>
                    Outdated systems and fragmented data can no longer keep up
                    with the pace of transformation. At Eleserv, we bridge
                    the gap between cutting-edge technology and compassionate
                    care, creating solutions that save lives and accelerate
                    breakthrough discoveries.
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
                  Transform Healthcare Today
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
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
