"use client";

import { motion } from "framer-motion";
import { useState, FormEvent, useEffect, useRef } from "react";
import {
  BsBriefcase,
  BsGeoAlt,
  BsClock,
  BsCurrencyDollar,
  BsEnvelope,
  BsBookmark,
} from "react-icons/bs";
import { ArrowRight, IndianRupee } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Card } from "@/app/components/ui/Card";
import { toast } from "react-hot-toast";
import Tagline from "../ui/Tagline";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string[];
  responsibilities: string[];
  skills: string[];
  experience: string;
  education: string;
  ctc: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  resume: File | null;
  coverLetter: string;
  jobId: string;
}

export default function CurrentOpenings() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewingJobDetails, setViewingJobDetails] = useState<Job | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    resume: null,
    coverLetter: "",
    jobId: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<string[]>(["All"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      // Extract unique departments from jobs
      const uniqueDepartments = [
        "All",
        ...Array.from(new Set(jobs.map((job) => job.department))),
      ];
      setDepartments(uniqueDepartments);
    }
  }, [jobs]);

  useEffect(() => {
    if (selectedJob) {
      setApplicationForm((prev) => ({
        ...prev,
        jobId: selectedJob._id,
      }));
    }
  }, [selectedJob]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load job listings");
      setJobs([]);
    }
  };

  const handleApplicationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the application to your API
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Application submitted successfully!");
      setSelectedJob(null);
      setApplicationForm({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        resume: null,
        coverLetter: "",
        jobId: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  return (
    <section className="py-10 lg:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Tagline variant="center">Current Opportunities</Tagline>
          <h2 className="section-title text-foreground mb-3">
            Current <span className="highlight">Openings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our team of passionate professionals and help build the future
            of technology. Discover your next career opportunity with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Search for jobs, locations, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border border-border focus:border-primary rounded-xl shadow-lg hover:shadow-xl
               transition-all duration-300 bg-card/50 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Tabs
            defaultValue="All"
            onValueChange={(value) => setSelectedDepartment(value)}
          >
            <TabsList className="flex space-x-2 bg-card/80 backdrop-blur-sm shadow-xl mb-12 overflow-x-auto w-full rounded-xl border border-border">
              {departments.map((dept) => (
                <TabsTrigger
                  key={dept}
                  value={dept}
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:from-primary data-[state=active]:to-primary-hover data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
                >
                  {dept}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, idx) => (
                  <motion.div
                    key={`${job._id}-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm group-hover:-translate-y-2 overflow-hidden">
                      <div className="p-8 h-full flex flex-col">
                        {/* Job header with gradient accent */}
                        <div className="relative mb-6">
                          <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />
                          <h3 className="text-2xl text-foreground font-bold mb-4 group-hover:text-primary transition-colors relative z-10">
                            {job.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                          <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                            <BsBriefcase className="mr-2 text-primary" />
                            <span className="text-sm font-medium">
                              {job.department}
                            </span>
                          </div>
                          <div className="flex items-center bg-accent/5 px-3 py-1 rounded-full">
                            <BsGeoAlt className="mr-2 text-accent" />
                            <span className="text-sm font-medium">
                              {job.location || "Remote"}
                            </span>
                          </div>
                          <div className="flex items-center bg-secondary/10 px-3 py-1 rounded-full">
                            <BsClock className="mr-2 text-secondary" />
                            <span className="text-sm font-medium">
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-6 flex-grow">
                          <div>
                            <h4 className="font-semibold mb-3 text-foreground flex items-center">
                              <div className="w-1 h-5 bg-primary rounded-full mr-3"></div>
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                              {job.responsibilities
                                .slice(0, 3)
                                .map((resp, idx) => (
                                  <li
                                    key={`${job._id}-resp-${idx}`}
                                    className="flex items-start"
                                  >
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-sm leading-relaxed">
                                      {resp}
                                    </span>
                                  </li>
                                ))}
                              {job.responsibilities.length > 3 && (
                                <li className="flex items-center">
                                  <button
                                    className="text-primary hover:text-primary-hover font-medium text-sm flex items-center transition-colors"
                                    onClick={() => setViewingJobDetails(job)}
                                  >
                                    <span>
                                      + {job.responsibilities.length - 3} more
                                      responsibilities
                                    </span>
                                    <ArrowRight className="ml-1 w-3 h-3" />
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>

                          <div className="border-t border-border/50 pt-6 mt-auto">
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-foreground">
                                  <BsBookmark className="mr-2 text-primary" />
                                  <span className="font-medium text-sm">
                                    Experience: {job.experience}
                                  </span>
                                </div>
                                <div className="flex items-center text-foreground">
                                  <IndianRupee className="mr-2 size-5 text-accent" />
                                  <span className="font-medium text-sm">
                                    {job.ctc}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                onClick={() => setViewingJobDetails(job)}
                                variant="outline"
                              >
                                View Details
                              </Button>
                              <Button
                                onClick={() => setSelectedJob(job)}
                                variant="primary"
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-16"
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-12 border border-primary/10">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      No opportunities found
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                      {searchTerm
                        ? `No positions match your search for "${searchTerm}". Try different keywords.`
                        : "No jobs available in this department at the moment. Check back soon!"}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </Tabs>
        </motion.div>
      </div>

      {/* Job Details Modal */}
      {viewingJobDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-3xl w-full max-h-[75vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {viewingJobDetails.title}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setViewingJobDetails(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <BsBriefcase className="mr-2" />
                  {viewingJobDetails.department}
                </div>
                <div className="flex items-center">
                  <BsGeoAlt className="mr-2" />
                  {viewingJobDetails.location || "Remote"}
                </div>
                <div className="flex items-center">
                  <BsClock className="mr-2" />
                  {viewingJobDetails.type}
                </div>
                <div className="flex items-center">
                  <BsCurrencyDollar className="mr-2" />
                  {viewingJobDetails.ctc}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Job Description
                  </h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {viewingJobDetails.description.map((desc, idx) => (
                      <li key={`desc-${idx}`}>{desc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Responsibilities
                  </h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {viewingJobDetails.responsibilities.map((resp, idx) => (
                      <li key={`resp-${idx}`}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Required Skills
                  </h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {viewingJobDetails.skills.map((skill, idx) => (
                      <li key={`skill-${idx}`}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      Experience Required
                    </h4>
                    <p className="text-muted-foreground">
                      {viewingJobDetails.experience}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      Education
                    </h4>
                    <p className="text-muted-foreground">
                      {viewingJobDetails.education}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex items-center text-muted-foreground">
                    <BsEnvelope className="mr-2" />
                    Contact: {viewingJobDetails.email}
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedJob(viewingJobDetails);
                      setViewingJobDetails(null);
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </Card>
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[75vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedJob.department} •{" "}
                    {selectedJob.location || "Remote"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedJob(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={applicationForm.fullName}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={applicationForm.email}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={applicationForm.phone}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Years of Experience *
                    </label>
                    <Input
                      type="text"
                      required
                      value={applicationForm.experience}
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          experience: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        setApplicationForm({
                          ...applicationForm,
                          resume: e.target.files?.[0] || null,
                        })
                      }
                    />
                    {applicationForm.resume ? (
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">
                          {applicationForm.resume.name}
                        </span>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            setApplicationForm({
                              ...applicationForm,
                              resume: null,
                            });
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer py-8"
                      >
                        <svg
                          className="mx-auto h-12 w-12 text-muted-foreground"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={applicationForm.coverLetter}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        coverLetter: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedJob(null)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </Card>
        </div>
      )}
    </section>
  );
}
