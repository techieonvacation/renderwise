"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { LucideIcons } from "@/app/components/ui/Icon";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeServicesData } from "./constant";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/Card";
import Tagline from "@/app/components/ui/Tagline";

const Services: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="relative py-16 xl:py-20 bg-background overflow-hidden">
      <div className="container relative">
        {/* Header with Navigation Arrows */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col max-w-xl">
            <Tagline variant="left">{homeServicesData.subtitle.toUpperCase()}</Tagline>
            <h2 className="section-title">
              {homeServicesData.title}{" "}
              <span className="text-primary">{homeServicesData.highlight}</span>
            </h2>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-primary flex items-center justify-center cursor-pointer"
              aria-label="Previous slide"
            >
              <LucideIcons.ArrowLeft className="size-6 text-primary" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-primary flex items-center justify-center cursor-pointer"
              aria-label="Next slide"
            >
              <LucideIcons.ArrowRight className="size-6 text-primary" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className="service-slider -mx-4"
          >
            {homeServicesData.features.map((service, index) => (
              <div key={index} className="px-2 py-2">
                <motion.div
                  className="group h-[480px] cursor-pointer relative"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Card Container */}
                  <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Face */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <Card className="h-full overflow-hidden rounded-2xl">
                        <div className="h-52 relative overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index <= 3}
                          />
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-xl bg-gradient-to-br from-primary to-accent">
                            <service.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <CardTitle className="text-xl mb-3">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="mb-6 flex-1 line-clamp-3">
                            {service.description}
                          </CardDescription>
                          <motion.div
                            className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors"
                            animate={
                              hoveredIndex === index ? { x: [0, 5, 0] } : {}
                            }
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <span className="text-sm font-medium text-primary">
                              Learn More
                            </span>
                            <LucideIcons.ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <Card className="h-full overflow-hidden backdrop-blur-sm bg-card/90 rounded-2xl">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex-1">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-xl bg-gradient-to-br from-primary to-accent">
                              <service.icon className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-xl mb-4">
                              {service.title}
                            </CardTitle>
                            <div className="space-y-4">
                              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
                              <ul className="space-y-2">
                                {service.bulletPoints.map((point, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start space-x-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span>{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            className="mt-6"
                            rightIcon={
                              <LucideIcons.ArrowRight className="w-4 h-4" />
                            }
                          >
                            Get Started
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Services;
