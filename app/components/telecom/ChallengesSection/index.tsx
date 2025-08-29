"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Shield, Users, Settings, Zap } from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";

const challenges = [
  {
    icon: TrendingUp,
    title: "Exponential Data Growth",
    description: "Data traffic increases exponentially while infrastructure struggles to keep pace",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500",
    borderColor: "border-red-500/30"
  },
  {
    icon: Settings,
    title: "Legacy System Burden",
    description: "Outdated infrastructure weighs down agility and innovation capabilities",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/30"
  },
  {
    icon: Users,
    title: "Customer Experience Demands",
    description: "Rising expectations for seamless, instant, and personalized digital services",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
    borderColor: "border-green-500/30"
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Complex compliance requirements and evolving security standards",
    gradient: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-500",
    borderColor: "border-purple-500/30"
  },
  {
    icon: Zap,
    title: "Service Disruptions",
    description: "Downtime costs both revenue and customer trust in competitive markets",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-600",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: AlertTriangle,
    title: "Market Competition",
    description: "Fierce competition requiring constant innovation and cost optimization",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
    borderColor: "border-pink-500/30"
  }
];

export default function ChallengesSection() {
  return (
    <section className="section-bg-capabilities py-16 lg:py-24 relative">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Tagline variant="center">INDUSTRY CHALLENGES</Tagline>
            <h2 className="section-title mb-6">
              The Challenges on the{" "}
              <span className="text-primary">Line</span>
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              The telecom landscape is complex—legacy systems weigh down agility, data traffic 
              grows exponentially, and service disruptions can cost both revenue and trust. 
              Added to this are regulatory compliance requirements and fierce market competition.
            </p>
          </motion.div>
        </div>

        {/* Main Challenge Statement */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
            <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <motion.div
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AlertTriangle className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                  Technology is the enabler that turns these obstacles into opportunities
                </h3>
                <p className="text-lg text-muted-foreground">
                  Empowering providers to deliver seamless connectivity and personalized digital services
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`h-full group-hover:${challenge.borderColor} transition-all duration-300 border-border/50 hover:shadow-lg`}>
                <CardContent className="p-6">
                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${challenge.gradient} rounded-2xl flex items-center justify-center border ${challenge.borderColor}`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <challenge.icon className={`w-8 h-8 ${challenge.iconColor}`} />
                    </motion.div>
                    
                    {/* Floating Dots Animation */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6">
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${challenge.gradient.replace('/20', '')} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full border border-primary/20">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Ready to transform challenges into opportunities?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
