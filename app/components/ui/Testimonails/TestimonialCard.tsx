"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/app/lib/utils";

type TestimonialCardProps = {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    logo: string;
    image: string;
    content: string;
  };
  isActive?: boolean;
  className?: string;
};

export function TestimonialCard({
  testimonial,
  isActive = false,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm",
        "transition-all duration-500 ease-in-out",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className
      )}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 min-h-[400px]">
          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Company Logo */}
              <div className="mb-6 h-12">
                <Image
                  src={testimonial.logo || "/placeholder.svg"}
                  alt={testimonial.company}
                  width={140}
                  height={48}
                  className="h-full w-auto object-contain filter brightness-0 invert"
                />
              </div>

              {/* Quote and Content */}
              <div className="relative mb-6">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/30" />
                <p className="text-lg leading-relaxed text-foreground md:text-xl font-inter">
                  {testimonial.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-foreground font-urbanist">
                  {testimonial.name}
                </h4>
                <p className="text-muted-foreground font-inter">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-auto">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
