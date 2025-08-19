"use client";

import {
  CheckCircle,
  Clock,
  Code,
  Palette,
  Rocket,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import Tagline from "../../ui/Tagline";

export default function FlutterProcess() {
  const processSteps = [
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Consultation & Planning",
      description:
        "We start with a thorough analysis of your requirements, business goals, and technical specifications to create a comprehensive development roadmap.",
      step: "01",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description:
        "Our design team creates stunning, user-centric interfaces that ensure exceptional user experience across all platforms.",
      step: "02",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Cross-Platform Development",
      description:
        "Leveraging Flutter's power to build high-performance apps that work seamlessly on iOS, Android, Web, and Desktop.",
      step: "03",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Testing & QA",
      description:
        "Rigorous testing across all platforms to ensure bug-free, high-quality applications that meet your standards.",
      step: "04",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch & Maintenance",
      description:
        "Smooth deployment to app stores and ongoing support to keep your app updated and performing optimally.",
      step: "05",
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">Process</Tagline>
          <h2 className="title">
            Our Flutter&nbsp;
            <span className="highlight">Development Process</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            A proven methodology that ensures your Flutter app is built with
            precision, quality, and delivered on time.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${
                          step.color
                        } text-primary-foreground text-2xl font-bold mb-4 ${
                          index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                        }`}
                      >
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-primary-foreground shadow-lg transform hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Spacer for odd steps */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
