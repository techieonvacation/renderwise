"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Users, 
  Settings, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

const EndToEndWorkflow = () => {
  const [activeTab, setActiveTab] = useState(0);

  const workflowCategories = [
    {
      id: "hr-finance",
      title: "HR & Finance",
      icon: Users,
      color: "bg-blue-500",
      processes: [
        {
          title: "Employee Onboarding",
          description: "Automated new hire paperwork, IT setup, and training schedules",
          savings: "75% faster",
          tools: ["Zapier", "Workday", "Slack"]
        },
        {
          title: "Invoice Processing",
          description: "OCR document scanning, approval routing, and payment automation",
          savings: "80% reduction in processing time",
          tools: ["UiPath", "SAP", "Power Automate"]
        },
        {
          title: "Expense Management",
          description: "Receipt scanning, policy validation, and reimbursement workflows",
          savings: "90% error reduction",
          tools: ["Concur", "Zapier", "QuickBooks"]
        }
      ]
    },
    {
      id: "operations",
      title: "Operations",
      icon: Settings,
      color: "bg-green-500",
      processes: [
        {
          title: "Supply Chain Management",
          description: "Inventory tracking, vendor management, and order fulfillment",
          savings: "60% cost reduction",
          tools: ["SAP", "Oracle", "Custom APIs"]
        },
        {
          title: "Quality Control",
          description: "Automated testing, compliance checks, and reporting",
          savings: "95% accuracy improvement",
          tools: ["Power Automate", "Salesforce", "Custom Solutions"]
        },
        {
          title: "Asset Management",
          description: "Equipment tracking, maintenance scheduling, and lifecycle management",
          savings: "50% maintenance cost reduction",
          tools: ["ServiceNow", "Zapier", "IoT Integrations"]
        }
      ]
    },
    {
      id: "customer-service",
      title: "Customer Service",
      icon: FileText,
      color: "bg-purple-500",
      processes: [
        {
          title: "Ticket Routing",
          description: "Smart ticket classification and automatic assignment to specialists",
          savings: "70% faster resolution",
          tools: ["Zendesk", "Salesforce", "AI Classification"]
        },
        {
          title: "Customer Onboarding",
          description: "Welcome sequences, account setup, and resource provisioning",
          savings: "85% time savings",
          tools: ["HubSpot", "Zapier", "Custom Workflows"]
        },
        {
          title: "Feedback Processing",
          description: "Survey collection, sentiment analysis, and action item creation",
          savings: "100% automated analysis",
          tools: ["SurveyMonkey", "Power BI", "Natural Language Processing"]
        }
      ]
    }
  ];

  const automationTools = [
    { name: "Zapier", logo: "🔗", description: "Connect 5000+ apps" },
    { name: "Power Automate", logo: "⚡", description: "Microsoft ecosystem" },
    { name: "UiPath", logo: "🤖", description: "RPA platform" },
    { name: "Custom APIs", logo: "🔧", description: "Tailored solutions" }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6"
          >
            <Settings className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Workflow Automation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            End-to-End Workflow{" "}
            <span className="text-primary">Automation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            We automate complex business processes across departments—from HR and finance 
            to operations and customer service. Whether it's invoice processing, onboarding, 
            approvals, or data syncing, we create logic-driven workflows.
          </motion.p>
        </div>

        {/* Workflow Categories Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {workflowCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-muted text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Category Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {workflowCategories[activeTab].processes.map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${workflowCategories[activeTab].color} text-white`}>
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                        <p className="text-muted-foreground mb-4">{process.description}</p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">{process.savings}</span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Integration Tools:</p>
                          <div className="flex flex-wrap gap-2">
                            {process.tools.map((tool, toolIndex) => (
                              <span
                                key={toolIndex}
                                className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Automation Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Powered by Leading Automation Tools</h3>
            <p className="text-muted-foreground">
              We leverage industry-leading platforms and custom solutions to build your automation ecosystem
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {automationTools.map((tool, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-background/80 rounded-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl mb-2">{tool.logo}</div>
                <h4 className="font-semibold mb-1">{tool.name}</h4>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Clock, value: "24/7", label: "Automated Processing", color: "text-blue-500" },
            { icon: Zap, value: "< 5min", label: "Average Setup Time", color: "text-yellow-500" },
            { icon: TrendingUp, value: "300%", label: "Productivity Increase", color: "text-green-500" },
            { icon: CheckCircle, value: "99.9%", label: "Accuracy Rate", color: "text-purple-500" }
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card rounded-xl border"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="group bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4"
          >
            Discover Your Automation Potential
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EndToEndWorkflow;
