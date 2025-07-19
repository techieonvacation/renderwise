import { LogoMarqueeConfig, DEFAULT_LOGO_MARQUEE_CONFIG } from "../models/logoMarquee";

export async function getLogoMarqueeSettings(): Promise<LogoMarqueeConfig> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/logo-marquee`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch logo marquee settings:', response.statusText);
      return DEFAULT_LOGO_MARQUEE_CONFIG;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching logo marquee settings:', error);
    return DEFAULT_LOGO_MARQUEE_CONFIG;
  }
} 