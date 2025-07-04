// --font-inter: Inter, sans-serif;
// --font-poppins: Poppins, sans-serif;
// --font-roboto: Roboto, sans-serif;
// --font-source-code-pro: 'Source Code Pro', monospace;
// --font-space-grotesk: Space Grotesk, sans-serif;
// --font-dm-sans: DM Sans, sans-serif;
// --font-jetbrains-mono: 'JetBrains Mono', monospace;
// --font-fira-code: 'Fira Code', monospace;

import {
  Inter,
  Poppins,
  Roboto,
  DM_Sans,
  Space_Grotesk,
  Source_Code_Pro,
  JetBrains_Mono,
  Fira_Code,
} from "next/font/google";

// Configure Google fonts
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
  weight: ["400", "500", "600", "700"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const firaCode = Fira_Code({
  //Monospace Fonts for Code
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
  weight: ["400", "500", "600", "700"],
});

//Fonts for the website
//Headlines and Titles - Inter
//Subheadlines and Body - Poppins
//Body Text - Roboto
//Subheadlines and Body - Roboto
//Body Text - DM Sans
//Subheadlines and Body - JetBrains Mono
//Body Text - Fira Code
