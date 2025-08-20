"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Microscope, 
  Shield, 
  Database, 
  Bot, 
  Lock,
  Users,
  Activity,
  FileCheck,
  Zap,
  Monitor,
  Cloud
} from "lucide-react";

const solutions = [
  {
    icon: Heart,
    title: "Connected Patient Care",
    description: "Platforms that integrate patient records, telehealth, and digital engagement for seamless healthcare experiences.",
    features: ["Unified Patient Portal", "Telehealth Integration", "Real-time Monitoring", "Digital Engagement"],
    gradient: "from-pink-500/20 to-red-500/20",
    iconColor: "from-pink-500 to-red-500",
  },
  {
    icon: Microscope,
    title: "Research Acceleration",
    description: "AI-driven analytics to reduce clinical trial timelines and optimize drug discovery processes.",
    features: ["AI-Powered Analytics", "Clinical Trial Management", "Drug Discovery Platform", "Predictive Modeling"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance Made Simple",
    description: "Automated systems aligned with HIPAA, FDA, GDPR, and other global standards for seamless compliance.",
    features: ["HIPAA Compliance", "FDA Validation", "GDPR Alignment", "Audit Trail Management"],
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "from-green-500 to-emerald-500",
  },
  {
    icon: Database,
    title: "Smart Data Management",
    description: "Secure, interoperable systems that unify medical, research, and operational data for actionable insights.",
    features: ["Data Integration", "Interoperability Standards", "Analytics Dashboard", "Real-time Insights"],
    gradient: "from-purple-500/20 to-indigo-500/20",
    iconColor: "from-purple-500 to-indigo-500",
  },
  {
    icon: Bot,
    title: "Automation in Operations",
    description: "RPA-led solutions for claims processing, medical billing, and back-office efficiency.",
    features: ["Claims Automation", "Medical Billing", "RPA Integration", "Workflow Optimization"],
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "from-orange-500 to-yellow-500",
  },
  {
    icon: Lock,
    title: "Healthcare Cybersecurity",
    description: "End-to-end frameworks protecting patient records and intellectual property with advanced encryption.",
    features: ["Advanced Encryption", "Threat Detection", "Zero Trust Architecture", "Compliance Monitoring"],
    gradient: "from-slate-500/20 to-gray-500/20",
    iconColor: "from-slate-500 to-gray-500",
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


export default function SolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Tech Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-primary">
          <Monitor className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-10 left-10 text-primary">
          <Cloud className="w-28 h-28 -rotate-12" />
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
          {/* Header */}
          <motion.div  className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Solutions
              </span>{" "}
              in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed specifically for the unique needs of life sciences 
              and healthcare organizations. From patient care to research acceleration, we deliver measurable results.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${solution.gradient} border border-border/50 rounded-2xl p-8 h-full backdrop-blur-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent group-hover:scale-150 transition-transform duration-500" />
                    </div>

                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {solution.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {solution.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {solution.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                              className="flex items-center text-xs text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mr-2 flex-shrink-0" />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div  className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Healthcare Operations?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our solutions are designed to integrate seamlessly with your existing infrastructure 
                while providing the scalability and security your organization needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Activity className="w-4 h-4 mr-2 text-primary" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  FDA Validated
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 mr-2 text-primary" />
                  Cloud-Ready
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
