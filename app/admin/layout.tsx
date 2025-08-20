import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "../lib/theme-provider";
import { inter, dmSans, urbanist, spaceGrotesk } from "../lib/fonts";
import { SidebarProvider } from "../context/SidebarContext";
import AdminDashboardLayout from "./AdminDashboardLayout";

export const metadata: Metadata = {
  title: "Eleservsoftech",
  description: "Global leading IT Company for all your needs",
  keywords:
    "IT, Eleservsoftech, Eleservsoftech AI, Eleservsoftech AI Agent, Eleservsoftech AI Agent, Eleservsoftech AI Agent ",
  authors: [{ name: "Eleservsoftech" }],
  robots: "index, follow",
  openGraph: {
    title: "Eleservsoftech",
    description: "Global leading IT Company for all your needs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleservsoftech",
    description: "Global leading IT Company for all your needs",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('eleserv-theme') || 'light';
                document.documentElement.classList.add(theme);
              } catch (e) {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${urbanist.variable} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="eleserv-theme">
          <SidebarProvider>
            <AdminDashboardLayout>{children}</AdminDashboardLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
