import { useState, useCallback } from "react";
import { Movie } from "@/utils/types/movieTypes";

const useMovies = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const handleFilterMovies = useCallback((movies: Movie[], query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMovies(filtered);
  }, []);

  return { handleFilterMovies, filteredMovies };
};

export default useMovies;
