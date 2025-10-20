import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryProvider } from "@/providers/QueryProvider";
// import "@flex-living/ui/globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Flex Living Dashboard",
  description: "Professional reviews dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Flex Living Reviews Dashboard</title>
          <meta name="author" content="Flex Living" />

    <meta property="og:title" content="Flex Living Reviews Dashboard" />
    <meta property="og:description" content="Professional reviews dashboard for monitoring property guest feedback and ratings" />
    <Navigation />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors closeButton />
        <NuqsAdapter>
         <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
