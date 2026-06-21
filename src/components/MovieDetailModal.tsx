"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, Calendar, Film } from "lucide-react";
import { Movie, getMovieDetails } from "@/lib/tmdb";
import { FavoritesButton } from "./FavoritesButton";

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailModalProps) {
  const [details, setDetails] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      setDetails(movie); // Initial basic details
      setLoading(true);
      getMovieDetails(movie.id.toString())
        .then((fullDetails) => setDetails(fullDetails))
        .catch((e) => console.error("Failed to load full details", e))
        .finally(() => setLoading(false));
    } else {
      setDetails(null);
    }
  }, [isOpen, movie]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const displayMovie = details || movie;
  const posterUrl = displayMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";
  const backdropUrl = displayMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${displayMovie.backdrop_path}`
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-5xl my-auto bg-[#0a0a0a] rounded-2xl shadow-2xl border border-white/10 pointer-events-auto flex flex-col overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Backdrop Header */}
              <div className="relative w-full h-64 md:h-96 bg-muted flex-shrink-0">
                {backdropUrl ? (
                  <Image
                    src={backdropUrl}
                    alt={displayMovie.title}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="relative px-6 pb-8 md:px-12 md:pb-12 flex flex-col md:flex-row gap-8 -mt-32 md:-mt-48">
                {/* Poster Inset */}
                <div className="hidden md:block w-1/3 flex-shrink-0">
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <Image
                      src={posterUrl}
                      alt={displayMovie.title}
                      fill
                      unoptimized={true}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow pt-4 md:pt-0 z-10">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {displayMovie.title}
                    </h2>
                    <FavoritesButton movie={displayMovie} className="flex-shrink-0 scale-110" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-8 mt-2">
                    {displayMovie.vote_average > 0 && (
                      <div className="flex items-center gap-1.5 bg-primary/20 text-primary px-2.5 py-1 rounded-md border border-primary/20 backdrop-blur-sm">
                        <Star className="w-4 h-4 fill-primary" />
                        <span className="font-semibold text-white">{displayMovie.vote_average.toFixed(1)}/10</span>
                      </div>
                    )}
                    {displayMovie.release_date && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(displayMovie.release_date).getFullYear()}</span>
                      </div>
                    )}
                    {displayMovie.runtime ? (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(displayMovie.runtime / 60)}h {displayMovie.runtime % 60}m</span>
                      </div>
                    ) : loading ? (
                      <div className="w-16 h-5 bg-white/10 animate-pulse rounded" />
                    ) : null}
                  </div>

                  {displayMovie.genres && displayMovie.genres.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {displayMovie.genres.map((g) => (
                        <span key={g.id} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  ) : loading ? (
                    <div className="flex gap-2 mb-8">
                      <div className="w-20 h-7 bg-white/10 animate-pulse rounded-full" />
                      <div className="w-16 h-7 bg-white/10 animate-pulse rounded-full" />
                    </div>
                  ) : null}

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                    <p className="text-white/70 leading-relaxed font-light text-lg">
                      {displayMovie.overview || "No overview available."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
