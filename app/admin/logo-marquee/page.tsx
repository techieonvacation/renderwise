"use client";

import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { toast } from "react-hot-toast";
import {
  SaveIcon,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Settings,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Checkbox } from "@/app/components/ui/Checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import Loader from "@/app/components/ui/Loader";
import { ImageUpload } from "@/app/components/ui/ImageUpload";
import {
  LogoMarqueeConfig,
  Logo,
  DEFAULT_LOGO_MARQUEE_CONFIG,
} from "@/app/lib/models/logoMarquee";
import { revalidateLogoMarquee } from "@/app/lib/actions/logoMarqueeActions";

interface LogoMarqueeAdminState {
  config: LogoMarqueeConfig;
  isEditing: boolean;
  activeTab: "logos" | "settings";
  editingItem: string | null;
}

export default function LogoMarqueeAdminPage() {
  const [state, setState] = useState<LogoMarqueeAdminState>({
    config: DEFAULT_LOGO_MARQUEE_CONFIG,
    isEditing: false,
    activeTab: "logos",
    editingItem: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized fetch function with abort controller
  const fetchLogoMarqueeConfig = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      const response = await fetch("/api/logo-marquee", {
        signal: abortControllerRef.current.signal,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch logo marquee configuration: ${response.status}`
        );
      }

      const data = await response.json();

      // Ensure all required properties exist
      const validatedConfig: LogoMarqueeConfig = {
        logos: data.logos || DEFAULT_LOGO_MARQUEE_CONFIG.logos,
        speed:
          data.speed !== undefined
            ? data.speed
            : DEFAULT_LOGO_MARQUEE_CONFIG.speed,
        direction: data.direction || DEFAULT_LOGO_MARQUEE_CONFIG.direction,
        isActive:
          data.isActive !== undefined
            ? data.isActive
            : DEFAULT_LOGO_MARQUEE_CONFIG.isActive,
      };

      setState((prev) => ({ ...prev, config: validatedConfig }));
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching logo marquee configuration:", error);
      toast.error("Failed to load logo marquee configuration");
      // Fallback to default config
      setState((prev) => ({ ...prev, config: DEFAULT_LOGO_MARQUEE_CONFIG }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogoMarqueeConfig();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLogoMarqueeConfig]);

  const handleSave = useCallback(async () => {
    const previousConfig = { ...state.config };

    try {
      startTransition(async () => {
        const response = await fetch("/api/logo-marquee", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(state.config),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Failed to update logo marquee configuration: ${response.status}`
          );
        }

        await fetchLogoMarqueeConfig();
        // Revalidate cache for ISR
        await revalidateLogoMarquee();
        setState((prev) => ({ ...prev, isEditing: false }));
        toast.success("Logo marquee configuration saved successfully");
      });
    } catch (error) {
      setState((prev) => ({ ...prev, config: previousConfig }));
      console.error("Error saving logo marquee configuration:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save logo marquee configuration"
      );
    }
  }, [state.config, fetchLogoMarqueeConfig]);

  const updateConfig = useCallback(
    (updater: (config: LogoMarqueeConfig) => LogoMarqueeConfig) => {
      setState((prev) => ({
        ...prev,
        config: updater(prev.config),
        isEditing: true,
      }));
    },
    []
  );

  const addLogo = useCallback(() => {
    updateConfig((config) => ({
      ...config,
      logos: [
        ...config.logos,
        {
          id: `logo-${Date.now()}`,
          name: "New Logo",
          imageUrl: "/images/light-logo.webp",
          order: config.logos.length + 1,
          isActive: true,
        },
      ],
    }));
  }, [updateConfig]);

  const updateLogo = useCallback(
    (index: number, updates: Partial<Logo>) => {
      updateConfig((config) => ({
        ...config,
        logos: config.logos.map((logo, i) =>
          i === index ? { ...logo, ...updates } : logo
        ),
      }));
    },
    [updateConfig]
  );

  const removeLogo = useCallback(
    (index: number) => {
      updateConfig((config) => ({
        ...config,
        logos: config.logos.filter((_, i) => i !== index),
      }));
    },
    [updateConfig]
  );

  const moveLogo = useCallback(
    (index: number, direction: "up" | "down") => {
      updateConfig((config) => {
        const newLogos = [...config.logos];
        const newIndex = direction === "up" ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < newLogos.length) {
          [newLogos[index], newLogos[newIndex]] = [
            newLogos[newIndex],
            newLogos[index],
          ];
        }

        return { ...config, logos: newLogos };
      });
    },
    [updateConfig]
  );

  const toggleLogoActive = useCallback(
    (index: number) => {
      updateLogo(index, { isActive: !state.config.logos[index].isActive });
    },
    [updateLogo, state.config.logos]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-muted-foreground font-medium">
            Loading logo marquee configuration...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Logo Marquee Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your logo marquee display and animation settings
              </p>
            </div>
            <div className="flex gap-3">
              {state.isEditing && (
                <Button
                  onClick={handleSave}
                  disabled={isPending}
                  variant="success"
                  size="lg"
                  className="shadow-lg"
                  leftIcon={isPending ? undefined : <CheckCircle size={18} />}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        {state.isEditing && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-warning" size={20} />
            <span className="text-warning-foreground font-medium">
              You have unsaved changes. Don't forget to save your work!
            </span>
          </div>
        )}

        {/* Main Content */}
        <Tabs
          value={state.activeTab}
          onValueChange={(value) =>
            setState((prev) => ({
              ...prev,
              activeTab: value as "logos" | "settings",
            }))
          }
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 border border-border/50">
            <TabsTrigger value="logos" className="flex items-center gap-2">
              <ImageIcon size={18} />
              Logo Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={18} />
              Animation Settings
            </TabsTrigger>
          </TabsList>

          {/* Logos Tab */}
          <TabsContent value="logos" className="space-y-6">
            <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-card-foreground">
                      Logo Collection
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Add, edit, and organize your marquee logos
                    </CardDescription>
                  </div>
                  <Button
                    onClick={addLogo}
                    variant="primary"
                    size="lg"
                    leftIcon={<Plus size={18} />}
                    className="shadow-md"
                  >
                    Add Logo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.config.logos.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <ImageIcon
                        size={48}
                        className="mx-auto mb-4 opacity-50"
                      />
                      <p className="text-lg font-medium">No logos added yet</p>
                      <p className="text-sm">Click "Add Logo" to get started</p>
                    </div>
                  ) : (
                    state.config.logos.map((logo, index) => (
                      <div
                        key={logo.id}
                        className="group relative border border-border/50 rounded-xl p-6 bg-gradient-to-r from-card to-card/80 hover:from-primary/5 hover:to-accent/5 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="space-y-6">
                          {/* Header with Logo Name and Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              {/* Logo Preview */}
                              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center border border-border/50">
                                <img
                                  src={logo.imageUrl}
                                  alt={logo.name}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/images/light-logo.webp";
                                  }}
                                />
                              </div>

                              {/* Logo Name and Status */}
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Input
                                  value={logo.name}
                                  onChange={(e) =>
                                    updateLogo(index, { name: e.target.value })
                                  }
                                  placeholder="Logo Name"
                                  className="flex-1 font-medium"
                                />
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={logo.isActive !== false}
                                    onCheckedChange={() =>
                                      toggleLogoActive(index)
                                    }
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleLogoActive(index)}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    {logo.isActive !== false ? (
                                      <Eye size={16} />
                                    ) : (
                                      <EyeOff size={16} />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveLogo(index, "up")}
                                disabled={index === 0}
                                className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
                              >
                                <MoveUp size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveLogo(index, "down")}
                                disabled={
                                  index === state.config.logos.length - 1
                                }
                                className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
                              >
                                <MoveDown size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLogo(index)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>

                          {/* Image Upload Section */}
                          <div className="border-t border-border/30 pt-4">
                            <ImageUpload
                              label="Logo Image"
                              value={logo.imageUrl}
                              onChange={(url) =>
                                updateLogo(index, { imageUrl: url })
                              }
                              placeholder="Click to upload logo image or drag and drop"
                              helperText="Supports PNG, JPG, JPEG, WebP formats up to 5MB"
                              accept="image/png,image/jpeg,image/jpg,image/webp"
                              aspectRatio={4}
                              maxSize={5}
                              showPreview={true}
                              onSuccess={(url) => {
                                toast.success(
                                  "Logo image uploaded successfully"
                                );
                              }}
                              onError={(error) => {
                                toast.error(error);
                              }}
                            />
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              logo.isActive !== false
                                ? "bg-success/20 text-success border border-success/30"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {logo.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  Animation Settings
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure marquee speed, direction, and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Speed Setting */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-card-foreground">
                    Animation Speed
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={state.config.speed}
                      onChange={(e) =>
                        updateConfig((config) => ({
                          ...config,
                          speed: parseInt(e.target.value) || 30,
                        }))
                      }
                      className="w-32"
                    />
                    <span className="text-muted-foreground text-sm">
                      seconds per cycle
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower values = faster animation, Higher values = slower
                    animation
                  </p>
                </div>

                {/* Direction Setting */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-card-foreground">
                    Animation Direction
                  </label>
                  <div className="flex gap-3">
                    <Button
                      variant={
                        state.config.direction === "left"
                          ? "primary"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        updateConfig((config) => ({
                          ...config,
                          direction: "left",
                        }))
                      }
                      className="flex-1"
                    >
                      ← Left to Right
                    </Button>
                    <Button
                      variant={
                        state.config.direction === "right"
                          ? "primary"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        updateConfig((config) => ({
                          ...config,
                          direction: "right",
                        }))
                      }
                      className="flex-1"
                    >
                      Right to Left →
                    </Button>
                  </div>
                </div>

                {/* Enable/Disable Setting */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={state.config.isActive !== false}
                      onCheckedChange={(checked) =>
                        updateConfig((config) => ({
                          ...config,
                          isActive: checked as boolean,
                        }))
                      }
                    />
                    <div>
                      <label className="text-sm font-semibold text-card-foreground">
                        Enable Logo Marquee
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Show or hide the logo marquee on your website
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview Info */}
                <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-info-foreground mb-1">
                        Preview Information
                      </h4>
                      <p className="text-sm text-info-foreground/80">
                        Current settings: {state.config.speed}s cycle,{" "}
                        {state.config.direction} direction,
                        {state.config.isActive !== false
                          ? " visible"
                          : " hidden"}{" "}
                        on website
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
