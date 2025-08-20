"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import MultiStepCard from "@/app/components/ui/MultiStepCard";
import { multiStepData } from "./multiStepData";

const SolutionsSection = () => {
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-gradient-to-r from-primary/2 to-accent/2 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Tagline variant="center">Smart Solutions</Tagline>

          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-dm-sans leading-tight">
            Our Solutions in{" "}
            <span className="text-primary relative">
              Motion
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>

          <motion.p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            We empower enterprises to reimagine logistics through cutting-edge
            technology, building systems that optimize operations, improve
            visibility, and deliver agility from sourcing to delivery.
          </motion.p>
        </motion.div>

        {/* Multi-Step Solutions Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <MultiStepCard multiStepData={multiStepData} />
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              delay: 0.3,
            }}
          >
            <Zap className="w-8 h-8" />
          </motion.div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-dm-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to Transform Your Supply Chain?
          </motion.h3>

          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover how our comprehensive solutions can streamline your
            operations, reduce costs, and create resilient supply chain networks
            that adapt to any challenge.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-urbanist">Start Your Transformation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-3 bg-card text-foreground border border-border px-8 py-4 rounded-full font-semibold hover:bg-muted hover:shadow-md transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-urbanist">Schedule Demo</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
