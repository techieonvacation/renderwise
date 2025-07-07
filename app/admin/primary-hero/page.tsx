"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Card } from "@/app/components/ui/Card";
import { PlusIcon, TrashIcon, SaveIcon } from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "@/app/components/ui/ImageUpload";

interface SlideData {
  _id?: string;
  subTitle: string;
  title: string;
  highlightedWord: string;
  desc: string;
  image: string;
  profileImage: string;
  order: number;
}

const PrimaryHeroCMS: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch slides on component mount
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/primary-hero");
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = () => {
    const newSlide: SlideData = {
      subTitle: "New Slide",
      title: "New Title",
      highlightedWord: "Word",
      desc: "Description goes here",
      image: "/images/hero/hero-thum.png",
      profileImage: "/images/hero/hero-pro.png",
      order: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = async (index: number) => {
    const slide = slides[index];
    if (slide._id) {
      try {
        await fetch(`/api/primary-hero?id=${slide._id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting slide:", error);
        return;
      }
    }
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    // Update order for remaining slides
    newSlides.forEach((slide, idx) => {
      slide.order = idx + 1;
    });
    setSlides(newSlides);
  };

  const handleUpdateSlide = (
    index: number,
    field: keyof SlideData,
    value: string | number
  ) => {
    const newSlides = [...slides];
    newSlides[index] = {
      ...newSlides[index],
      [field]: value,
    };
    setSlides(newSlides);
  };

  const handleSaveSlides = async () => {
    setSaving(true);
    try {
      // Save each slide
      for (const slide of slides) {
        await fetch("/api/primary-hero", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slide),
        });
      }
      await fetchSlides(); // Refresh slides after saving
    } catch (error) {
      console.error("Error saving slides:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Primary Hero CMS</h1>
        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={handleAddSlide}
            leftIcon={<PlusIcon className="size-5" />}
          >
            Add Slide
          </Button>
          <Button
            variant="secondary"
            onClick={handleSaveSlides}
            disabled={saving}
            leftIcon={<SaveIcon className="size-5" />}
          >
            {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {slides.map((slide, index) => (
          <Card key={slide._id || index} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Slide {index + 1}
              </h2>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteSlide(index)}
                leftIcon={<TrashIcon className="size-4" />}
              >
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Subtitle
                  </label>
                  <Input
                    value={slide.subTitle}
                    onChange={(e) =>
                      handleUpdateSlide(index, "subTitle", e.target.value)
                    }
                    placeholder="Enter subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Title
                  </label>
                  <Input
                    value={slide.title}
                    onChange={(e) =>
                      handleUpdateSlide(index, "title", e.target.value)
                    }
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Highlighted Word
                  </label>
                  <Input
                    value={slide.highlightedWord}
                    onChange={(e) =>
                      handleUpdateSlide(
                        index,
                        "highlightedWord",
                        e.target.value
                      )
                    }
                    placeholder="Enter highlighted word"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    value={slide.desc}
                    onChange={(e) =>
                      handleUpdateSlide(index, "desc", e.target.value)
                    }
                    placeholder="Enter description"
                    className="w-full min-h-[100px] p-2 border rounded-md bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Main Image
                  </label>
                  <div className="relative h-40 mb-2">
                    <Image
                      src={slide.image}
                      alt="Main Image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <ImageUpload
                    onChange={(url) => handleUpdateSlide(index, "image", url)}
                    label="Main Image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Profile Image
                  </label>
                  <div className="relative h-20 w-20 mb-2">
                    <Image
                      src={slide.profileImage}
                      alt="Profile Image"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <ImageUpload
                    onChange={(url) =>
                      handleUpdateSlide(index, "profileImage", url)
                    }
                    label="Profile Image"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrimaryHeroCMS;
