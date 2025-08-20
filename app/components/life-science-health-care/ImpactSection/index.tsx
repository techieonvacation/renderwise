"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Shield,
  DollarSign,
  Users,
  BarChart3,
  CheckCircle,
  Rocket,
  Award,
  Target,
} from "lucide-react";

const impacts = [
  {
    icon: Clock,
    title: "Research Cycles Shorten",
    description:
      "AI-powered insights reduce clinical trial timelines by up to 40%",
    metric: "40%",
    metricLabel: "Faster Trials",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Compliance Becomes Seamless",
    description: "Automated governance ensures 99.9% regulatory adherence",
    metric: "99.9%",
    metricLabel: "Compliance Rate",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Patient Care Improves",
    description:
      "Connected digital journeys enhance patient satisfaction scores",
    metric: "85%",
    metricLabel: "Patient Satisfaction",
    gradient: "from-pink-500 to-red-500",
  },
  {
    icon: DollarSign,
    title: "Costs Reduce",
    description:
      "Operational efficiency improvements lead to significant cost savings",
    metric: "30%",
    metricLabel: "Cost Reduction",
    gradient: "from-orange-500 to-yellow-500",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Measurable Results",
    description:
      "Track ROI with comprehensive analytics and reporting dashboards",
  },
  {
    icon: Rocket,
    title: "Future-Ready Platforms",
    description: "Scalable infrastructure that grows with your organization",
  },
  {
    icon: Award,
    title: "Industry Standards",
    description: "Solutions built to exceed healthcare industry benchmarks",
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "Targeted solutions addressing specific healthcare challenges",
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

export default function ImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-primary">
          <BarChart3 className="w-24 h-24 rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-primary">
          <TrendingUp className="w-32 h-32 -rotate-12" />
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
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How We Make a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Difference
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Digital transformation in life sciences and healthcare is no
              longer optional—it's measurable and essential. Our solutions
              deliver tangible results that transform how organizations operate
              and serve patients.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Impact Metrics */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${impact.gradient} group-hover:scale-150 transition-transform duration-500`}
                      />
                    </div>

                    <div className="relative">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${impact.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.8,
                          type: "spring",
                        }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                      >
                        {impact.metric}
                      </motion.div>

                      <div className="text-sm font-medium text-muted-foreground mb-4">
                        {impact.metricLabel}
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {impact.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {impact.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Benefits Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-border/50 backdrop-blur-sm">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="max-w-4xl mx-auto"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Transform Your Healthcare Impact Today
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Join leading healthcare organizations who have revolutionized
                  their operations with our innovative technology solutions. The
                  future of healthcare is data-driven, secure, and
                  patient-focused.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                    FDA Validated
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                    Enterprise Security
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                    24/7 Support
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
