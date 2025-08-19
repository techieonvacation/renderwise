"use client";

import type { Service } from "./type";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface StepCardProps {
  service: Service;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

export function StepCard({
  service,
  isActive,
  onClick,
  onHover,
}: StepCardProps) {
  const Icon = Icons[service.icon as keyof typeof Icons] as React.ElementType;

  if (!Icon) {
    console.warn(`Icon "${service.icon}" not found in lucide-react icons`);
    return null;
  }

  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer rounded-xl p-6 transition-all duration-300 shadow-md ${
        isActive ? "bg-primary text-primary-foreground" : "bg-primary/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`rounded-lg p-2 ${
              isActive ? "bg-background" : "bg-background"
            }`}
          >
            <Icon
              className={`h-6 w-6 ${
                isActive ? "text-primary" : "text-primary"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold">{service.title}</h3>
            <p
              className={`text-sm ${
                isActive ? "text-primary-foreground/70" : "text-foreground"
              }`}
            >
              {service.description}
            </p>
          </div>
        </div>
        <span
          className={`text-4xl lg:text-5xl font-bold ${
            isActive ? "text-gray-600" : "text-foreground/20"
          }`}
        >
          {service.number}
        </span>
      </div>
    </motion.div>
  );
}
