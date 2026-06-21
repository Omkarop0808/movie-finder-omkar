"use client";

import Link from "next/link";
import { Film, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">MovieFinder</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Link
              href="/favorites"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                pathname === "/favorites" ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", pathname === "/favorites" && "fill-primary text-primary")} />
              <span>Favorites</span>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
