"use client";

import { useEffect, useState, useRef } from "react";
import { BarChart3, Users2, Zap, LucideIcon } from "lucide-react";
import Tagline from "@/app/components/ui/Tagline";
import { Card } from "@/app/components/ui/Card";

interface CounterItem {
  id: string;
  icon: string;
  end: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  color: string;
}

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({
  end,
  duration = 3000,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={counterRef}
      className="text-4xl md:text-5xl lg:text-6xl font-black"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function Counter() {
  const [counters, setCounters] = useState<CounterItem[]>([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await fetch("/api/counter");
        if (response.ok) {
          const data = await response.json();
          setCounters(data);
        }
      } catch (error) {
        console.error("Failed to fetch counters:", error);
      }
    };
    fetchCounters();
  }, []);

  const getIcon = (iconName: string): LucideIcon => {
    const icons: { [key: string]: LucideIcon } = {
      BarChart3,
      Users2,
      Zap,
    };
    return icons[iconName] || BarChart3;
  };

  return (
    <section className="py-10 lg:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <Tagline variant="center">PROVEN RESULTS</Tagline>
          <h2 className="section-title mb-3">
            Numbers That Define 
            <span className="text-primary">Our Success</span>
          </h2>
          <p className="section-subtitle">
            Every project we undertake is driven by measurable outcomes and
            client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counters.map((counter) => {
            const Icon = getIcon(counter.icon);
            return (
              <Card
                key={counter.id}
                className={`relative group rounded-2xl hover:border-${counter.color}/50 transition-all duration-300 p-8`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-3 bg-${counter.color}/10 rounded-lg border border-${counter.color}/20`}
                  >
                    <Icon className={`w-6 h-6 text-${counter.color}`} />
                  </div>
                  <div className="text-right">
                    <div
                      className={`w-2 h-2 bg-${counter.color} rounded-full animate-pulse`}
                    ></div>
                  </div>
                </div>
                <div className={`text-${counter.color} mb-3`}>
                  <AnimatedCounter
                    end={counter.end}
                    prefix={counter.prefix}
                    suffix={counter.suffix}
                  />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {counter.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {counter.description}
                </p>
                <div className="mt-6 h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${counter.color} to-accent rounded-full w-full transform origin-left animate-pulse`}
                  ></div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
