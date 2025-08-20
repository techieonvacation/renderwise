"use client";

import { motion } from "framer-motion";
import {
  Quote,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Microscope,
  Building,
  Award,
  CheckCircle,
} from "lucide-react";

const testimonials = [
  {
    company: "Global Pharma Research",
    industry: "Pharmaceutical Research",
    logo: Building,
    quote:
      "Eleserv transformed our clinical trial management, reducing our drug discovery timeline by 45% while maintaining the highest compliance standards.",
    author: "Dr. Sarah Chen",
    role: "Chief Research Officer",
    results: [
      { metric: "45%", label: "Faster Discovery" },
      { metric: "99.9%", label: "Compliance Rate" },
      { metric: "$2.5M", label: "Cost Savings" },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    company: "MedTech Innovations",
    industry: "Medical Technology",
    logo: Heart,
    quote:
      "The patient-centric platform revolutionized our care delivery, improving patient satisfaction scores and reducing readmission rates significantly.",
    author: "Michael Rodriguez",
    role: "VP of Operations",
    results: [
      { metric: "87%", label: "Patient Satisfaction" },
      { metric: "30%", label: "Fewer Readmissions" },
      { metric: "24/7", label: "Care Monitoring" },
    ],
    gradient: "from-pink-500 to-red-500",
  },
  {
    company: "Healthcare Analytics Corp",
    industry: "Healthcare Data",
    logo: Microscope,
    quote:
      "Our data interoperability challenges disappeared overnight. Now we have unified insights across all our healthcare systems.",
    author: "Dr. Jennifer Park",
    role: "Chief Data Officer",
    results: [
      { metric: "100%", label: "Data Integration" },
      { metric: "60%", label: "Faster Insights" },
      { metric: "Zero", label: "Data Silos" },
    ],
    gradient: "from-green-500 to-emerald-500",
  },
];

const achievements = [
  {
    icon: Users,
    metric: "2M+",
    label: "Patients Served",
    description: "Lives improved through our healthcare technology solutions",
  },
  {
    icon: Building,
    metric: "150+",
    label: "Healthcare Organizations",
    description: "Leading institutions trust our innovative platforms",
  },
  {
    icon: TrendingUp,
    metric: "40%",
    label: "Average ROI",
    description: "Return on investment for our healthcare clients",
  },
  {
    icon: Award,
    metric: "99.9%",
    label: "Uptime Guarantee",
    description: "Mission-critical reliability for healthcare operations",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 text-primary">
          <Quote className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-primary">
          <Award className="w-28 h-28 -rotate-12" />
        </div>
      </div>

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Success Stories
              </span>{" "}
              from Healthcare Leaders
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover how leading healthcare organizations have transformed
              their operations, improved patient outcomes, and accelerated
              innovation with our technology solutions.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Achievements Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="text-center group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {achievement.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Testimonials */}
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => {
              const Logo = testimonial.logo;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${testimonial.gradient} group-hover:scale-150 transition-transform duration-700`}
                      />
                    </div>

                    <div className="relative">
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Testimonial Content */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg`}
                            >
                              <Logo className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-1">
                                {testimonial.company}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.industry}
                              </p>
                            </div>
                          </div>

                          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed relative">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/30" />
                            <span className="relative italic">
                              "{testimonial.quote}"
                            </span>
                          </blockquote>

                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">
                                {testimonial.author}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="lg:col-span-1">
                          <h4 className="text-lg font-bold text-foreground mb-6 text-center">
                            Key Results
                          </h4>
                          <div className="space-y-4">
                            {testimonial.results.map((result, resultIndex) => (
                              <motion.div
                                key={resultIndex}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.1 + resultIndex * 0.1,
                                }}
                                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-border/50 text-center group-hover:border-primary/30 transition-colors duration-300"
                              >
                                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                                  {result.metric}
                                </div>
                                <div className="text-sm font-medium text-foreground">
                                  {result.label}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-border/50">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join these industry leaders in transforming healthcare through
                innovative technology. Let's discuss how we can help you achieve
                similar breakthrough results.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  Proven Track Record
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Enterprise Security
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Rapid Implementation
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                  Measurable ROI
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
