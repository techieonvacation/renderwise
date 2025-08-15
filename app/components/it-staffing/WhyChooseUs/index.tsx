"use client";

import { motion } from "framer-motion";
import { whyChooseData } from "./why-choose-data";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import Tagline from "../../ui/Tagline";

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">Why Choose Us</Tagline>
          <h2 className="title">
            Why Choose&nbsp;
            <span className="highlight">Us</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            {whyChooseData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={imageVariants}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden"
          >
            <Image
              src={whyChooseData.imageSrc}
              alt="Why Choose Us"
              fill
              className="object-contain object-center transform hover:scale-90 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
              quality={90}
            />
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {whyChooseData.features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "flex gap-4 p-2 sm:p-4 rounded-lg bg-background shadow-sm border border-border",
                  "hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-dm-sans",
                  "transform hover:-translate-y-1",
                  "group"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  <FaCheckCircle className="w-6 h-6 lg:w-7 lg:h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 font-dm-sans">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base font-dm-sans">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
