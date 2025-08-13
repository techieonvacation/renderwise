"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, Users } from "lucide-react";
import { Button } from "../ui/Button";
import { TbPhoneCall } from "react-icons/tb";
import { IoLocationOutline, IoMailUnread } from "react-icons/io5";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const socialLinks = [
  {
    href: "https://www.facebook.com/hackintown",
    Icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/hackintown",
    Icon: FaInstagram,
  },
  { href: "https://www.x.com/hackintown", Icon: FaXTwitter },
  {
    href: "https://www.linkedin.com/company/hackintown",
    Icon: FaLinkedin,
  },
  { href: "https://www.github.com/hackintown", Icon: FaGithub },
];

export default function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="py-10">
      {/* Main Content */}
      <section className="container bg-card p-4 lg:p-8 rounded-lg">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-lg font-inter">
                We are here to help you with your questions and concerns.
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid gap-6">
              {/* Phone */}
              <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-x-6">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <TbPhoneCall className="size-5 md:size-6 lg:size-7 text-primary relative z-10" />
                    <div className="absolute inset-0 w-full h-full  animate-spin-slow before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-3 before:border-dotted before:border-primary before:animate-spin-slow" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold font-lg lg:text-xl text-foreground mb-2">
                      Call Us 7/24
                    </h3>
                    <Link
                      href="tel:+918851967714"
                      className="text-muted-foreground font-inter"
                    >
                      +91 8851967714
                    </Link>
                    <Link
                      href="tel:+918851967714"
                      className="text-muted-foreground font-inter"
                    >
                      +91 8851967714
                    </Link>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-x-6">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <IoMailUnread className="size-5 md:size-6 lg:size-7 text-primary relative z-10" />
                    <div className="absolute inset-0 w-full h-full  animate-spin-slow before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-3 before:border-dotted before:border-primary before:animate-spin-slow" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold font-lg lg:text-xl text-foreground mb-2">
                      Make a Quote
                    </h3>
                    <Link
                      href="mailto:hackintowntech@gmail.com"
                      className="text-sm lg:text-base text-muted-foreground font-inter"
                    >
                      hackintowntech@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
              {/* Location */}
              <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-x-6">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <IoLocationOutline className="size-5 md:size-6 lg:size-7 text-primary relative z-10" />
                    <div className="absolute inset-0 w-full h-full  animate-spin-slow before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-3 before:border-dotted before:border-primary before:animate-spin-slow" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold font-lg lg:text-xl text-foreground mb-2">
                      Location
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm lg:text-base">
                      C-113 , 4rth floor , Sector 2,
                      <br className="block lg:hidden" />
                      Noida Near by SBI Bank, 201301,
                      <br />
                      Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-x-6">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
                    <Users className="size-5 md:size-6 lg:size-7 text-primary relative z-10" />
                    <div className="absolute inset-0 w-full h-full  animate-spin-slow before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-3 before:border-dotted before:border-primary before:animate-spin-slow" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold font-lg lg:text-xl text-foreground mb-2">
                      Social Media
                    </h3>
                    <div className="flex space-x-2">
                      {socialLinks.map(({ href, Icon }, idx) => (
                        <Link
                          key={idx}
                          href={href}
                          target="_blank"
                          className="group text-muted-foreground transition-all duration-300 hover:text-primary border border-muted-foreground rounded-full p-2 md:p-1"
                        >
                          <Icon className="size-4 sm:size-5 md:size-6 lg:size-7 text-foreground transform transition-transform group-hover:scale-110" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="relative bg-card p-6 rounded-xl border border-border transition-colors">
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 rounded-2xl flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      Success!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      We will respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    label: "Name",
                    type: "text",
                    placeholder: "John Doe",
                    key: "name",
                    required: true,
                  },
                  {
                    label: "Email",
                    type: "email",
                    placeholder: "john@doe.com",
                    key: "email",
                    required: true,
                  },
                ].map((field) => (
                  <motion.div key={field.key} className="space-y-2">
                    <label className="text-sm font-medium text-foreground font-space-grotesk flex items-center gap-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                      value={formData[field.key as keyof FormData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium font-space-grotesk text-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground font-space-grotesk flex items-center gap-1">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground font-space-grotesk flex items-center gap-1">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project needs..."
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size={"lg"}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Protected by reCAPTCHA •{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy
                </a>{" "}
                •{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <div className="container my-8">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5725158662257!2d77.31455147556707!3d28.553969175699736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d11da7c7e7%3A0x3a4b1b67144f3612!2sSector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1709914527044!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hackintown Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
