import { cache } from "react";
import { headers } from "next/headers";

// Helper function to get base URL
async function getBaseUrl() {
  // Check if we're running on the server side
  if (typeof window === "undefined") {
    // During build time, use environment variables or default values
    if (process.env.NODE_ENV === "production") {
      // Use your production URL or environment variable
      return process.env.NEXT_PUBLIC_BASE_URL || "https://eleservsoftech.vercel.app";
    }
    
    // During development, try to get headers safely
    try {
      const headersList = await headers();
      const host = headersList.get("host") || "localhost:3000";
      const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
      return `${protocol}://${host}`;
    } catch (error) {
      console.error("Error getting headers:", error);
      // Fallback during build time when headers are not available
      return "http://localhost:3000";
    }
  }
  return "";
}

// Types
export interface ISecondaryHero {
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

export interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
}

// Cache the data fetching functions
export const getSecondaryHeroData = cache(async (): Promise<ISecondaryHero> => {
  const baseUrl = await getBaseUrl(); // Add await here
  const response = await fetch(`${baseUrl}/api/secondary-hero`, {
    next: {
      revalidate: 60,
      tags: ["secondary-hero"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch secondary hero data");
  }

  const data = await response.json();

  // Ensure stats is an array
  if (!Array.isArray(data.stats)) {
    data.stats = [];
  }

  return data;
});

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  const baseUrl = await getBaseUrl(); // Add await here
  const response = await fetch(`${baseUrl}/api/team-members`, {
    next: {
      revalidate: 60,
      tags: ["team-members"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  return response.json();
});
