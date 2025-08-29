"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  Network, 
  Smartphone, 
  Shield, 
  Brain, 
  Globe,
  ArrowRight,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

const futureFeatures = [
  {
    icon: Network,
    title: "6G & Beyond",
    description: "Preparing networks for next-generation connectivity standards",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Brain,
    title: "AI-Native Operations",
    description: "Fully autonomous network management and optimization",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-violet-500/20"
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    description: "Seamless worldwide communication infrastructure",
    color: "text-green-500",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Shield,
    title: "Quantum Security",
    description: "Next-level encryption and security protocols",
    color: "text-red-500",
    gradient: "from-red-500/20 to-pink-500/20"
  }
];

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Foundation Building",
    description: "Modernize core infrastructure and establish cloud-native foundations",
    timeline: "0-6 months",
    status: "current"
  },
  {
    phase: "Phase 2",
    title: "AI Integration",
    description: "Deploy predictive analytics and automated network management",
    timeline: "6-12 months",
    status: "upcoming"
  },
  {
    phase: "Phase 3",
    title: "Customer Excellence",
    description: "Launch unified platforms and enhanced customer experiences",
    timeline: "12-18 months",
    status: "future"
  },
  {
    phase: "Phase 4",
    title: "Innovation Leadership",
    description: "Implement cutting-edge technologies and market differentiation",
    timeline: "18+ months",
    status: "vision"
  }
];

export default function FutureSection() {
  return (
    <section className="section-bg-testimonials py-16 lg:py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Tagline variant="center">FUTURE INNOVATION</Tagline>
            <h2 className="section-title mb-6">
              Shaping Tomorrow's{" "}
              <span className="text-primary">Connectivity</span>
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Telecom is more than connectivity—it's the foundation of digital life. 
              Our solutions enable providers to innovate at scale, deliver unmatched 
              customer experiences, and build networks that are secure, adaptive, and future-ready.
            </p>
          </motion.div>
        </div>

        {/* Future Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Roadmap Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
              Your Digital Transformation Journey
            </h3>
            <p className="text-muted-foreground">
              A strategic roadmap to telecom excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < roadmapItems.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-border z-0" />
                )}

                <Card className={`relative z-10 h-full border-border/50 hover:border-primary/30 transition-all duration-300 ${
                  item.status === 'current' ? 'border-primary/50 bg-primary/5' : 'bg-card/50'
                } backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    {/* Phase Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'current' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        {item.phase}
                      </span>
                      {item.status === 'current' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Star className="w-5 h-5 text-primary fill-current" />
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <Zap className="w-3 h-3" />
                      {item.timeline}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            item.status === 'current' 
                              ? 'bg-primary' 
                              : item.status === 'upcoming'
                              ? 'bg-primary/50'
                              : 'bg-border'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: item.status === 'current' 
                              ? "100%" 
                              : item.status === 'upcoming'
                              ? "30%"
                              : "10%"
                          }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
            <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <motion.div
                  className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Rocket className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                  Ready to Lead the Future of Telecom?
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join industry leaders who are already transforming their networks with our 
                  cutting-edge solutions. The future of connectivity starts today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="animate-shine">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Network className="w-5 h-5 mr-2" />
                    View Case Studies
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-border">
                  {[
                    "5G Ready",
                    "Cloud Native",
                    "AI Powered",
                    "Enterprise Grade"
                  ].map((indicator, index) => (
                    <motion.span
                      key={index}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      {indicator}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
