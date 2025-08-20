import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import { ThemeProvider } from "./lib/theme-provider";
import { inter, dmSans, spaceGrotesk, urbanist } from "./lib/fonts";
import ConditionalFooter from "./components/ConditionalFooter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Eleservsoftech",
  description: "Global leading IT Company for all your needs",
  keywords:
    "IT, Eleserv, Eleserv AI, Eleserv AI Agent, Eleserv AI Agent, Eleserv AI Agent ",
  authors: [{ name: "Eleserv" }],
  robots: "index, follow",
  openGraph: {
    title: "Eleserv",
    description: "Global leading IT Company for all your needs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleserv",
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
          <ConditionalNavbar />
          <main>{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
