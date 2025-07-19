"use client";

import Image from "next/image";
import { LogoMarqueeConfig, Logo } from "@/app/lib/models/logoMarquee";

interface LogoMarqueeProps {
  config: LogoMarqueeConfig;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function LogoMarquee({
  config,
  speed,
  direction,
  className = "",
}: LogoMarqueeProps) {
  // Use props if provided, otherwise use config values
  const finalSpeed = speed || config.speed || 30;
  const finalDirection = direction || config.direction || "left";
  const activeLogos =
    config.logos?.filter((logo) => logo.isActive !== false) || [];

  const animationClass =
    finalDirection === "left"
      ? "animate-marquee-left"
      : "animate-marquee-right";

  // Don't render if no active logos or marquee is disabled
  if (!activeLogos.length || config.isActive === false) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      <div
        className={`flex ${animationClass}`}
        style={{ animationDuration: `${finalSpeed}s` }}
      >
        {/* First set */}
        {activeLogos.map((logo) => (
          <div
            key={`first-${logo.id}`}
            className="flex-shrink-0 mx-8 group cursor-pointer"
          >
            <div className="w-24 h-16 flex items-center justify-center transition-all duration-300">
              <Image
                src={logo.imageUrl || "/images/light-logo.webp"}
                alt={logo.name}
                width={100}
                height={100}
                className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/images/light-logo.webp";
                }}
              />
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {activeLogos.map((logo) => (
          <div
            key={`second-${logo.id}`}
            className="flex-shrink-0 mx-8 group cursor-pointer"
          >
            <div className="w-24 h-16 flex items-center justify-center transition-all duration-300">
              <Image
                src={logo.imageUrl || "/images/light-logo.webp"}
                alt={logo.name}
                width={100}
                height={100}
                className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/images/light-logo.webp";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
