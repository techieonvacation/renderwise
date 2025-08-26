"use client";

import { motion, MotionProps } from "framer-motion";
import Image from "next/image";
import { FaLightbulb, FaUsers, FaChartLine, FaMedal } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import Tagline from "../ui/Tagline";

// Types
interface Stat {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface Value {
  title: string;
  description: string;
}

// Constants
const stats: Stat[] = [
  { number: "250+", label: "Employees Worldwide", icon: <FaUsers /> },
  { number: "15+", label: "Years of Innovation", icon: <FaLightbulb /> },
  { number: "98%", label: "Client Satisfaction", icon: <FaChartLine /> },
  { number: "40+", label: "Industry Awards", icon: <FaMedal /> },
];

const values: Value[] = [
  {
    title: "Innovation First",
    description:
      "We embrace cutting-edge technologies and methodologies to stay ahead of the curve.",
  },
  {
    title: "People Focused",
    description:
      "Our success is built on the diverse talents and perspectives of our global team.",
  },
  {
    title: "Excellence Driven",
    description:
      "We maintain the highest standards in everything we do, from code to customer service.",
  },
];

const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
};

// Component
export default function AboutUs() {
  return (
    <section className="py-10 lg:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          {...fadeInUp}
        >
          <Tagline variant="center">Join Our Mission</Tagline>
          <h1 className="section-title text-foreground mb-6 leading-tight">
            Pioneering the <span className="highlight">Future</span> of
            Technology
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where innovation meets excellence, and where your career aspirations
            become reality. Be part of a team that's shaping tomorrow's digital
            landscape.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm hover:-translate-y-2">
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary-hover rounded-full"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Building Tomorrow&apos;s{" "}
                  <span className="highlight">Solutions</span> Today
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  At{" "}
                  <span className="text-primary font-semibold">Renderwise</span>
                  , we&apos;re at the forefront of technological innovation. Our
                  commitment to excellence drives us to push boundaries and
                  create solutions that transform industries.
                </p>
                <p className="text-lg leading-relaxed">
                  We foster a culture of continuous learning and collaboration,
                  where every team member&apos;s contribution is valued and
                  celebrated. Our diverse workforce brings together the
                  brightest minds from around the globe.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="primary"
                className="group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Our Team
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View Open Roles
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3 opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl transform -rotate-1 opacity-50" />

            {/* Main image container */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src="https://img.freepik.com/free-photo/we-are-hiring-digital-collage_23-2149667064.jpg"
                alt="Our innovative workspace showcasing team collaboration and technology"
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 z-20">
              <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-pulse">
                <span className="text-sm font-semibold">
                  We&apos;re Hiring!
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
              Our Core <span className="highlight">Values</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work, culture, and the way we build
              lasting relationships with our team and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm group-hover:-translate-y-2">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="h-3 w-16 rounded-full bg-gradient-to-r from-primary via-accent to-primary-hover group-hover:w-20 transition-all duration-300" />
                      <div className="w-3 h-3 rounded-full bg-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h4 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h4>

                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {value.description}
                    </p>

                    {/* Decorative corner */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 border-2 border-primary/30 border-l-primary border-b-primary rounded-bl-lg ml-auto" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
