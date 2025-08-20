"use client";

import { motion } from "framer-motion";
import { Star, Quote, Building2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    company: "Metro Banking Group",
    industry: "Retail Banking",
    logo: "MB",
    testimonial: "Eleserv transformed our legacy banking system into a modern, cloud-native platform. The automated compliance features alone saved us 40% in regulatory overhead costs.",
    author: "Sarah Chen",
    position: "CTO",
    rating: 5,
    metrics: {
      improvement: "40%",
      metric: "Compliance Cost Reduction"
    },
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    company: "Global Investment Partners",
    industry: "Investment Management",
    logo: "GIP",
    testimonial: "The AI-powered risk assessment tools have revolutionized our investment decisions. We've seen a 35% improvement in portfolio performance since implementation.",
    author: "Michael Rodriguez",
    position: "Chief Investment Officer",
    rating: 5,
    metrics: {
      improvement: "35%",
      metric: "Portfolio Performance"
    },
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    company: "SecureCredit Union",
    industry: "Credit Union",
    logo: "SCU",
    testimonial: "Their omnichannel customer experience platform unified our touchpoints perfectly. Customer satisfaction scores increased by 50% within six months.",
    author: "Lisa Thompson",
    position: "Head of Digital Experience",
    rating: 5,
    metrics: {
      improvement: "50%",
      metric: "Customer Satisfaction"
    },
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    company: "FinTech Innovations Ltd",
    industry: "Financial Technology",
    logo: "FTI",
    testimonial: "The automated loan processing system reduced our approval times from days to minutes. It's been a game-changer for our customer experience and operational efficiency.",
    author: "David Kumar",
    position: "CEO",
    rating: 5,
    metrics: {
      improvement: "90%",
      metric: "Faster Processing"
    },
    color: "from-orange-500 to-red-500"
  }
];

const stats = [
  {
    icon: Building2,
    value: "150+",
    label: "Financial Institutions Served",
    description: "From community banks to global investment firms"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Client Satisfaction Rate",
    description: "Consistently high ratings across all projects"
  },
  {
    icon: Users,
    value: "2M+",
    label: "End Users Impacted",
    description: "Improved experiences for millions of customers"
  }
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


export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
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
              Trusted by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover how leading financial institutions have transformed their 
              operations and enhanced customer experiences with our solutions.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Stats Section */}
          <motion.div  className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                
                return (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    className="text-center group"
                  >
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 group-hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        {stat.value}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h3>
              <p className="text-lg text-muted-foreground">
                Real results from real partnerships
              </p>
            </div>

            {/* Main Testimonial */}
            <div className="mb-12">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeTestimonial].color} opacity-5`} />
                
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-8">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed italic">
                    "{testimonials[activeTestimonial].testimonial}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[activeTestimonial].color} flex items-center justify-center text-white font-bold`}>
                        {testimonials[activeTestimonial].logo}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">
                          {testimonials[activeTestimonial].author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[activeTestimonial].position}
                        </div>
                        <div className="text-sm text-primary font-medium">
                          {testimonials[activeTestimonial].company}
                        </div>
                      </div>
                    </div>

                    {/* Metric */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-6 py-4 border border-border/50">
                      <div className="text-2xl font-bold text-foreground">
                        {testimonials[activeTestimonial].metrics.improvement}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeTestimonial].metrics.metric}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial Navigation */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                    activeTestimonial === index
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border bg-card/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {testimonial.logo}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {testimonial.company}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.industry}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-primary font-medium">
                    {testimonial.metrics.improvement} {testimonial.metrics.metric}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
