import { z } from "zod";
import { ObjectId } from "mongodb";

// Logo schema for validation
export const LogoSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional().default(true),
});

// Logo marquee configuration schema
export const LogoMarqueeConfigSchema = z.object({
  logos: z.array(LogoSchema),
  speed: z.number().int().min(1).max(100).optional().default(30),
  direction: z.enum(["left", "right"]).optional().default("left"),
  isActive: z.boolean().optional().default(true),
});

// MongoDB document interfaces
export interface LogoMarqueeDocument {
  _id?: ObjectId;
  id: string;
  config: z.infer<typeof LogoMarqueeConfigSchema>;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  order?: number;
  isActive?: boolean;
}

export interface LogoMarqueeConfig {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
  isActive?: boolean;
}

// Default logo marquee configuration
export const DEFAULT_LOGO_MARQUEE_CONFIG: LogoMarqueeConfig = {
  logos: [
    {
      id: "1",
      name: "Company 1",
      imageUrl: "/images/light-logo.webp",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      name: "Company 2",
      imageUrl: "/images/light-logo.webp",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      name: "Company 3",
      imageUrl: "/images/light-logo.webp",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      name: "Company 4",
      imageUrl: "/images/light-logo.webp",
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      name: "Company 5",
      imageUrl: "/images/light-logo.webp",
      order: 5,
      isActive: true,
    },
    {
      id: "6",
      name: "Company 6",
      imageUrl: "/images/light-logo.webp",
      order: 6,
      isActive: true,
    },
    {
      id: "7",
      name: "Company 7",
      imageUrl: "/images/light-logo.webp",
      order: 7,
      isActive: true,
    },
    {
      id: "8",
      name: "Company 8",
      imageUrl: "/images/light-logo.webp",
      order: 8,
      isActive: true,
    },
  ],
  speed: 30,
  direction: "left",
  isActive: true,
};
