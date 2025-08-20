"use client";

import { motion } from "framer-motion";
import {
  Search,
  Target,
  Code,
  Rocket,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useState } from "react";

const processSteps = [
  {
    id: "01",
    icon: Search,
    title: "Discovery & Analysis",
    description:
      "We begin with a comprehensive assessment of your current systems, processes, and business objectives.",
    duration: "1-2 weeks",
    activities: [
      "Business requirements gathering",
      "Technical infrastructure audit",
      "Risk assessment and compliance review",
      "Stakeholder interviews and workshops",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "02",
    icon: Target,
    title: "Strategy & Planning",
    description:
      "Based on our findings, we develop a tailored digital transformation roadmap aligned with your goals.",
    duration: "2-3 weeks",
    activities: [
      "Solution architecture design",
      "Technology stack selection",
      "Implementation timeline planning",
      "Resource allocation and budgeting",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "03",
    icon: Code,
    title: "Development & Integration",
    description:
      "Our expert team builds and integrates solutions using agile methodologies and best practices.",
    duration: "8-16 weeks",
    activities: [
      "Agile development sprints",
      "API integration and testing",
      "Security implementation",
      "Performance optimization",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "04",
    icon: Rocket,
    title: "Deployment & Go-Live",
    description:
      "We ensure smooth deployment with minimal disruption to your existing operations.",
    duration: "1-2 weeks",
    activities: [
      "Production deployment",
      "Data migration and validation",
      "User training and support",
      "Go-live monitoring",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    id: "05",
    icon: Users,
    title: "Support & Optimization",
    description:
      "Ongoing support and continuous optimization ensure your solutions evolve with your business.",
    duration: "Ongoing",
    activities: [
      "24/7 monitoring and support",
      "Performance analytics",
      "Feature enhancements",
      "Scaling and optimization",
    ],
    color: "from-teal-500 to-green-500",
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

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Proven{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transformation Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A structured approach that ensures successful implementation and
              measurable results for your BFSI digital transformation journey.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isLast = index === processSteps.length - 1;

              return (
                <motion.div key={index} className="relative">
                  {/* Connection Line */}
                  {!isLast && (
                    <div className="absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-border to-transparent hidden md:block" />
                  )}

                  <div
                    className="group cursor-pointer"
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div
                      className={`bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 transition-all duration-500 hover:shadow-xl ${
                        isActive ? "shadow-xl scale-105" : ""
                      }`}
                    >
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Left: Icon and Title */}
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div
                              className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                              {step.id}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                              {step.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Description */}
                        <div>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Right: Activities */}
                        <motion.div
                          className="space-y-3"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: isActive ? 1 : 0.7 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.activities.map((activity, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{
                                opacity: isActive ? 1 : 0.8,
                                x: isActive ? 0 : 10,
                              }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle
                                className={`w-4 h-4 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`}
                              />
                              <span className="text-sm text-foreground font-medium">
                                {activity}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-6 right-6"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight
                          className={`w-5 h-5 text-transparent bg-gradient-to-r ${step.color} bg-clip-text`}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div className="mt-16 text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 border border-border/30">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Begin Your Transformation?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's schedule a discovery session to understand your unique
              challenges and design a customized transformation roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Schedule Discovery Session
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-all duration-300"
              >
                Download Process Guide
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
