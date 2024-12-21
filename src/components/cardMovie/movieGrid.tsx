"use client";

import { useEffect } from "react";
import { Movie } from "@/utils/types/movieTypes";
import CardMovie from "./cardMovie";
import useMovies from "@/hooks/useMovies";
import { useMovieStore } from "@/store/useMovieStore";

interface MovieGridProps {
  initialMovies: Movie[];
}

const MovieGrid = ({ initialMovies }: MovieGridProps) => {
  const { allMovies } = useMovieStore();
  const { getAllPopularMovies } = useMovies(initialMovies);
  const { toggleFavorite } = useMovieStore();

  // Efecto para cargar datos iniciales si es necesario
  useEffect(() => {
    if (allMovies.length === 0) {
      getAllPopularMovies(1);
    }
  }, [getAllPopularMovies, allMovies.length]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {(allMovies.length > 0 ? allMovies : initialMovies).map((movie) => (
        <CardMovie
          key={movie.id}
          movie={movie}
          onToggleFavorite={() => toggleFavorite(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
