import { useState, useCallback } from "react";
import { Genre, Movie, MovieDetail } from "@/utils/types/movieTypes";
import {
  getGenres,
  getMovieDetail,
  getMoviesFilter,
  getMoviesImages,
} from "../services/movies.service";
import { useMovieStore } from "@/store/useMovieStore";
import { useRouter } from "next/navigation";
import { adaptMovie } from "@/utils/adapters/adaptMovieResponse";

const useMovies = () => {
  //Store
  const { toggleFavorite, setMovieDetail, setMoviesWithGenre } =
    useMovieStore();
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

  //Función para obtener las pelis filtradas
  const getMoviesFiltered = async (genre: number) => {
    setLoadingDetail(true);
    try {
      const moviesResponse = await getMoviesFilter(genre);

      if (!moviesResponse) {
        console.error("No movies data available.");
        return;
      }

      const adaptedMovies = moviesResponse.data.map(adaptMovie);

      // Obtener las imágenes en paralelo
      const images = await getMoviesImages(
        adaptedMovies.map((movie) => movie.slug || "")
      );

      // Combinar las películas adaptadas con las imágenes
      const moviesWithImages = adaptedMovies.map((movie, index) => ({
        ...movie,
        posterUrl: images[index]?.data.image || null,
      }));

      // Actualizar el estado
      setMoviesWithGenre(moviesWithImages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

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
    setMovieDetail(null);
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
    getMoviesFiltered,
  };
};

export default useMovies;
