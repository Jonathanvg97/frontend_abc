import { useState, useCallback } from "react";
import { Genre, Movie, MovieDetail } from "@/utils/types/movieTypes";
import { getGenres, getMovieDetail } from "../services/movies.service";
import { useMovieStore } from "@/store/useMovieStore";
import { useRouter } from "next/navigation";

const useMovies = () => {
  //Store
  const { toggleFavorite, setMovieDetail } = useMovieStore();
  //Destructuring
  const router = useRouter();
  //Local state
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

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

  //Función para captar toda la información de la pelicula seleccionada
  const getMovieInfo = (movie: Movie) => {
    return movie;
  };

  const handleToggleFavorite = useCallback(
    (movieId: string) => {
      toggleFavorite(movieId);
    },
    [toggleFavorite]
  );

  const getDetailMovie = async (movieId: string) => {
    setLoadingDetail(true);
    try {
      const data: MovieDetail = await getMovieDetail(movieId);
      if (data) {
        setMovieDetail(data as MovieDetail);
        router.push(movieId);
      }
    } catch (error) {
      console.error("Error fetching movie detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return {
    handleFilterMovies,
    filteredMovies,
    getAllGenres,
    genres,
    loadingGenres,
    getMovieInfo,
    handleToggleFavorite,
    getDetailMovie,
    loadingDetail,
    handleBack,
  };
};

export default useMovies;
