import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import { ThemeProvider } from "./lib/theme-provider";
import { inter, dmSans, spaceGrotesk, urbanist } from "./lib/fonts";
import ConditionalFooter from "./components/ConditionalFooter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Renderwise",
  description: "Global leading IT Company for all your needs",
  keywords:
    "IT, Renderwise, Renderwise AI, Renderwise AI Agent, Renderwise AI Agent, Renderwise AI Agent ",
  authors: [{ name: "Renderwise" }],
  robots: "index, follow",
  openGraph: {
    title: "Renderwise",
    description: "Global leading IT Company for all your needs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renderwise",
    description: "Global leading IT Company for all your needs",
  },
};

export default function RootLayout({
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
                const theme = localStorage.getItem('renderwise-theme') || 'light';
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
        <ThemeProvider defaultTheme="light" storageKey="renderwise-theme">
          <ConditionalNavbar />
          <main>{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
