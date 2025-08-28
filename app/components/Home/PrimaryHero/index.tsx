"use client";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/app/components/ui/Button";
import { ArrowRightIcon } from "lucide-react";
import { SlideData } from "./api";

interface PrimaryHeroProps {
  heroData: SlideData[];
}

const PrimaryHero: React.FC<PrimaryHeroProps> = ({ heroData }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "ease-in-out",
  };

  // Don't render if no data
  if (!heroData || heroData.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        {heroData.map((slide) => (
          <div key={slide._id}>
            <div className="bg-background relative overflow-hidden xl:min-h-[660px]">
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Content Section - 5 columns */}
                  <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                    <div className="relative xl:pt-[100px] lg:pt-[70px] py-10 z-10 max-w-lg md:max-w-2xl">
                      {/* Subtitle with decorative lines */}
                      <h6 className="text-foreground text-base font-semibold mb-0 ml-[58px] relative z-10 leading-[42px]">
                        <span className="absolute w-[18px] h-[6px] bg-primary rounded-[3px] top-5 left-[-57px]"></span>
                        <span className="absolute w-[25px] h-[6px] bg-primary rounded-[3px] top-5 left-[-33px]"></span>
                        {slide.subTitle}
                      </h6>

                      {/* Main Title */}
                      <h1 className="text-foreground font-extrabold font-urbanist my-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.title}{" "}
                        <span className="text-primary inline-block">
                          {slide.highlightedWord}
                        </span>
                      </h1>

                      {/* Description */}
                      <p className="text-muted-foreground text-base font-light font-inter w-full">
                        {slide.desc}
                      </p>

                      {/* Buttons */}
                      <div className="flex items-center gap-2 mt-10">
                        {/* Get Started Button */}
                        <Link href="/contact-us" passHref>
                          <Button
                            variant={"primary"}
                            size={"sm"}
                            rightIcon={
                              <ArrowRightIcon className="size-4 sm:size-5" />
                            }
                            className="lg:hidden"
                          >
                            Get Started
                          </Button>
                        </Link>
                        <Link href="/contact-us" passHref>
                          <Button
                            variant={"primary"}
                            size={"lg"}
                            rightIcon={
                              <ArrowRightIcon className="size-4 sm:size-5" />
                            }
                            className="hidden lg:flex"
                          >
                            Get Started
                          </Button>
                        </Link>
                        {/* Meet Experts Button */}
                        <div className="inline-flex items-center">
                          <div className="flex items-center">
                            <Image
                              src={slide.profileImage}
                              alt="Expert Profile"
                              width={40}
                              height={40}
                              className="border-2 border-primary rounded-full mr-2 object-cover sm:w-12 sm:h-12"
                            />
                            <Link
                              href="/about"
                              className="text-foreground text-sm sm:text-base font-bold uppercase relative z-10 hover:text-primary transition-colors duration-300"
                            >
                              <span className="text-primary underline mr-1 text-sm sm:text-base">
                                MEET
                              </span>
                              Our Experts
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Rotating Decorative Shape */}
                      <div className="hero-left-shape lg:block hidden z-0 pointer-events-none">
                        <div className="">
                          <Image
                            src="/images/hero/hero-geo.png"
                            alt="Hero Shape"
                            width={680}
                            height={680}
                          />
                        </div>
                      </div>

                      {/* Custom Navigation Indicators */}
                      <div className="absolute -left-12 2xl:-left-18 top-1/2 transform -translate-y-1/2 z-20 xl:flex flex-col items-center hidden">
                        {/* Previous Text */}
                        <div
                          className="text-foreground text-[16px] leading-[28px] uppercase font-normal tracking-wide transform rotate-180"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          Previous
                        </div>

                        {/* Gradient Line */}
                        <div className="w-[2px] h-[166px] bg-gradient-to-t from-primary to-foreground mt-6"></div>
                        <div className="w-[2px] h-[166px] bg-gradient-to-t from-foreground to-primary mb-6"></div>

                        {/* Next Text */}
                        <div
                          className="text-foreground text-[16px] leading-[28px] uppercase font-normal tracking-wide transform rotate-180"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          Next
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Section - 7 columns */}
                  <div className="xl:col-span-7 lg:col-span-6 col-span-12 hidden lg:block">
                    <div className="absolute right-0 top-0 h-full w-[55%]">
                      {/* Main Hero Image */}
                      <div className="relative h-full">
                        <Image
                          src={slide.image}
                          alt="Hero Image"
                          width={1065}
                          height={800}
                          className="absolute right-0 h-full object-cover object-left"
                          priority
                        />
                        <Image
                          src="/images/hero/hero-rs.png"
                          alt="Hero Image"
                          width={439}
                          height={800}
                          className="absolute left-0 h-full w-auto"
                          priority
                        />
                      </div>

                      {/* Decorative Shape Behind Image */}
                      <div className="absolute top-[10px] right-0 z-0 lg:block hidden">
                        <div className="w-[439px] h-[800px] bg-gradient-to-r from-[#ff3c00]/10 to-transparent rounded-l-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PrimaryHero;
