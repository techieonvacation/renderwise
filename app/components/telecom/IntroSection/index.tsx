"use client";

import { motion } from "framer-motion";
import { Signal, Wifi, Smartphone, Globe, Users, Building2 } from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Badge } from "@/app/components/ui/Badge";

const FloatingIcon = ({ 
  icon: Icon, 
  delay, 
  position 
}: { 
  icon: any; 
  delay: number; 
  position: string 
}) => (
  <motion.div
    className={`absolute ${position} opacity-20 text-primary`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2], 
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon size={24} />
  </motion.div>
);

export default function IntroSection() {
  const features = [
    {
      icon: Signal,
      title: "5G-Ready Infrastructure",
      description: "Next-generation networks built for speed and reliability"
    },
    {
      icon: Wifi,
      title: "Smart Connectivity",
      description: "Seamless integration across all communication channels"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Solutions",
      description: "Customer experiences optimized for mobile platforms"
    }
  ];

  return (
    <section className="section-bg-services py-16 lg:py-24 relative overflow-hidden">
      {/* Floating Background Icons */}
      <FloatingIcon icon={Globe} delay={0} position="top-20 left-10" />
      <FloatingIcon icon={Signal} delay={1} position="top-32 right-16" />
      <FloatingIcon icon={Users} delay={2} position="bottom-40 left-20" />
      <FloatingIcon icon={Building2} delay={0.5} position="bottom-20 right-10" />
      <FloatingIcon icon={Wifi} delay={1.5} position="top-40 left-1/3" />
      <FloatingIcon icon={Smartphone} delay={2.5} position="bottom-32 right-1/3" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Digital Transformation
              </Badge>
              <Tagline variant="left">TELECOM REVOLUTION</Tagline>
            </div>
            
            <motion.h2 
              className="section-title mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Connecting the Future of{" "}
              <span className="text-primary">Communication</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Telecom is the pulse of the digital world—driving everything from streaming 
              and mobile banking to smart cities and 5G-powered enterprises. Yet, the industry 
              faces constant pressure: soaring data demand, complex infrastructure, and the need 
              to deliver flawless customer experiences at scale.
            </motion.p>

            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              With advanced software solutions, we help telecom providers transform their 
              networks into intelligent, scalable, and customer-centric ecosystems.
            </motion.p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "99.9%", label: "Uptime Guarantee" },
                { value: "50%", label: "Faster Deployment" },
                { value: "24/7", label: "Support Coverage" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
