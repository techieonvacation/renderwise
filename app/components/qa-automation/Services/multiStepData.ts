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
    id: "functional-regression",
    number: "01",
    icon: "CheckCircle2",
    title: "Functional & Regression Test Automation",
    description:
      "Build stable, maintainable automated suites that validate critical user journeys and protect releases with reliable regression coverage.",
    features: [
      {
        icon: "ListChecks",
        title: "Robust Functional Coverage",
        description:
          "Automate high‑value end‑to‑end flows across web and mobile with resilient locators and clear assertions",
      },
      {
        icon: "RefreshCw",
        title: "Smart Regression Suites",
        description:
          "Risk‑based, flaky‑free regression packs optimized for speed and parallel execution",
      },
    ],
  },
  {
    id: "api-integration",
    number: "02",
    icon: "Plug",
    title: "API & Integration Testing",
    description:
      "Validate service contracts and end‑to‑end integrations with contract testing, schema validation, and realistic data flows.",
    features: [
      {
        icon: "Server",
        title: "Contract & Schema Validation",
        description:
          "Guarantee backward compatibility with OpenAPI/JSON Schema checks and versioned contracts",
      },
      {
        icon: "Link2",
        title: "End‑to‑End Integrations",
        description:
          "Test upstream/downstream dependencies using mocks, stubs, and service virtualization",
      },
    ],
  },
  {
    id: "performance-load",
    number: "03",
    icon: "Gauge",
    title: "Performance & Load Testing",
    description:
      "Measure system reliability at scale with realistic load, stress, and soak scenarios to surface bottlenecks early.",
    features: [
      {
        icon: "Activity",
        title: "Realistic Workloads",
        description:
          "Model traffic patterns, think‑time, and concurrency to replicate production behavior",
      },
      {
        icon: "TrendingUp",
        title: "Actionable Insights",
        description:
          "Track latency, throughput, error rates, and resource utilization with trend reporting",
      },
    ],
  },
  {
    id: "ci-cd-test-data",
    number: "04",
    icon: "GitBranch",
    title: "CI/CD Integration & Test Data Management",
    description:
      "Embed tests into your pipelines with quality gates, instant feedback, and scalable, compliant test data strategies.",
    features: [
      {
        icon: "Rocket",
        title: "Shift‑Left in CI/CD",
        description:
          "Gate merges with fast smoke suites, parallel runs, and rich dashboards on every build",
      },
      {
        icon: "Database",
        title: "Test Data at Scale",
        description:
          "Provision synthetic and anonymized datasets with on‑demand seeded environments",
      },
    ],
  },
  {
    id: "cross-browser-device",
    number: "05",
    icon: "MonitorSmartphone",
    title: "Cross‑Browser & Device Automation",
    description:
      "Deliver consistent experiences across browsers, OSs, and real devices using scalable parallel runs and responsive validations.",
    features: [
      {
        icon: "LayoutGrid",
        title: "Coverage Matrix",
        description:
          "Automate against Chrome, Firefox, Safari, Edge, and real iOS/Android devices via cloud labs",
      },
      {
        icon: "Eye",
        title: "Visual & Responsive Checks",
        description:
          "Catch layout shifts and breakpoint regressions with baseline visual comparisons",
      },
    ],
  },
];

export const features = [
  {
    title: "Smarter Testing, Faster Releases",
    icon: ShoppingCart,
    description: [
      "In a world of rapid deployments and continuous integration, manual testing simply can't keep up.",
      "Our QA automation services help you accelerate software releases without compromising on quality.",
    ],
    iconBg: "bg-blue-500",
  },
  {
    title: "End-to-End Coverage Across Environments",
    icon: Smartphone,
    description: [
      "From UI and API testing to performance and regression testing, we provide comprehensive coverage across devices, browsers, and platforms.",
    ],
    iconBg: "bg-red-500",
  },
  {
    title: "Collaborative and Agile-Ready Teams",
    icon: CreditCard,
    description: [
      "We don't automate—we team up.",
      "Our QA engineers integrate with your agile teams as an extension of them, attending daily stand-ups, sprints, and planning.",
    ],
    iconBg: "bg-black",
  },
  {
    title: "Intelligent Automation at Scale",
    icon: Truck,
    description: [
      "We set up intelligent, scalable automation frameworks that reduce redundancy and maximize coverage.",
      "Our approach adapts to your product's complexity.",
    ],
    iconBg: "bg-blue-500",
  },
  {
    title: "Continuous Feedback & Improvement",
    icon: RotateCcw,
    description: [
      "Real-time dashboards and trend reports keep teams aligned on risk and readiness.",
      "We feed insights back into sprints to tighten release cycles and reduce defects.",
    ],
    iconBg: "bg-red-500",
  },
  {
    title: "Quality Metrics & Coverage",
    icon: Percent,
    description: [
      "Track coverage, flakiness, MTTR, and pass rates to drive data-informed decisions.",
      "Define quality gates that ensure each release meets agreed thresholds.",
    ],
    iconBg: "bg-black",
  },
];
