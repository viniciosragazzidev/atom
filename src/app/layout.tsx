import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "next-themes";
import Floating from "@/components/floating";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} size-90 relative`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <Toaster className="" />
          {children}
          <Floating />{" "}
        </ThemeProvider>
      </body>
    </html>
  );
}
