"use client";

import { motion, MotionProps } from "framer-motion";
import Image from "next/image";
import { FaLightbulb, FaUsers, FaChartLine, FaMedal } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

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
    <section className="py-30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Pioneering the Future of Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            Where innovation meets excellence, and where your career aspirations
            become reality.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={stat.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 flex flex-col items-center justify-center"
              >
                <div className="text-secondary-foreground bg-secondary rounded-full p-4 text-3xl mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold text-foreground">
              Building Tomorrow&apos;s Solutions Today
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base">
              At Eleservsoftech, we&apos;re at the forefront of technological
              innovation. Our commitment to excellence drives us to push
              boundaries and create solutions that transform industries.
            </p>
            <p className="text-muted-foreground text-sm lg:text-base">
              We foster a culture of continuous learning and collaboration,
              where every team member&apos;s contribution is valued and
              celebrated. Our diverse workforce brings together the brightest
              minds from around the globe.
            </p>
            <Button size="lg" variant="primary" className="mt-4">
              Join Our Team
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary rounded-xl transform rotate-3 opacity-10" />
            <Image
              src="https://img.freepik.com/free-photo/we-are-hiring-digital-collage_23-2149667064.jpg"
              alt="Our innovative workspace"
              width={500}
              height={500}
              className="rounded-xl shadow-2xl relative z-10 object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {values.map((value) => (
            <Card key={value.title}>
              <div className="p-6 md:p-8">
                <div className="h-2 w-20 mb-6 rounded bg-gradient-to-r from-primary to-primary/80" />
                <h4 className="text-lg md:text-xl font-bold mb-4 text-foreground">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
