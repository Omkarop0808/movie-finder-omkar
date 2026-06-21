"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import { FavoritesButton } from "./FavoritesButton";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png"; // We'll need a placeholder image or generic background

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-card border border-border cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        {movie.poster_path ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
            No Image Available
          </div>
        )}
        
        <div className="absolute top-3 right-3 z-10">
          <FavoritesButton movie={movie} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white border border-white/10">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors text-card-foreground">
          {movie.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{releaseYear}</p>
      </div>
    </motion.div>
  );
}
