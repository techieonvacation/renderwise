"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Shield, 
  Zap,
  BarChart3,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";

const metrics = [
  {
    icon: Clock,
    value: 40,
    suffix: "%",
    label: "Reduction in Processing Times",
    description: "Automated workflows streamline operations",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "Compliance Dashboard Uptime",
    description: "Real-time monitoring keeps you audit-ready",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: DollarSign,
    value: 35,
    suffix: "%",
    label: "Cost Reduction",
    description: "AI-powered insights optimize operations",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    value: 85,
    suffix: "%",
    label: "Customer Satisfaction",
    description: "Seamless digital experiences drive loyalty",
    color: "from-orange-500 to-red-500",
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: "Operational Excellence",
    description: "Streamlined processes reduce manual errors and increase efficiency across all business functions.",
    stats: ["40% faster processing", "60% fewer errors", "24/7 operations"],
  },
  {
    icon: Award,
    title: "Future-Ready Architecture",
    description: "Scalable digital infrastructure that grows with your business and adapts to market changes.",
    stats: ["Cloud-native design", "API-first approach", "Microservices ready"],
  },
  {
    icon: Zap,
    title: "Enhanced Customer Experience",
    description: "Personalized, omnichannel experiences that exceed customer expectations and drive engagement.",
    stats: ["Real-time responses", "Personalized services", "Unified touchpoints"],
  },
];

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ end, duration = 2000, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end * 100) / 100);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toFixed(end % 1 !== 0 ? 1 : 0)}
      {suffix}
    </span>
  );
}

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


export default function ImpactSection() {
  const [inView, setInView] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setInView(true)}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div  className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How We Make a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Difference
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transformation in BFSI is no longer abstract—it's measurable. Our solutions deliver 
              concrete results that impact your bottom line and customer satisfaction.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Metrics Grid */}
          <motion.div  className="mb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                
                return (
                  <motion.div
                    key={index}
           
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center group-hover:shadow-xl transition-all duration-300 h-full">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${metric.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        {inView ? (
                          <CountUp end={metric.value} suffix={metric.suffix} />
                        ) : (
                          "0" + metric.suffix
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {metric.label}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {metric.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Measurable Business Impact
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our technology solutions deliver tangible results across key business areas
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                
                return (
                  <motion.div
                    key={index}
         
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold text-foreground mb-4">
                        {benefit.title}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {benefit.description}
                      </p>
                      
                      <div className="space-y-2">
                        {benefit.stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                            <span className="text-sm text-foreground font-medium">
                              {stat}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quote Section */}
          <motion.div 
            
            className="mt-20 text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-12 border border-border/30"
          >
            <blockquote className="text-2xl md:text-3xl font-semibold text-foreground mb-6 italic">
              "With future-ready digital architectures, financial enterprises can scale securely 
              while delivering seamless, personalized experiences to their customers."
            </blockquote>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
