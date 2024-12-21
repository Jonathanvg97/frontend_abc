import { useState, useCallback } from "react";
import { Genre, Movie } from "@/utils/types/movieTypes";
import { getGenres } from "../services/movies.service";

const useMovies = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState<boolean>(false);

  // Función para filtrar las películas
  const handleFilterMovies = useCallback((movies: Movie[], query: string) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMovies(filtered);
  }, []);

  //Función para traer los generos
  const getAllGenres = useCallback(async () => {
    setLoadingGenres(true);
    try {
      const genres: Genre[] = await getGenres();
      setGenres(genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoadingGenres(false);
    }
  }, []);

  return {
    handleFilterMovies,
    filteredMovies,
    getAllGenres,
    genres,
    loadingGenres,
  };
};

export default useMovies;
