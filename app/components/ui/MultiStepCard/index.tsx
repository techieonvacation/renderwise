"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepCard } from "./Card";
import { MultiStepCardFeatures } from "./Features";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import type { Service } from "./type";

export default function MultiStepCard({
  multiStepData,
}: {
  multiStepData: Service[];
}) {
  const [activeService, setActiveService] = useState<Service>(multiStepData[0]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleServiceClick = useCallback(
    (service: Service) => {
      if (!isDesktop) {
        setActiveService(service);
      }
    },
    [isDesktop]
  );

  const handleServiceHover = useCallback(
    (service: Service) => {
      if (isDesktop) {
        setActiveService(service);
      }
    },
    [isDesktop]
  );

  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {multiStepData.map((service: Service) => (
            <StepCard
              key={service.id}
              service={service}
              isActive={activeService.id === service.id}
              onClick={() => handleServiceClick(service)}
              onHover={() => handleServiceHover(service)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl p-8"
          style={{
            backgroundImage: 'url("/images/multi-card-right-bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <MultiStepCardFeatures
              key={activeService.id}
              service={activeService}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
