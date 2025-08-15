export interface Feature {
  id: string;
  title: string;
  description: string;
}

export interface WhyChooseUsData {
  subtitle: string;
  features: Feature[];
  imageSrc: string;
}

export const whyChooseData: WhyChooseUsData = {
  subtitle:
    "Why Choose Us for IT Staffing? We deliver specialized talent solutions that scale with your business needs, ensuring seamless project delivery and long-term success.",
  imageSrc: "/images/itstaff_whychs.webp",
  features: [
    {
      id: "domain-expertise",
      title: "Domain-Specific Talent",
      description:
        "Access to specialized professionals across industries including fintech, healthcare, e-commerce, and enterprise solutions with proven track records.",
    },
    {
      id: "scalable-teams",
      title: "Scalable Team Solutions",
      description:
        "Our teams grow and adapt with your project demands, from single developers to complete development teams, ensuring optimal resource allocation.",
    },
    {
      id: "fast-onboarding",
      title: "Fast & Reliable Onboarding",
      description:
        "Minimal friction onboarding process with pre-vetted candidates, technical assessments, and seamless integration into your existing workflows.",
    },
    {
      id: "lifecycle-support",
      title: "Complete Lifecycle Support",
      description:
        "End-to-end support from talent sourcing and onboarding to ongoing management and smooth offboarding, ensuring continuity and knowledge transfer.",
    },
  ],
};
