"use client";

import React from "react";
import TransformRepetition from "./TransformRepetition";
import EndToEndWorkflow from "./EndToEndWorkflow";
import KeyBenefits from "./KeyBenefits";
import IntelligentSolutions from "./IntelligentSolutions";
import ReadyToAutomate from "./ReadyToAutomate";
import { multiStepData } from "./Services/multiStepData";
import MultiStepCard from "../ui/MultiStepCard";

const SystemIntegrationPage = () => {
  return (
    <div className="min-h-screen">
      {/* Transform Repetition - Hero-like Section */}
      <TransformRepetition />
      
      {/* End-to-End Workflow Automation */}
      <EndToEndWorkflow />
      
      {/* Multi-Step Services Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Comprehensive{" "}
              <span className="text-primary">Automation Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From workflow automation to intelligent integrations, we provide end-to-end 
              business process automation solutions tailored to your specific needs.
            </p>
          </div>
          
          <MultiStepCard multiStepData={multiStepData} />
        </div>
      </section>
      
      {/* Key Benefits */}
      <KeyBenefits />
      
      {/* Intelligent Solutions */}
      <IntelligentSolutions />
      
      {/* Ready to Automate CTA */}
      <ReadyToAutomate />
    </div>
  );
};

export default SystemIntegrationPage;
