"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import { FavoritesButton } from "./FavoritesButton";

interface MovieCardProps {
  movie: Movie;
  index?: number;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, index = 0, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png"; // We'll need a placeholder image or generic background

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col bg-background border border-border cursor-pointer transition-all hover:border-primary"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted border-b border-border">
        {movie.poster_path ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm p-4 text-center font-bold">
            [IMAGE MISSING]
          </div>
        )}
        
        <div className="absolute top-2 right-2 z-10 bg-background border border-border">
          <FavoritesButton movie={movie} />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base line-clamp-2 uppercase leading-snug group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="mt-2 text-sm space-y-1">
          <p className="text-muted-foreground">TAKE: {releaseYear}</p>
          <p className="text-muted-foreground flex items-center gap-2">
            RATING: <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
