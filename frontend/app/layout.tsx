import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import LayoutClient from "./layout.client";

const font = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "ChatApp",
  description: "Chat App",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" >
      <body className={`${font.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <LayoutClient>{children}</LayoutClient>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
