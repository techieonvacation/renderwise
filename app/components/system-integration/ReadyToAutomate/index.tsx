"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowDown, 
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Users
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

const ReadyToAutomate = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const ctaOptions = [
    {
      id: "consultation",
      icon: Calendar,
      title: "Free Automation Audit",
      description: "30-minute consultation to identify automation opportunities",
      benefits: ["Process analysis", "ROI estimation", "Custom roadmap"],
      action: "Schedule Audit",
      highlight: "Most Popular",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-500/10",
      border: "border-blue-500/30"
    },
    {
      id: "demo",
      icon: MessageCircle,
      title: "Live Demo Session",
      description: "See our automation solutions in action with real examples",
      benefits: ["Live demonstration", "Q&A session", "Use case examples"],
      action: "Book Demo",
      highlight: "",
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-500/10",
      border: "border-green-500/30"
    },
    {
      id: "pilot",
      icon: Zap,
      title: "Pilot Project",
      description: "Start small with a proof-of-concept automation project",
      benefits: ["Risk-free trial", "Quick implementation", "Measurable results"],
      action: "Start Pilot",
      highlight: "Recommended",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      border: "border-orange-500/30"
    }
  ];

  const successMetrics = [
    { icon: Clock, value: "24-48hrs", label: "Average Response Time" },
    { icon: Users, value: "500+", label: "Successful Projects" },
    { icon: CheckCircle2, value: "98%", label: "Client Satisfaction" },
    { icon: Sparkles, value: "6 Months", label: "Average ROI Timeline" }
  ];

  const testimonialQuote = {
    text: "The automation solutions transformed our operations completely. We saw 75% reduction in manual work within the first quarter.",
    author: "Sarah Johnson",
    role: "Operations Director",
    company: "TechCorp Solutions"
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ready to Transform?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Automate{" "}
            <span className="relative">
              <span className="text-primary">What Slows You Down?</span>
              <motion.div
                className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-accent/30 -rotate-1"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.0 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Let's redesign your processes for speed, accuracy, and scale—so your business 
            runs smarter, not harder
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
          </motion.div>
        </div>

        {/* CTA Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              {option.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {option.highlight}
                  </span>
                </div>
              )}

              <Card className={`p-8 h-full transition-all duration-300 ${option.bgColor} ${option.border} 
                ${hoveredCard === index ? 'shadow-2xl scale-105' : 'hover:shadow-lg'} 
                backdrop-blur-sm border-2`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${option.color} text-white 
                    ${hoveredCard === index ? 'scale-110' : ''} transition-transform duration-300`}
                  >
                    <option.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.description}</p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {option.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className={`w-full group bg-gradient-to-r ${option.color} text-white 
                      hover:shadow-lg transition-all duration-300`}
                    size="lg"
                  >
                    {option.action}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <metric.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-16"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-4xl text-primary mb-4">"</div>
            <blockquote className="text-lg md:text-xl font-medium mb-6 leading-relaxed">
              {testimonialQuote.text}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">{testimonialQuote.author}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonialQuote.role} at {testimonialQuote.company}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border/50"
        >
          <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
          <p className="text-muted-foreground mb-6">
            Our automation experts are standing by to help you get started today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="group border-2 hover:bg-primary/5"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now: +1 (555) 123-4567
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group border-2 hover:bg-primary/5"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Live Chat Support
            </Button>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Join 500+ businesses already automating their success
          </p>
          <div className="flex justify-center items-center gap-6 opacity-60">
            {/* Placeholder for client logos */}
            <div className="w-20 h-6 bg-muted rounded" />
            <div className="w-20 h-6 bg-muted rounded" />
            <div className="w-20 h-6 bg-muted rounded" />
            <div className="w-20 h-6 bg-muted rounded" />
            <div className="w-20 h-6 bg-muted rounded" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToAutomate;
