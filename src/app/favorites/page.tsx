"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { MovieGrid } from "@/components/MovieGrid";
import { LoadingSpinner } from "@/components/States";
import { Film } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-border/50">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Favorites</h1>
          <p className="text-muted-foreground mt-1">Movies you've saved for later.</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-xl bg-card/30">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Film className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">You haven't added any movies to your favorites.</p>
          <Link 
            href="/"
            className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
