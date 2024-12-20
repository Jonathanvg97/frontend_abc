"use client";

import { useState } from "react";
import { Movie } from "@/utils/types/movieTypes";
import CardMovie from "./cardMovie";

const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Shrek 5",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseDate: "2024-08-01",
    rating: 75,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Gladiator II",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseDate: "2024-08-16",
    rating: 88,
    isFavorite: false,
  },
  {
    id: "3",
    title: "One Fast Move",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseDate: "2024-08-08",
    rating: 85,
    isFavorite: false,
  },
  {
    id: "4",
    title: "The Wild Robot",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseDate: "2024-08-02",
    rating: 90,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Deadpool Wolverine",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseDate: "2024-08-05",
    rating: 95,
    isFavorite: false,
  },
];

const MovieGrid = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const handleToggleFavorite = (id: string) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <CardMovie
          key={movie.id}
          movie={movie}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
