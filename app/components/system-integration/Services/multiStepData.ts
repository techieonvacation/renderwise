import {
  CreditCard,
  Percent,
  RotateCcw,
  ShoppingCart,
  Smartphone,
  Truck,
} from "lucide-react";

export const multiStepData = [
  {
    id: "workflow-automation",
    number: "01",
    icon: "Workflow",
    title: "End-to-End Workflow Automation",
    description:
      "Automate complex business processes across departments—from HR and finance to operations and customer service using intelligent automation tools.",
    features: [
      {
        icon: "FileText",
        title: "Document Processing",
        description:
          "Automate invoice processing, contract management, and document routing with OCR and AI-powered extraction",
      },
      {
        icon: "Users",
        title: "Employee Onboarding",
        description:
          "Streamline new hire processes with automated workflows for approvals, IT setup, and training schedules",
      },
    ],
  },
  {
    id: "api-integration",
    number: "02",
    icon: "Plug",
    title: "API & System Integration",
    description:
      "Connect disparate systems and applications through robust API integrations, data synchronization, and real-time communication protocols.",
    features: [
      {
        icon: "Database",
        title: "Data Synchronization",
        description:
          "Real-time data sync between CRM, ERP, and other business systems with error handling and retry logic",
      },
      {
        icon: "Link2",
        title: "Third-Party Integrations",
        description:
          "Seamlessly connect with payment gateways, marketing tools, and external services via REST/GraphQL APIs",
      },
    ],
  },
  {
    id: "intelligent-automation",
    number: "03",
    icon: "Brain",
    title: "AI-Powered Process Intelligence",
    description:
      "Leverage artificial intelligence and machine learning to create self-learning automation systems that adapt and optimize over time.",
    features: [
      {
        icon: "Zap",
        title: "Smart Decision Making",
        description:
          "AI-driven rule engines that make intelligent decisions based on historical data and business logic",
      },
      {
        icon: "TrendingUp",
        title: "Predictive Analytics",
        description:
          "Forecast business trends and automate proactive responses to optimize performance and prevent issues",
      },
    ],
  },
  {
    id: "compliance-monitoring",
    number: "04",
    icon: "Shield",
    title: "Compliance & Monitoring",
    description:
      "Ensure regulatory compliance and maintain audit trails with automated monitoring, reporting, and alert systems.",
    features: [
      {
        icon: "FileCheck",
        title: "Audit Trail Automation",
        description:
          "Automatically log all process changes and maintain comprehensive audit trails for compliance requirements",
      },
      {
        icon: "AlertTriangle",
        title: "Real-Time Alerts",
        description:
          "Instant notifications for compliance violations, system errors, and performance thresholds",
      },
    ],
  },
  {
    id: "scalable-infrastructure",
    number: "05",
    icon: "Server",
    title: "Scalable Infrastructure",
    description:
      "Build robust, scalable automation infrastructure that grows with your business using cloud-native technologies and microservices.",
    features: [
      {
        icon: "Cloud",
        title: "Cloud-Native Solutions",
        description:
          "Deploy automation workflows on AWS, Azure, or GCP with auto-scaling and high availability",
      },
      {
        icon: "Layers",
        title: "Microservices Architecture",
        description:
          "Modular, containerized automation services that can be independently deployed and maintained",
      },
    ],
  },
];

export const features = [
  {
    title: "Operational Efficiency",
    icon: ShoppingCart,
    description: [
      "Eliminate manual bottlenecks and accelerate process completion times by up to 80%.",
      "Our automation solutions streamline workflows and reduce time-to-completion across all business functions.",
    ],
    iconBg: "bg-blue-500",
  },
  {
    title: "Error Reduction",
    icon: Smartphone,
    description: [
      "Minimize human error with consistent, rule-based automation that ensures accuracy and reliability in every process execution.",
    ],
    iconBg: "bg-red-500",
  },
  {
    title: "Improved Compliance",
    icon: CreditCard,
    description: [
      "Maintain regulatory compliance automatically with built-in audit trails, approval workflows, and documentation.",
      "Ensure every process follows established protocols and industry standards.",
    ],
    iconBg: "bg-black",
  },
  {
    title: "Real-Time Insights",
    icon: Truck,
    description: [
      "Get instant visibility into process performance with real-time dashboards and analytics.",
      "Make data-driven decisions with comprehensive reporting and trend analysis.",
    ],
    iconBg: "bg-blue-500",
  },
  {
    title: "Scalable Solutions",
    icon: RotateCcw,
    description: [
      "Build automation that grows with your business, handling increased volume without proportional resource increases.",
      "Cloud-native infrastructure ensures reliability and performance at scale.",
    ],
    iconBg: "bg-red-500",
  },
  {
    title: "Cost Optimization",
    icon: Percent,
    description: [
      "Reduce operational costs by automating repetitive tasks and optimizing resource allocation.",
      "Achieve ROI within months through reduced manual effort and improved efficiency.",
    ],
    iconBg: "bg-black",
  },
];
