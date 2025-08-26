"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/Card";
import { CheckCircle2, Clock, Users, FileText, Trophy } from "lucide-react";
import Tagline from "../ui/Tagline";

const steps = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Apply Online",
    description:
      "Submit your application through our careers portal with your resume and cover letter. Our user-friendly platform makes it easy to apply.",
    duration: "5 minutes",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Initial Screening",
    description:
      "Our recruitment team will review your application and reach out within 48 hours if there's a potential fit for the role.",
    duration: "1-2 days",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Technical Assessment",
    description:
      "Complete a take-home assignment or participate in a live coding session, depending on the role. We respect your time and keep it focused.",
    duration: "3-5 days",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Interview Rounds",
    description:
      "Meet with team members and leaders through a series of interviews to assess mutual fit. Usually 2-3 rounds including technical and cultural fit.",
    duration: "1 week",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Final Decision",
    description:
      "We'll make a decision and extend an offer to the selected candidate. You'll hear from us regardless of the outcome.",
    duration: "2-3 days",
  },
];

export default function ApplicationProcess() {
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
          <Tagline variant="center">Your Journey Starts Here</Tagline>
          <h2 className="section-title text-foreground mb-3">
            Application <span className="highlight">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our streamlined recruitment process is designed to be transparent,
            efficient, and respectful of your time. Here's what you can expect
            at each step.
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm group-hover:-translate-y-3">
                  <div className="p-8 text-center h-full flex flex-col">
                    {/* Step number and connecting line */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mx-auto">
                        {index + 1}
                      </div>

                      {/* Connecting line (except for last item) */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-primary/30 transform translate-x-4" />
                      )}
                    </div>

                    {/* Icon */}
                    <div className="mb-4 text-primary group-hover:text-primary-hover transition-colors">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {step.description}
                      </p>

                      {/* Duration badge */}
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          ⏱️ {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional info section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-3xl mx-auto border-0 shadow-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Timeline: Typically{" "}
                  <span className="highlight">2-3 weeks</span> from application
                  to offer
                </h3>
                <p className="text-muted-foreground mb-6">
                  We believe in transparency throughout the process. You'll
                  receive updates at each stage, and we're always available to
                  answer your questions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-foreground text-xl">
                        💬
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Open Communication
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Regular updates and feedback throughout
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-accent-foreground text-xl">⚓</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Flexible Scheduling
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We work around your availability
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-hover rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-secondary-foreground text-xl">
                        🎆
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Fair & Inclusive
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Equal opportunity for all candidates
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
