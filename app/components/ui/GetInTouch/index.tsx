"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Phone, Clock, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_CONFIG } from "../Nabvar/constant";
import { Progress } from "@/app/components/ui/progress";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
/**
 * ContactSection Component
 * Renders a contact form with company information and handles form submissions
 * @returns JSX.Element
 */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessEmail: "",
    companyName: "",
    interestedServices: "",
    launchTimeline: "",
    budget: 5000,
    aboutProject: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/getintouch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessEmail: "",
        companyName: "",
        interestedServices: "",
        launchTimeline: "",
        budget: 5000,
        aboutProject: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getServices = () => {
    const servicesMenu = NAVBAR_CONFIG.mainNavItems.find(
      (menu) => menu.name === "Services"
    );
    return servicesMenu?.subMenu || [];
  };

  return (
    <section id="get-in-touch" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Get in Touch with
                <span className="text-primary block text-4xl sm:text-5xl md:text-6xl font-extrabold">
                  Our
                  <br />
                  Experts
                </span>
              </h2>
              <p className="text-muted-foreground font-inter text-base">
                Have questions about your hearing health? Our expert
                audiologists are here to help. Contact us today to schedule a
                consultation or learn more about our services.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base xl:text-lg text-foreground">
                    Visit Us
                  </h3>
                  <p className="text-muted-foreground text-sm font-inter">
                    C-113 , 4rth floor , Sector 2,
                    <br />
                    <span className="text-muted-foreground text-sm font-inter">
                      Noida Near by SBI Bank, 201301
                    </span>
                    <br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <Phone className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base xl:text-lg text-foreground">
                    Call Us
                  </h3>
                  <Link
                    href="tel:+918851967714"
                    className="text-muted-foreground hover:text-primary transition-colors font-inter"
                  >
                    +91 8851-967-714
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <Mail className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base xl:text-lg text-foreground">
                    Email Us
                  </h3>
                  <Link
                    href="mailto:hackintowntech@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors font-inter"
                  >
                    hackintowntech@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base xl:text-lg text-foreground">
                    Working Hours
                  </h3>
                  <p className="text-muted-foreground text-sm font-inter">
                    Mon - Fri: 9:00 AM - 7:00 PM
                  </p>
                  <p className="text-muted-foreground text-sm font-inter">
                    Saturday: Closed
                  </p>
                  <p className="text-muted-foreground text-sm font-inter">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-lg md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    required
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Company (or project) Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    What service(s) are you interested in? *
                  </label>
                  <select
                    name="interestedServices"
                    required
                    value={formData.interestedServices}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select a service</option>
                    {getServices().map((service, idx) => (
                      <option key={idx} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  When do you want to launch a solution? *
                </label>
                <select
                  name="launchTimeline"
                  required
                  value={formData.launchTimeline}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6+months">6+ months</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Budget *
                </label>
                <div className="mt-2 space-y-2">
                  <Progress
                    value={(formData.budget / 50000) * 100}
                    className="h-2 bg-muted"
                  />
                  <input
                    type="range"
                    name="budget"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-input-background"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${formData.budget.toLocaleString()}</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  About Project
                </label>
                <textarea
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-input-background text-input-foreground px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                disabled={loading}
                variant={"primary"}
                size={"lg"}
                rightIcon={<Send className="h-5 w-5" />}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
