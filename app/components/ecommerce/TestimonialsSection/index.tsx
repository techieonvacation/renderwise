"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import Tagline from "../../ui/Tagline";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  logo: string;
  image: string;
  content: string;
  rating: number;
  industry: string;
  results: {
    metric: string;
    value: string;
  }[];
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Chief Digital Officer",
    company: "FashionForward",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_1.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "The e-commerce transformation delivered by this team exceeded all our expectations. Our online revenue grew by 180% in just 8 months, and customer satisfaction scores reached an all-time high.",
    rating: 5,
    industry: "Fashion & Retail",
    results: [
      { metric: "Revenue Growth", value: "180%" },
      { metric: "Customer Satisfaction", value: "4.8/5" },
      { metric: "Page Load Speed", value: "2.3s" },
    ],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "E-commerce Director",
    company: "TechGadgets Pro",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_2.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "The personalization engine they built has revolutionized our customer experience. We're seeing 40% higher conversion rates and customers are staying engaged longer than ever before.",
    rating: 5,
    industry: "Electronics & Technology",
    results: [
      { metric: "Conversion Rate", value: "+40%" },
      { metric: "Cart Abandonment", value: "-35%" },
      { metric: "Customer Retention", value: "85%" },
    ],
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "CEO & Founder",
    company: "GreenLife Organics",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_3.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "Their omnichannel solution seamlessly integrated our online store with our physical locations. The inventory management system alone has saved us thousands in operational costs.",
    rating: 5,
    industry: "Health & Wellness",
    results: [
      { metric: "Operational Savings", value: "$50K+" },
      { metric: "Inventory Accuracy", value: "99.5%" },
      { metric: "Order Fulfillment", value: "24hrs" },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Head of Digital",
    company: "SportZone Elite",
    logo: "https://wpriverthemes.com/HTML/extech/assets/img/brand-logo/brandLogo1_4.svg",
    image:
      "https://kamleshyadav.com/wp/affiliate/wp-content/uploads/2018/07/testimonial1.jpg",
    content:
      "The mobile-first approach they implemented has been game-changing. Mobile conversions increased by 150%, and our app store ratings improved dramatically.",
    rating: 5,
    industry: "Sports & Fitness",
    results: [
      { metric: "Mobile Conversions", value: "+150%" },
      { metric: "App Store Rating", value: "4.9/5" },
      { metric: "Mobile Traffic", value: "75%" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.6,
      ease: "easeIn" as const,
    },
  },
};

export default function TestimonialsSection() {
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

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(interval);
  }, [current]);

  const currentTestimonial = testimonials[current];

  return (
    <section className="section-bg-testimonials relative overflow-hidden py-16 lg:py-24">
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <Tagline variant="center">Client Success Stories</Tagline>

          <h2 className="section-title mb-6">
            Transforming E-commerce&nbsp;
            <span className="highlight">Businesses Worldwide</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            See how our e-commerce solutions have helped businesses achieve
            exceptional growth and deliver outstanding customer experiences.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Content Side */}
              <div className="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Company Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={currentTestimonial.logo || "/placeholder.svg"}
                        alt={currentTestimonial.company}
                        width={80}
                        height={32}
                        className="h-8 w-auto object-contain"
                      />
                      <div className="h-8 w-px bg-border" />
                      <span className="text-sm text-muted-foreground">
                        {currentTestimonial.industry}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {currentTestimonial.rating}.0 / 5.0
                      </span>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/20" />
                      <p className="text-lg lg:text-xl leading-relaxed text-foreground pl-6">
                        {currentTestimonial.content}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
                      {currentTestimonial.results.map((result, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {result.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-muted-foreground">
                          {currentTestimonial.role},{" "}
                          {currentTestimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  <button
                    onClick={prev}
                    disabled={isTransitioning}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-foreground hover:bg-primary/20 transition-colors duration-200 disabled:opacity-50"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isTransitioning}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          current === index
                            ? "w-8 bg-primary"
                            : "w-2 bg-primary/30 hover:bg-primary/50"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    disabled={isTransitioning}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-foreground hover:bg-primary/20 transition-colors duration-200 disabled:opacity-50"
                    aria-label="Next testimonial"
                  >
                    Next
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="order-1 lg:order-2 relative h-64 lg:h-auto bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      E-commerce Success
                    </div>
                    <div className="text-muted-foreground">
                      Driving Growth Through Innovation
                    </div>
                  </div>
                </div>

                {/* Animated background elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear" as const,
                  }}
                  className="absolute top-4 right-4 w-8 h-8 border-2 border-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear" as const,
                  }}
                  className="absolute bottom-4 left-4 w-6 h-6 border-2 border-accent/30 rounded-full"
                />
              </div>
            </div>
          </Card>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Happy Clients", value: "500+" },
              { label: "Projects Delivered", value: "1200+" },
              { label: "Countries Served", value: "45+" },
              { label: "Success Rate", value: "99.5%" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-card/60 backdrop-blur-sm border-border/30 text-center p-6"
              >
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-20 left-8 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-20 right-8 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </section>
  );
}
