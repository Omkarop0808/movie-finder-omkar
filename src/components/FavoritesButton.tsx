"use client";

import { Heart } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoritesButtonProps {
  movie: Movie;
  className?: string;
}

export function FavoritesButton({ movie, className }: FavoritesButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) return null; // Prevent hydration mismatch

  const favorited = isFavorite(movie.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent opening the modal if clicked on card
        toggleFavorite(movie);
      }}
      className={cn(
        "flex items-center justify-center rounded-full p-2 bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all",
        favorited ? "text-primary" : "text-muted-foreground",
        className
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("w-5 h-5 transition-transform", favorited && "fill-primary scale-110")} />
    </button>
  );
}
