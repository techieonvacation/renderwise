"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Brain,
  Cpu,
  Network,
  Eye,
  Lightbulb,
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

const IntelligentSolutions = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();

  const intelligentFeatures = [
    {
      id: "ai-decision",
      title: "AI-Powered Decision Making",
      icon: Brain,
      description:
        "Machine learning algorithms that analyze patterns and make intelligent decisions in real-time",
      details: [
        "Natural language processing for document analysis",
        "Predictive analytics for proactive decision making",
        "Automated risk assessment and mitigation",
        "Self-learning algorithms that improve over time",
      ],
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "real-time-triggers",
      title: "Real-Time Triggers & Alerts",
      icon: Zap,
      description:
        "Instant response systems that trigger actions based on predefined conditions and thresholds",
      details: [
        "Event-driven architecture for instant responses",
        "Smart notification routing and escalation",
        "Multi-channel alert delivery (email, SMS, Slack)",
        "Conditional logic for complex trigger scenarios",
      ],
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-500/10",
    },
    {
      id: "adaptive-learning",
      title: "Adaptive Learning Systems",
      icon: Target,
      description:
        "Self-improving automation that learns from data patterns and user interactions",
      details: [
        "Continuous process optimization",
        "User behavior analysis and adaptation",
        "Performance monitoring and auto-tuning",
        "Anomaly detection and self-correction",
      ],
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-500/10",
    },
    {
      id: "intelligent-integration",
      title: "Intelligent Integration Hub",
      icon: Network,
      description:
        "Smart data orchestration that connects systems with contextual understanding",
      details: [
        "Semantic data mapping and transformation",
        "API versioning and backward compatibility",
        "Intelligent error handling and recovery",
        "Dynamic load balancing and optimization",
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const architectureComponents = [
    {
      name: "AI Engine",
      position: "top-1/4 left-1/4",
      icon: Brain,
      connections: [1, 2],
    },
    {
      name: "Rule Engine",
      position: "top-1/4 right-1/4",
      icon: Cpu,
      connections: [2, 3],
    },
    {
      name: "Data Lake",
      position: "bottom-1/4 left-1/4",
      icon: Eye,
      connections: [0, 3],
    },
    {
      name: "Integration Hub",
      position: "bottom-1/4 right-1/4",
      icon: Network,
      connections: [0, 1],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "300% Faster Processing",
      description:
        "Intelligent automation reduces processing time dramatically",
    },
    {
      icon: Eye,
      title: "Proactive Insights",
      description: "Predict issues before they impact your business",
    },
    {
      icon: CheckCircle,
      title: "99.9% Accuracy",
      description: "AI-driven validation ensures exceptional reliability",
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "Self-improving systems that evolve with your needs",
    },
  ];

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  React.useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % intelligentFeatures.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating, intelligentFeatures.length]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 mb-6"
          >
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Intelligent Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Integrated, Intelligent, and{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Scalable Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Our BPA solutions are not just about speed—they're about
            intelligence. By integrating AI, rule engines, and real-time
            triggers, we deliver systems that learn, adapt, and scale with your
            business. From automated decision-making to real-time alerts, we
            embed intelligence at every step of your operations.
          </motion.p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">
              Intelligent Automation Features
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                {isAnimating ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {isAnimating ? "Pause" : "Play"}
                </span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Tabs */}
            <div className="space-y-4">
              {intelligentFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                    activeFeature === index
                      ? `${feature.bgColor} border-2 border-primary/30 shadow-lg`
                      : "bg-card/50 hover:bg-card/80 border border-border/50"
                  }`}
                  onClick={() => {
                    setActiveFeature(index);
                    setIsAnimating(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        {feature.description}
                      </p>

                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Architecture Visualization */}
            <div className="relative h-96 bg-gradient-to-br from-muted/30 to-background rounded-2xl border border-border/50 overflow-hidden">
              <div className="absolute inset-4">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Architecture Components */}
                {architectureComponents.map((component, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${component.position} transform -translate-x-1/2 -translate-y-1/2`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  >
                    <div className="relative">
                      {/* Connections */}
                      {component.connections.map((connectionIndex) => {
                        const targetComponent =
                          architectureComponents[connectionIndex];
                        return (
                          <motion.div
                            key={connectionIndex}
                            className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-primary/60 to-transparent"
                            style={{
                              height: "100px",
                              transformOrigin: "top",
                              transform: `rotate(${45 * connectionIndex}deg)`,
                            }}
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1, delay: 1 + index * 0.1 }}
                          />
                        );
                      })}

                      {/* Component Node */}
                      <motion.div
                        className="w-16 h-16 bg-card rounded-xl border-2 border-primary/30 flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow:
                            activeFeature === index
                              ? "0 0 20px rgba(178, 46, 46, 0.3)"
                              : "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <component.icon
                          className={`w-6 h-6 ${
                            activeFeature === index
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.div>

                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-medium bg-card px-2 py-1 rounded border">
                          {component.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Animated Data Flow */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: `radial-gradient(circle at ${
                      50 + Math.sin(Date.now() / 1000) * 20
                    }% ${
                      50 + Math.cos(Date.now() / 1000) * 20
                    }%, rgba(178, 46, 46, 0.1) 0%, transparent 50%)`,
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm"
            >
              <benefit.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Powered by Advanced Technologies
            </h3>
            <p className="text-muted-foreground">
              We leverage cutting-edge AI and machine learning technologies to
              build intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "TensorFlow", icon: "🧠" },
              { name: "PyTorch", icon: "🔥" },
              { name: "Azure AI", icon: "☁️" },
              { name: "AWS ML", icon: "🚀" },
              { name: "OpenAI", icon: "🤖" },
              { name: "Kubernetes", icon: "⚙️" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-background/80 rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            scrollToBottom={true}
            scrollTarget="#get-in-touch"
            className="group bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent text-white px-8 py-4"
          >
            Explore Intelligent Automation
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntelligentSolutions;
