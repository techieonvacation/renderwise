"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Tagline from "../Tagline";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  logo: string;
  image: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "CTO",
    company: "NexGen Solutions",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_1.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "The digital transformation initiative led by this team has revolutionized our operations. Their strategic approach to implementing new technologies while ensuring minimal disruption to our business was impressive.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Head of Innovation",
    company: "TechForward",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_2.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "Their AI and machine learning solutions have given us a competitive edge in our market. The predictive analytics platform they built has transformed how we approach customer engagement and retention.",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "IT Director",
    company: "Enterprise Systems",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_3.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "The infrastructure modernization project was delivered on time and under budget. Their team's expertise in hybrid cloud environments ensured a seamless transition with zero downtime.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "CEO",
    company: "Digital Frontiers",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_4.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "From the initial consultation to ongoing support, their team has been exceptional. The custom software solution they developed has automated our core processes and significantly improved our operational efficiency.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="section-bg-testimonials relative overflow-hidden py-10 lg:py-16">
      <div className="container relative">
        <div className="max-w-4xl mx-auto mb-8 lg:mb-16 flex flex-col items-center justify-center">
          <Tagline variant="center">Testimonials</Tagline>
          <h2 className="section-title text-center mb-3">
            Transforming Businesses&nbsp;
            <span className="text-primary">Through Technology</span>
          </h2>
          <p className="section-subtitle text-center">
            See how we've helped leading organizations achieve their digital
            transformation goals
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl bg-background shadow-sm border border-border">
            <div className="grid md:grid-cols-2">
              <div className="order-2 p-8 md:order-1 md:p-12">
                <div className="mb-6 h-10">
                  <Image
                    src={testimonials[current].logo || "/placeholder.svg"}
                    alt={testimonials[current].company}
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain"
                  />
                </div>

                <div className="relative">
                  <Quote className="absolute -left-2 -top-2 h-10 w-10 text-primary-foreground/30" />
                  <p className="mb-6 text-lg leading-relaxed text-foreground md:text-xl">
                    {testimonials[current].content}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-foreground">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-muted-foreground">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="rounded-full bg-primary/10 p-3 text-foreground transition-all hover:bg-primary/20"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (isTransitioning) return;
                          setIsTransitioning(true);
                          setCurrent(index);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          current === index
                            ? "w-8 bg-primary"
                            : "w-2 bg-primary/30"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="rounded-full bg-primary/10 p-3 text-foreground transition-all hover:bg-primary/20"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <div className="order-1 h-64 md:order-2 md:h-auto">
                <div className="relative h-full w-full overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      fill
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent md:bg-gradient-to-r"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              { label: "Years of Excellence", value: "15+" },
              { label: "Clients Across The Globe", value: "200+" },
              { label: "Team Members", value: "150+" },
              { label: "Success Rate", value: "99.99%" },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-accent p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-accent-foreground  md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-accent-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
