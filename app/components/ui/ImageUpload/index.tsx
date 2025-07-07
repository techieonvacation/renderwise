"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../Button";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  required?: boolean;
  className?: string;
}

export function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset states
      setError(null);
      setIsUploading(true);

      try {
        // Create FormData
        const formData = new FormData();
        formData.append("file", file);

        // Upload to your image hosting service
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        onChange(data.url);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload image"
        );
        console.error("Image upload error:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div className="flex items-center gap-4">
        {/* Preview */}
        {value && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-1 rounded-full bg-background/80 hover:bg-background text-foreground"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <label
            htmlFor={`image-upload-${label}`}
            className="cursor-pointer block"
          >
            <div
              className={`
                flex items-center justify-center w-full h-24 px-4
                border-2 border-dashed rounded-lg
                ${
                  error
                    ? "border-destructive bg-destructive/5"
                    : "border-border bg-background hover:bg-muted/50"
                }
                transition-colors duration-200
              `}
            >
              <div className="text-center">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : (
                  <>
                    {value ? (
                      <ImageIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                    ) : (
                      <UploadIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                    )}
                    <span className="mt-2 block text-sm text-muted-foreground">
                      {value ? "Change image" : "Upload image"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </label>
          <input
            id={`image-upload-${label}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isUploading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
} 