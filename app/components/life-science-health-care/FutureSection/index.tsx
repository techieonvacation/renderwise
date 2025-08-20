"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Microscope,
  Brain,
  Globe,
  Lock,
  Activity,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../ui/Button";

const values = [
  {
    icon: Shield,
    title: "Secure",
    description:
      "Enterprise-grade security protecting sensitive patient data and intellectual property",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Agile",
    description:
      "Rapidly adaptable solutions that evolve with changing healthcare regulations and needs",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Patient-Focused",
    description:
      "Every solution designed with patient outcomes and experiences at the core",
    gradient: "from-pink-500 to-red-500",
  },
];

const ecosystemFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description:
      "Machine learning algorithms that continuously improve patient care and research outcomes",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description:
      "Solutions that meet international healthcare standards and regulatory requirements",
  },
  {
    icon: Lock,
    title: "Zero Trust Security",
    description:
      "Advanced cybersecurity frameworks protecting against evolving threats",
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description:
      "Live data insights enabling immediate decision-making and intervention",
  },
];

const achievements = [
  "Accelerate time-to-market for life-saving treatments",
  "Reduce operational costs while improving care quality",
  "Ensure compliance with evolving global regulations",
  "Enable precision medicine through data integration",
  "Build trust through transparent, secure platforms",
  "Scale innovation across global healthcare networks",
];

export default function FutureSection() {
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-primary">
          <Sparkles className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-primary">
          <Globe className="w-28 h-28 -rotate-12" />
        </div>
        <div className="absolute top-1/2 right-10 text-primary">
          <Microscope className="w-20 h-20 rotate-45" />
        </div>
      </div>

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Healthier Tomorrow
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our solutions bridge the gap between science, care, and
              technology. By creating ecosystems that are secure, agile, and
              patient-focused, we help healthcare and life sciences
              organizations deliver innovation at speed, ensure trust, and make
              a lasting impact on human health.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Core Values */}
          <motion.div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${value.gradient} group-hover:scale-125 transition-transform duration-500`}
                      />
                    </div>

                    <div className="relative">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {value.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Ecosystem Features */}
          <motion.div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Complete Healthcare Technology Ecosystem
              </h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Our integrated platform delivers end-to-end solutions that
                transform every aspect of healthcare delivery and life sciences
                research.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecosystemFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Impact Achievements */}
          <motion.div className="mb-16">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-border/50 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Enabling Healthcare Organizations To
                </h3>
                <p className="text-muted-foreground text-lg">
                  Transform challenges into opportunities for better patient
                  outcomes and operational excellence
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div className="text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Shape the Future of Healthcare?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join the healthcare revolution. Let's build solutions that save
                lives, accelerate discovery, and create a healthier world for
                everyone.
              </p>

              <Button
                size="lg"
                variant="secondary"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={handleScrollToContact}
                className="bg-white text-primary hover:bg-white/90 border-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Healthcare Transformation
              </Button>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                <span>✓ HIPAA Compliant</span>
                <span>✓ FDA Validated</span>
                <span>✓ Enterprise Security</span>
                <span>✓ 24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
