"use client";

import { useState } from "react";
import { Movie } from "@/lib/tmdb";
import { MovieCard } from "./MovieCard";
import { MovieDetailModal } from "./MovieDetailModal";
import { AnimatePresence } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
        <p className="text-muted-foreground">Try adjusting your search query.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index}
              onClick={(m) => setSelectedMovie(m)} 
            />
          ))}
        </AnimatePresence>
      </div>

      <MovieDetailModal 
        movie={selectedMovie} 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </>
  );
}
