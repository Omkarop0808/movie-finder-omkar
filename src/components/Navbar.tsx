"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-border bg-background pt-8 pb-4">
      <div className="container mx-auto px-4 md:px-8 flex items-end justify-between">
        <Link href="/" className="group">
          <h1 className="font-bold text-2xl md:text-3xl tracking-tighter uppercase text-foreground group-hover:text-primary transition-colors">
            [SCENE START]
          </h1>
          <p className="text-xs text-muted-foreground uppercase mt-1">
            Database of Motion Pictures
          </p>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="flex items-center space-x-4">
            <Link
              href="/favorites"
              className={cn(
                "text-sm font-bold uppercase transition-colors hover:text-primary relative",
                pathname === "/favorites"
                  ? "text-primary before:content-['>'] before:absolute before:-left-4 before:text-primary"
                  : "text-foreground"
              )}
            >
              FAVORITES
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
