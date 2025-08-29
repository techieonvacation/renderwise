"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcons } from "@/app/components/ui/Icon";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/textarea";
import { Select } from "@/app/components/ui/Select";
import { Checkbox } from "@/app/components/ui/Checkbox";
import Loader from "@/app/components/ui/Loader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ImageUpload } from "@/app/components/ui/ImageUpload";
import { toast } from "react-hot-toast";
import {
  ServicesConfig,
  ServiceFeature,
  AVAILABLE_ICONS,
  DEFAULT_SERVICES_CONFIG,
} from "@/app/lib/models/services";

// Types for the CMS
interface ServicesCMSProps {}

interface ServiceFormData extends ServiceFeature {
  id: string;
  buttonText?: string;
  buttonLink?: string;
}

interface SectionFormData {
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  showNavigation: boolean;
  showAutoplay: boolean;
  autoplaySpeed: number;
  slidesToShow: number;
  slidesToScroll: number;
  showDots: boolean;
  showArrows: boolean;
  enableHoverEffects: boolean;
  enableFlipAnimation: boolean;
  enableProgressAnimation: boolean;
}

const ServicesCMS: React.FC<ServicesCMSProps> = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentData, setCurrentData] = useState<ServicesConfig>(
    DEFAULT_SERVICES_CONFIG
  );
  const [sectionData, setSectionData] = useState<SectionFormData>({
    title: DEFAULT_SERVICES_CONFIG.title,
    highlight: DEFAULT_SERVICES_CONFIG.highlight,
    subtitle: DEFAULT_SERVICES_CONFIG.subtitle,
    description: DEFAULT_SERVICES_CONFIG.description,
    showNavigation: DEFAULT_SERVICES_CONFIG.showNavigation || true,
    showAutoplay: DEFAULT_SERVICES_CONFIG.showAutoplay || true,
    autoplaySpeed: DEFAULT_SERVICES_CONFIG.autoplaySpeed || 3000,
    slidesToShow: DEFAULT_SERVICES_CONFIG.slidesToShow || 4,
    slidesToScroll: DEFAULT_SERVICES_CONFIG.slidesToScroll || 1,
    showDots: DEFAULT_SERVICES_CONFIG.showDots || false,
    showArrows: DEFAULT_SERVICES_CONFIG.showArrows || true,
    enableHoverEffects: DEFAULT_SERVICES_CONFIG.enableHoverEffects || true,
    enableFlipAnimation: DEFAULT_SERVICES_CONFIG.enableFlipAnimation || true,
    enableProgressAnimation:
      DEFAULT_SERVICES_CONFIG.enableProgressAnimation || true,
  });
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [activeTab, setActiveTab] = useState("section");
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  // Load initial data
  useEffect(() => {
    loadServicesData();
  }, []);

  // Load services data from API
  const loadServicesData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/services");
      const data = await response.json();

      setCurrentData(data);
      setSectionData({
        title: data.title,
        highlight: data.highlight,
        subtitle: data.subtitle,
        description: data.description,
        showNavigation: data.showNavigation ?? true,
        showAutoplay: data.showAutoplay ?? true,
        autoplaySpeed: data.autoplaySpeed ?? 3000,
        slidesToShow: data.slidesToShow ?? 4,
        slidesToScroll: data.slidesToScroll ?? 1,
        showDots: data.showDots ?? false,
        showArrows: data.showArrows ?? true,
        enableHoverEffects: data.enableHoverEffects ?? true,
        enableFlipAnimation: data.enableFlipAnimation ?? true,
        enableProgressAnimation: data.enableProgressAnimation ?? true,
      });
      setServices(
        data.features.map((service: ServiceFeature, index: number) => ({
          ...service,
          id: `service-${index}`,
        }))
      );
    } catch (error) {
      console.error("Error loading services data:", error);
      toast.error("Failed to load services configuration");
    } finally {
      setIsLoading(false);
    }
  };

  // Save services data
  const saveServicesData = async () => {
    try {
      setIsSaving(true);
      setSaveStatus("saving");

      const updatedData: ServicesConfig = {
        ...currentData,
        ...sectionData,
        features: services.map(({ id, ...service }) => service),
      };

      const response = await fetch("/api/services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setCurrentData(updatedData);
        setSaveStatus("success");
        toast.success("Services configuration saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving services data:", error);
      setSaveStatus("error");
      toast.error("Failed to save services configuration");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const resetToDefault = async () => {
    if (
      confirm(
        "Are you sure you want to reset to default? This will delete all custom changes."
      )
    ) {
      try {
        setIsSaving(true);
        await fetch("/api/services", { method: "DELETE" });
        await loadServicesData();
        toast.success("Services configuration reset to default successfully!");
      } catch (error) {
        console.error("Error resetting to default:", error);
        toast.error("Failed to reset services configuration");
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Service management functions
  const addService = () => {
    const newService: ServiceFormData = {
      id: `service-${Date.now()}`,
      title: "New Service",
      description: "Service description",
      icon: "Code2",
      image: "/images/home/web-dev.webp",
      bulletPoints: ["Feature 1", "Feature 2", "Feature 3"],
      order: services.length + 1,
      isActive: true,
      buttonText: "Get Started",
      buttonLink: "/contact-us",
    };
    setServices([...services, newService]);
    setEditingService(newService.id);
    toast.success("New service added successfully!");
  };

  const updateService = (id: string, updates: Partial<ServiceFormData>) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updates } : service
      )
    );
  };

  const deleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
      toast.success("Service deleted successfully!");
    }
  };

  const toggleServiceActive = (id: string) => {
    const service = services.find((s) => s.id === id);
    const newStatus = !service?.isActive;
    updateService(id, { isActive: newStatus });
    toast.success(
      `Service ${newStatus ? "activated" : "deactivated"} successfully!`
    );
  };

  const addBulletPoint = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      updateService(serviceId, {
        bulletPoints: [...service.bulletPoints, "New feature"],
      });
      toast.success("Feature added successfully!");
    }
  };

  const updateBulletPoint = (
    serviceId: string,
    index: number,
    value: string
  ) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      const newBulletPoints = [...service.bulletPoints];
      newBulletPoints[index] = value;
      updateService(serviceId, { bulletPoints: newBulletPoints });
    }
  };

  const removeBulletPoint = (serviceId: string, index: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (service && service.bulletPoints.length > 1) {
      const newBulletPoints = service.bulletPoints.filter(
        (_, i) => i !== index
      );
      updateService(serviceId, { bulletPoints: newBulletPoints });
      toast.success("Feature removed successfully!");
    }
  };

  // Drag and drop reordering
  const moveService = (fromIndex: number, toIndex: number) => {
    const newServices = [...services];
    const [movedService] = newServices.splice(fromIndex, 1);
    newServices.splice(toIndex, 0, movedService);
    setServices(
      newServices.map((service, index) => ({ ...service, order: index + 1 }))
    );
    toast.success("Service order updated successfully!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services CMS</h1>
          <p className="text-muted-foreground mt-2">
            Manage your services section content and configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            leftIcon={<LucideIcons.Eye className="w-4 h-4" />}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button
            variant="outline"
            onClick={resetToDefault}
            leftIcon={<LucideIcons.RotateCcw className="w-4 h-4" />}
            disabled={isSaving}
          >
            Reset to Default
          </Button>
          <Button
            onClick={saveServicesData}
            leftIcon={
              isSaving ? <Loader /> : <LucideIcons.Save className="w-4 h-4" />
            }
            disabled={isSaving}
            className="min-w-[120px]"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Save Status */}
      <AnimatePresence>
        {saveStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg border ${
              saveStatus === "success"
                ? "bg-success/10 border-success/20 text-success"
                : saveStatus === "error"
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-info/10 border-info/20 text-info"
            }`}
          >
            <div className="flex items-center gap-2">
              {saveStatus === "success" && (
                <LucideIcons.CheckCircle className="w-4 h-4" />
              )}
              {saveStatus === "error" && (
                <LucideIcons.XCircle className="w-4 h-4" />
              )}
              {saveStatus === "saving" && <Loader />}
              <span className="font-medium">
                {saveStatus === "success" && "Changes saved successfully!"}
                {saveStatus === "error" &&
                  "Failed to save changes. Please try again."}
                {saveStatus === "saving" && "Saving changes..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CMS Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="section">Section Settings</TabsTrigger>
              <TabsTrigger value="services">
                Services ({services.length})
              </TabsTrigger>
            </TabsList>

            {/* Section Settings Tab */}
            <TabsContent value="section" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LucideIcons.Settings className="w-5 h-5" />
                    Section Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title and Highlight */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={sectionData.title}
                        onChange={(e) =>
                          setSectionData({
                            ...sectionData,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter section title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Highlight Text
                      </label>
                      <Input
                        value={sectionData.highlight}
                        onChange={(e) =>
                          setSectionData({
                            ...sectionData,
                            highlight: e.target.value,
                          })
                        }
                        placeholder="Highlighted text"
                      />
                    </div>
                  </div>

                  {/* Subtitle and Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtitle</label>
                    <Input
                      value={sectionData.subtitle}
                      onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Enter subtitle"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={sectionData.description}
                      onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter section description"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Slider Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LucideIcons.Sliders className="w-5 h-5" />
                    Slider Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Slides to Show
                      </label>
                      <Select
                        value={sectionData.slidesToShow.toString()}
                        onValueChange={(value) =>
                          setSectionData({
                            ...sectionData,
                            slidesToShow: parseInt(value),
                          })
                        }
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Slides to Scroll
                      </label>
                      <Select
                        value={sectionData.slidesToScroll.toString()}
                        onValueChange={(value) =>
                          setSectionData({
                            ...sectionData,
                            slidesToScroll: parseInt(value),
                          })
                        }
                      >
                        {[1, 2, 3].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Autoplay Speed (ms)
                    </label>
                    <Input
                      type="number"
                      value={sectionData.autoplaySpeed}
                      onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          autoplaySpeed: parseInt(e.target.value),
                        })
                      }
                      min={1000}
                      max={10000}
                      step={500}
                    />
                  </div>

                  {/* Toggle Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showNavigation"
                        checked={sectionData.showNavigation}
                        onCheckedChange={(checked) =>
                          setSectionData({
                            ...sectionData,
                            showNavigation: !!checked,
                          })
                        }
                      />
                      <label
                        htmlFor="showNavigation"
                        className="text-sm font-medium"
                      >
                        Show Navigation
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showAutoplay"
                        checked={sectionData.showAutoplay}
                        onCheckedChange={(checked) =>
                          setSectionData({
                            ...sectionData,
                            showAutoplay: !!checked,
                          })
                        }
                      />
                      <label
                        htmlFor="showAutoplay"
                        className="text-sm font-medium"
                      >
                        Enable Autoplay
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showDots"
                        checked={sectionData.showDots}
                        onCheckedChange={(checked) =>
                          setSectionData({
                            ...sectionData,
                            showDots: !!checked,
                          })
                        }
                      />
                      <label htmlFor="showDots" className="text-sm font-medium">
                        Show Dots
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showArrows"
                        checked={sectionData.showArrows}
                        onCheckedChange={(checked) =>
                          setSectionData({
                            ...sectionData,
                            showArrows: !!checked,
                          })
                        }
                      />
                      <label
                        htmlFor="showArrows"
                        className="text-sm font-medium"
                      >
                        Show Arrows
                      </label>
                    </div>
                  </div>

                  {/* Animation Options */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Animation Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enableHoverEffects"
                          checked={sectionData.enableHoverEffects}
                          onCheckedChange={(checked) =>
                            setSectionData({
                              ...sectionData,
                              enableHoverEffects: !!checked,
                            })
                          }
                        />
                        <label htmlFor="enableHoverEffects" className="text-sm">
                          Hover Effects
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enableFlipAnimation"
                          checked={sectionData.enableFlipAnimation}
                          onCheckedChange={(checked) =>
                            setSectionData({
                              ...sectionData,
                              enableFlipAnimation: !!checked,
                            })
                          }
                        />
                        <label
                          htmlFor="enableFlipAnimation"
                          className="text-sm"
                        >
                          Flip Animation
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enableProgressAnimation"
                          checked={sectionData.enableProgressAnimation}
                          onCheckedChange={(checked) =>
                            setSectionData({
                              ...sectionData,
                              enableProgressAnimation: !!checked,
                            })
                          }
                        />
                        <label
                          htmlFor="enableProgressAnimation"
                          className="text-sm"
                        >
                          Progress Animation
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              {/* Add Service Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Manage Services</h3>
                <Button
                  onClick={addService}
                  leftIcon={<LucideIcons.Plus className="w-4 h-4" />}
                >
                  Add Service
                </Button>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    isEditing={editingService === service.id}
                    onEdit={() => setEditingService(service.id)}
                    onSave={() => setEditingService(null)}
                    onCancel={() => setEditingService(null)}
                    onUpdate={(updates) => updateService(service.id, updates)}
                    onDelete={() => deleteService(service.id)}
                    onToggleActive={() => toggleServiceActive(service.id)}
                    onMoveUp={() => index > 0 && moveService(index, index - 1)}
                    onMoveDown={() =>
                      index < services.length - 1 &&
                      moveService(index, index + 1)
                    }
                    onAddBulletPoint={() => addBulletPoint(service.id)}
                    onUpdateBulletPoint={(bulletIndex, value) =>
                      updateBulletPoint(service.id, bulletIndex, value)
                    }
                    onRemoveBulletPoint={(bulletIndex) =>
                      removeBulletPoint(service.id, bulletIndex)
                    }
                    availableIcons={AVAILABLE_ICONS}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideIcons.Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-lg">
                      {sectionData.title}{" "}
                      <span className="text-primary">
                        {sectionData.highlight}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sectionData.subtitle}
                    </p>
                    <p className="text-sm mt-2">{sectionData.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">
                      Active Services:{" "}
                      {services.filter((s) => s.isActive).length}
                    </h4>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {services
                        .filter((service) => service.isActive)
                        .slice(0, 6)
                        .map((service, index) => (
                          <div
                            key={service.id}
                            className="flex items-center gap-2 p-2 bg-muted/50 rounded"
                          >
                            <span className="text-xs text-muted-foreground">
                              #{index + 1}
                            </span>
                            <span className="text-sm font-medium">
                              {service.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>
                      Slides: {sectionData.slidesToShow} | Scroll:{" "}
                      {sectionData.slidesToScroll}
                    </div>
                    <div>
                      Autoplay: {sectionData.showAutoplay ? "On" : "Off"} |
                      Speed: {sectionData.autoplaySpeed}ms
                    </div>
                    <div>
                      Navigation: {sectionData.showNavigation ? "On" : "Off"} |
                      Arrows: {sectionData.showArrows ? "On" : "Off"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Service Card Component
interface ServiceCardProps {
  service: ServiceFormData;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdate: (updates: Partial<ServiceFormData>) => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddBulletPoint: () => void;
  onUpdateBulletPoint: (index: number, value: string) => void;
  onRemoveBulletPoint: (index: number) => void;
  availableIcons: readonly string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onUpdate,
  onDelete,
  onToggleActive,
  onMoveUp,
  onMoveDown,
  onAddBulletPoint,
  onUpdateBulletPoint,
  onRemoveBulletPoint,
  availableIcons,
}) => {
  return (
    <Card
      className={`transition-all duration-200 ${
        !service.isActive ? "opacity-60" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMoveUp}
                disabled={index === 0}
              >
                <LucideIcons.ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMoveDown}
                disabled={index === 0}
              >
                <LucideIcons.ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">#{index + 1}</span>

            {/* Service Image Preview */}
            <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center border border-border/50 overflow-hidden">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/home/web-dev.webp";
                  }}
                />
              ) : (
                <LucideIcons.Image className="w-6 h-6 text-muted-foreground" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={service.isActive}
                onCheckedChange={onToggleActive}
              />
              <span className="text-sm font-medium">{service.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={onSave} variant="primary">
                  <LucideIcons.Check className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={onCancel} variant="outline">
                  <LucideIcons.X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={onEdit} variant="outline">
                  <LucideIcons.Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={onDelete} variant="destructive">
                  <LucideIcons.Trash className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      {isEditing && (
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={service.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Service title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <Select
                value={service.icon}
                onValueChange={(value) => onUpdate({ icon: value })}
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={service.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Service description"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <ImageUpload
              label="Service Image"
              value={service.image}
              onChange={(url) => onUpdate({ image: url })}
              placeholder="Click to upload service image or drag and drop"
              helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              aspectRatio={4}
              maxSize={5}
              showPreview={true}
              onSuccess={(url) => {
                toast.success("Service image uploaded successfully");
              }}
              onError={(error) => {
                toast.error(error);
              }}
            />
          </div>

          {/* Button Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={service.buttonText || "Get Started"}
                onChange={(e) => onUpdate({ buttonText: e.target.value })}
                placeholder="Button text (e.g., Get Started)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={service.buttonLink || "/contact-us"}
                onChange={(e) => onUpdate({ buttonLink: e.target.value })}
                placeholder="Button link (e.g., /contact-us)"
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Features</label>
              <Button
                size="sm"
                variant="outline"
                onClick={onAddBulletPoint}
                leftIcon={<LucideIcons.Plus className="w-3 h-3" />}
              >
                Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {service.bulletPoints.map((point, pointIndex) => (
                <div key={pointIndex} className="flex items-center gap-2">
                  <Input
                    value={point}
                    onChange={(e) =>
                      onUpdateBulletPoint(pointIndex, e.target.value)
                    }
                    placeholder="Feature description"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveBulletPoint(pointIndex)}
                    disabled={service.bulletPoints.length <= 1}
                  >
                    <LucideIcons.X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ServicesCMS;
