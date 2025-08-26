"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/Card";
import {
  FaLaptop,
  FaPlane,
  FaGraduationCap,
  FaHeartbeat,
  FaPiggyBank,
  FaUsers,
  FaBaby,
  FaDumbbell,
  FaCoffee,
  FaHandHoldingHeart,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import Tagline from "../ui/Tagline";
import { CTA } from "../ui/CTA";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => (
  <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm hover:-translate-y-3 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-8 h-full flex flex-col relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />

      <div className="flex items-start space-x-6 mb-4">
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <div className="text-primary-foreground text-2xl">{icon}</div>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl bg-primary/20 group-hover:animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="mt-auto pt-4">
        <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  </Card>
);

export default function BenefitsAndPerks() {
  const benefits = [
    {
      icon: <FaLaptop />,
      title: "Flexible Remote Work",
      description:
        "Work from anywhere in the world with our remote-first culture. Enjoy a flexible schedule and maintain perfect work-life harmony.",
    },
    {
      icon: <FaPlane />,
      title: "Unlimited PTO",
      description:
        "Take the time you need with our unlimited paid time off policy. We trust you to manage your work and rest effectively.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Learning & Development",
      description:
        "$5,000 annual budget for professional growth. Access to premium learning platforms, conferences, and certification programs.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Premium Healthcare",
      description:
        "100% company-paid premium healthcare coverage including medical, dental, vision, and mental health support for you and dependents.",
    },
    {
      icon: <FaPiggyBank />,
      title: "Financial Benefits",
      description:
        "Competitive 401(k) matching up to 6%, stock options, and annual performance bonuses. Your future matters to us.",
    },
    {
      icon: <FaUsers />,
      title: "Team Collaboration",
      description:
        "Regular team retreats, virtual social events, and annual company gatherings to build lasting relationships.",
    },
    {
      icon: <FaBaby />,
      title: "Family Support",
      description:
        "Generous parental leave, fertility benefits, and adoption assistance. Family-friendly workplace policies.",
    },
    {
      icon: <FaDumbbell />,
      title: "Wellness Programs",
      description:
        "Monthly wellness stipend, virtual fitness classes, and meditation app subscriptions. Your wellbeing is our priority.",
    },
    {
      icon: <FaCoffee />,
      title: "Home Office Setup",
      description:
        "$1,500 home office budget plus monthly internet and phone reimbursement to create your ideal workspace.",
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Volunteer Time Off",
      description:
        "40 paid hours annually for volunteer work. Make a difference in your community while being supported by your company.",
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      description:
        "Clear career progression framework, mentorship programs, and leadership development opportunities.",
    },
    {
      icon: <FaStar />,
      title: "Recognition Program",
      description:
        "Quarterly awards, peer recognition system, and spot bonuses to celebrate your achievements and contributions.",
    },
  ];

  return (
    <section className="py-10 lg:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <Tagline variant="center">Why Join Us</Tagline>
          <h2 className="section-title text-foreground mb-3">
            Benefits & <span className="highlight">Perks</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We believe in taking care of our team members with comprehensive
            benefits that matter. Here&apos;s what you can expect when joining
            our family and building your career with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Benefit {...benefit} />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          {/* CTA */}
          <CTA
            variant="image"
            title="Ready to start your journey with us?"
            description="Discover exciting opportunities and be part of a team that values your growth and well-being."
            badge={{
              text: "Ready to Transform",
            }}
            primaryButton={{
              text: "View Open Positions",
              onClick: () => {},
            }}
            secondaryButton={{
              text: "Learn More About Us",
              onClick: () => {},
            }}
            backgroundImage="/images/cta-bg.webp"
            className="mt-16"
          />
        </motion.div>
      </div>
    </section>
  );
}
