"use client";
import { Database, Palette, Smartphone, Zap } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { useState } from "react";
import Tagline from "../../ui/Tagline";

export default function WhyFlutter() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const flutterFeatures = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Cross-Platform Development",
      description:
        "Write once, run everywhere. Build for iOS, Android, Web, and Desktop from a single codebase.",
      gradient: "from-blue-500 to-cyan-500",
      stats: "90% faster development",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Hot Reload & Fast Development",
      description:
        "See changes instantly with Flutter's hot reload feature. Accelerate your development cycle.",
      gradient: "from-yellow-500 to-orange-500",
      stats: "Sub-second reload",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Beautiful Native UI",
      description:
        "Create stunning, pixel-perfect interfaces that feel native on every platform.",
      gradient: "from-purple-500 to-pink-500",
      stats: "60fps performance",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Rich Ecosystem",
      description:
        "Access thousands of packages and plugins to extend your app's functionality.",
      gradient: "from-green-500 to-emerald-500",
      stats: "25,000+ packages",
    },
  ];
  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">Why Flutter</Tagline>
          <h2 className="title">
            Why Flutter is&nbsp;
            <span className="highlight">the Future</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            Discover the powerful features that make Flutter the preferred
            choice for modern app development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flutterFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start gap-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-primary-foreground transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="font-medium text-primary-foreground"
                    >
                      {feature.stats}
                    </Badge>
                  </div>
                </div>
                <div
                  className={`mt-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
