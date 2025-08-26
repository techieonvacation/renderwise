"use client";

import { useState, useEffect } from "react";
import { technologies } from "./constant";
import Tagline from "../../ui/Tagline";
import { cn } from "@/app/lib/utils";
import { useMediaQuery } from "@/app/lib/hooks/use-media-query";

export default function TechShowcaseVariant1() {
  const [hoveredCard, setHoveredCard] = useState<string | null>("ai");
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-rotate cards on mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Reset active index when switching between mobile and desktop
  useEffect(() => {
    setActiveIndex(0);
  }, [isMobile]);

  return (
    <section
      className="section-bg-capabilities min-h-screen py-10 md:py-16"
      aria-label="Our Capabilities"
    >
      <div className="container">
        <div className="flex flex-col justify-center items-center mb-6 md:mb-10 lg:mb-16 xl:mb-20">
          <Tagline variant="center" className="mb-2">
            Capabilities
          </Tagline>
          <h2 className="section-title">
            Our&nbsp;
            <span className="text-primary">Capabilities</span>
          </h2>
        </div>

        {/* Mobile View */}
        <div
          className={cn(
            "md:hidden space-y-4 px-2",
            "transition-all duration-300"
          )}
        >
          {technologies.map((tech, index) => (
            <div
              key={tech.id}
              className={cn(
                "relative rounded-2xl overflow-hidden transition-all duration-500",
                "h-[280px] cursor-pointer",
                "transform",
                index === activeIndex
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-50"
              )}
              onClick={() => setActiveIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={tech.title}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${tech.image})` }}
                aria-hidden="true"
              />

              {/* Overlay */}
              <div
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-b from-black/40 to-black/80"
                )}
              />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary-foreground">
                    {tech.title}
                  </h3>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed line-clamp-3">
                    {tech.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {index === activeIndex && (
                <div className="absolute bottom-0 left-0 h-1 bg-primary">
                  <div
                    className="h-full bg-primary-foreground transition-all duration-3000 ease-linear"
                    style={{
                      width: "100%",
                      animation: "progress 3s linear",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div
          className={cn(
            "hidden md:flex gap-4 h-[32rem] overflow-hidden",
            "transition-all duration-300"
          )}
        >
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer",
                "transition-all duration-700 ease-in-out",
                "group hover:shadow-lg dark:hover:shadow-primary/20",
                hoveredCard === tech.id ? "flex-[2]" : "flex-[0.5]"
              )}
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard("ai")}
              role="button"
              tabIndex={0}
              aria-expanded={hoveredCard === tech.id}
              aria-label={tech.title}
            >
              {/* Card Background */}
              <div
                className={cn(
                  "absolute inset-0 bg-card opacity-80",
                  "transition-opacity duration-700",
                  hoveredCard === tech.id ? "opacity-90" : "opacity-80"
                )}
              />

              {/* Background Image */}
              <div
                className={cn(
                  "absolute inset-0 bg-cover bg-center",
                  "transition-transform duration-700",
                  hoveredCard === tech.id ? "scale-105" : "scale-100"
                )}
                style={{
                  backgroundImage: `url(${tech.image})`,
                  transform: "scaleX(-1)",
                }}
                aria-hidden="true"
              />

              {/* Overlay */}
              <div
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-b from-black/40 to-black/60",
                  "transition-opacity duration-700",
                  hoveredCard === tech.id ? "opacity-70" : "opacity-40"
                )}
              />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* Expanded Content */}
                <div
                  className={cn(
                    "transition-all duration-500 flex flex-col justify-between h-full",
                    hoveredCard === tech.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                >
                  {hoveredCard === tech.id && (
                    <>
                      <h3 className="text-2xl font-bold text-primary-foreground">
                        {tech.title}
                      </h3>
                      <p className="text-primary-foreground/90 text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Collapsed Title */}
                <div
                  className={cn(
                    "transition-all duration-500",
                    hoveredCard === tech.id ? "opacity-0" : "opacity-100"
                  )}
                  aria-hidden={hoveredCard === tech.id}
                >
                  <h3 className="text-xl font-bold text-primary-foreground transform -rotate-90 origin-left whitespace-nowrap">
                    {tech.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
