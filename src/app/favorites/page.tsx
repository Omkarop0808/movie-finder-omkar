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
      <section className="flex flex-col items-start space-y-4 py-8 md:py-12 border-b-2 border-border mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase underline decoration-2 underline-offset-4">
          INT. FAVORITES VAULT - DAY
        </h2>
        <p className="text-base text-foreground max-w-3xl leading-relaxed">
          The USER opens their private collection of saved motion pictures.
        </p>
      </section>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-start justify-center py-24 text-left border-l-4 border-border pl-6">
          <h3 className="text-xl font-bold text-foreground mb-2 uppercase">
            [VAULT EMPTY]
          </h3>
          <p className="text-muted-foreground mb-6">
            NO FAVORITES HAVE BEEN LOGGED.
          </p>
          <Link 
            href="/"
            className="text-primary font-bold uppercase underline decoration-2 underline-offset-4 hover:text-primary/80 transition-colors"
          >
            [RETURN TO SEARCH]
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
