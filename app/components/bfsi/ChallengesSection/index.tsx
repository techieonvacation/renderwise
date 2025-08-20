"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Shield, Target, TrendingUp, Zap } from "lucide-react";

const challenges = [
  {
    icon: Clock,
    title: "Legacy Systems",
    description: "Outdated infrastructure slowing innovation and agility",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: Shield,
    title: "Rising Cyber Risks",
    description: "Increasing security threats demanding advanced protection",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Ever-changing Regulations",
    description: "Complex compliance requirements evolving rapidly",
    gradient: "from-yellow-500/20 to-green-500/20",
  },
];

const opportunities = [
  {
    icon: Target,
    title: "Agility & Speed",
    description: "Rapid response to market changes and customer needs",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: TrendingUp,
    title: "Resilient Growth",
    description: "Sustainable expansion with risk-aware decision making",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    icon: Zap,
    title: "Smart Decisions",
    description: "Data-driven insights for competitive advantage",
    gradient: "from-teal-500/20 to-green-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};



export default function ChallengesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
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
              From{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Obstacles
              </span>{" "}
              to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The BFSI sector today faces pressing challenges—legacy systems slowing innovation, 
              rising cyber risks, and ever-changing regulations. Customers demand personalization, 
              yet efficiency and compliance cannot be compromised.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Challenges Section */}
          <motion.div className="mb-20">  
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Current Challenges</h3>
              <p className="text-muted-foreground text-lg">
                Traditional approaches are no longer sufficient in today's digital landscape
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => {
                const Icon = challenge.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${challenge.gradient} border border-border/50 rounded-2xl p-8 h-full backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted border border-border mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-destructive" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-4">
                        {challenge.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Transformation Arrow */}
          <motion.div 
            className="flex justify-center mb-20"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </motion.div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping" />
            </div>
          </motion.div>

          {/* Opportunities Section */}
          <motion.div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Growth Engines</h3>
              <p className="text-muted-foreground text-lg">
                Eleserv turns these challenges into growth engines with technology that enables
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {opportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${opportunity.gradient} border border-border/50 rounded-2xl p-8 h-full backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-4">
                        {opportunity.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {opportunity.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
