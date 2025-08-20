"use client";
import MultiStepCard from "../../ui/MultiStepCard";
import Tagline from "../../ui/Tagline";
import { features, multiStepData } from "./multiStepData";
import { motion } from "framer-motion";
import { CTA } from "../../ui/CTA";

export default function Services() {
  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">Services</Tagline>
          <h2 className="title">
            QA Automation&nbsp;
            <span className="highlight">Services</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            Our QA Automation services are designed to help you build and scale
            your QA automation testing capabilities.
          </p>
        </div>
        <MultiStepCard multiStepData={multiStepData} />

        {/* CTA */}
        <CTA
          variant="image"
          title="Deliver with Confidence"
          description="Partner with us to streamline your QA process, reduce manual effort, and elevate product quality so you can release faster, safer, and smarter."
          badge={{
            text: "Ready to Transform",
          }}
          primaryButton={{
            text: "Get Free Consultation",
            onClick: () => {},
          }}
          secondaryButton={{
            text: "Get Started Today",
            onClick: () => {},
          }}
          backgroundImage="/images/cta-bg.webp"
          className="mt-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`${feature.iconBg} p-3 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <ul className="space-y-2">
                    {feature.description.map((desc, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
