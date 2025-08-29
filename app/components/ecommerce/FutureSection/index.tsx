"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  BarChart3, 
  Rocket, 
  Target,
  ArrowRight,
  Zap
} from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import Tagline from "../../ui/Tagline";

const futureFeatures = [
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description: "Advanced analytics and AI-driven insights that predict market trends and customer behavior.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Agile Technologies",
    description: "Cutting-edge tech stack that adapts quickly to market changes and customer demands.",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: Target,
    title: "Customer-Centric Design",
    description: "User experience design that puts customers at the center of every digital interaction.",
    gradient: "from-green-500 to-emerald-400",
  },
];

const benefits = [
  "Meaningful digital experiences",
  "Competitive marketplace advantage", 
  "Scalable growth solutions",
  "Future-ready platform architecture",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function FutureSection() {
  return (
    <section className="section-bg-contact relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16 text-center">
            <Tagline variant="center">Future of Digital Retail</Tagline>
            
            <h2 className="section-title mb-6">
              Shaping the Future of&nbsp;
              <span className="highlight">Digital Retail</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We don't just support your e-commerce journey—we help redefine it. By combining data intelligence,
              agile technologies, and customer-centric design, we ensure your brand delivers meaningful digital
              experiences that stand out in a competitive marketplace.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Features */}
            <motion.div variants={itemVariants} className="space-y-8">
              {futureFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Right side - Hero visual with benefits */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-border/30">
                {/* Floating elements */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full"
                />
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: '1s' }}
                  className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full"
                />
                
                {/* Main content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Your Digital Advantage
                    </h3>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Transform your business with solutions that deliver:
                  </p>

                  <div className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full group-hover:scale-150 transition-transform duration-300" />
                        <span className="text-foreground group-hover:text-primary transition-colors duration-300">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Your Transformation
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl" />
              </div>

              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -left-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-primary">250%</div>
                <div className="text-sm text-muted-foreground">ROI Increase</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl"
        />
      </div>
    </section>
  );
}
