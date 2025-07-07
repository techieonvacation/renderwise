"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/Button";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Upload } from "lucide-react";
import Loader from "@/app/components/ui/Loader";

interface ISecondaryHero {
  _id: string;
  tagline: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  phoneNumber: string;
  phoneText: string;
  stats: Array<{ value: string; label: string }>;
  createdAt: string;
  updatedAt: string;
}

//  component for image upload
function ImageUpload({
  onImageSelect,
  currentImage,
}: {
  onImageSelect: (url: string) => void;
  currentImage?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(currentImage);
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the file
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onImageSelect(data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      // Revert preview on error
      setPreviewUrl(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && (
        <div className="relative w-full h-48 rounded-md overflow-hidden border">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={previewUrl.startsWith("data:")} // Skip optimization for data URLs
          />
        </div>
      )}
    </div>
  );
}

const SecondaryHeroAdmin: React.FC = () => {
  const [heroData, setHeroData] = useState<ISecondaryHero>({
    _id: "",
    tagline: "",
    title: "",
    description: "",
    imageUrl: "",
    ctaLabel: "",
    ctaLink: "",
    phoneNumber: "",
    phoneText: "",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    createdAt: "",
    updatedAt: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch hero data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/secondary-hero");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
        toast.error("Failed to load hero data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/secondary-hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
      });

      if (!response.ok) throw new Error("Failed to save data");

      toast.success("Hero data saved successfully");
    } catch (error) {
      console.error("Error saving hero data:", error);
      toast.error("Failed to save hero data");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle stat changes
  const handleStatChange = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    const newStats = [...heroData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setHeroData({ ...heroData, stats: newStats });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Secondary Hero Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tagline</label>
              <input
                type="text"
                value={heroData.tagline}
                onChange={(e) =>
                  setHeroData({ ...heroData, tagline: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={heroData.title}
                onChange={(e) =>
                  setHeroData({ ...heroData, title: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={heroData.description}
                onChange={(e) =>
                  setHeroData({ ...heroData, description: e.target.value })
                }
                className="w-full p-2 border rounded-md h-24"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={heroData.imageUrl}
                onChange={(e) =>
                  setHeroData({ ...heroData, imageUrl: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter a URL or use the upload option below
              </p>
              <div className="mt-2">
                <ImageUpload
                  currentImage={heroData.imageUrl}
                  onImageSelect={(url) =>
                    setHeroData({ ...heroData, imageUrl: url })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  CTA Label
                </label>
                <input
                  type="text"
                  value={heroData.ctaLabel}
                  onChange={(e) =>
                    setHeroData({ ...heroData, ctaLabel: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={heroData.ctaLink}
                  onChange={(e) =>
                    setHeroData({ ...heroData, ctaLink: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={heroData.phoneNumber}
                  onChange={(e) =>
                    setHeroData({ ...heroData, phoneNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Text
                </label>
                <input
                  type="text"
                  value={heroData.phoneText}
                  onChange={(e) =>
                    setHeroData({ ...heroData, phoneText: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h2 className="text-lg font-medium mb-3">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heroData.stats.map((stat, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) =>
                      handleStatChange(index, "value", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleStatChange(index, "label", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isSaving}
            className="min-w-32"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SecondaryHeroAdmin;