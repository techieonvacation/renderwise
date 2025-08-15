import React from "react";
import OfferCard from "./OfferCard";
import { offerData } from "./OfferData";
import { Strategy } from "./type";
import Tagline from "../../ui/Tagline";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { ArrowRightIcon } from "lucide-react";

const WhatWeOffer = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Tagline variant="center">What We Offer</Tagline>
          <h2 className="title">
            What We Offer&nbsp;
            <span className="highlight">Our IT Staffing Services</span>
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base font-thin lg:text-lg text-foreground text-center mb-8">
            We provide comprehensive IT staffing solutions to help you build and
            scale your technology teams. From flexible contract arrangements to
            rapid talent deployment, we ensure you get the right tech
            professionals when you need them most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerData.map((strategy: Strategy) => (
            <OfferCard
              key={strategy.title}
              icon={strategy.icon}
              title={strategy.title}
              description={strategy.description}
            />
          ))}
        </div>
        <div className="grid items-center justify-between grid-cols-1 md:grid-cols-2 gap-8 mt-12 lg:mt-20">
          <div className="space-y-4">
            <h2 className="title mb-4">
              Flexible, Skilled, and{" "}
              <span className="highlight">Scalable Talent Solutions</span>
            </h2>
            <p className="text-base lg:text-lg text-foreground font-urbanist">
              We provide end-to-end IT staffing support designed to be as agile
              as your business needs. Whether you require contract,
              contract-to-hire, or full-time placements, our flexible engagement
              models are tailored to your timelines, budgets, and goals. Our
              talent network spans across software engineers, cloud architects,
              AI/ML specialists, DevOps engineers, data analysts, and
              cybersecurity experts each rigorously evaluated for both technical
              excellence and cultural fit.
            </p>
            <p className="text-base lg:text-lg text-foreground font-urbanist">
              Beyond hiring, we ensure smooth integration with performance
              monitoring, onboarding assistance, and scalable support so your
              projects stay on track and your teams stay optimized.
            </p>
            <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon />}>
              Learn More
            </Button>
          </div>
          <div className="">
            <Image
              src="/images/hero/itstaff-slide3.png"
              alt="Flexible Talent"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="grid items-center justify-between grid-cols-1 md:grid-cols-2 gap-8 mt-12 lg:mt-20">
          <div className="">
            <Image
              src="/images/hero/itstaff-slide3.png"
              alt="Flexible Talent"
              width={500}
              height={500}
            />
          </div>
          <div className="space-y-4">
            <h2 className="title mb-4">
              Seamless Integration &{" "}
              <span className="highlight">Scalable Support</span>
            </h2>
            <p className="text-base lg:text-lg text-foreground font-urbanist">
              We don&apos;t just help you hire; we help you succeed. From
              onboarding and performance monitoring to smooth transitions and
              replacements, we provide end-to-end support that keeps your
              project on track and your team optimized.
            </p>
            <p className="text-base lg:text-lg text-foreground font-urbanist">
              Our seamless integration process ensures a smooth transition
              between team members, minimizing disruptions and maximizing
              productivity. We also offer scalable support to help you manage
              your team&apos;s growth and adapt to changing business needs.
            </p>
            <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon />}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
