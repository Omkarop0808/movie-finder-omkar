import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "MovieFinder - Discover Great Movies",
  description: "Browse, search, and save your favorite movies using the TMDB API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${courierPrime.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
