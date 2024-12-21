"use client";

import { Movie } from "@/utils/types/movieTypes";
import CardMovie from "./cardMovie";
import { useMovieStore } from "@/store/useMovieStore";
import { useEffect, useState } from "react";
import MoviePaginate from "../moviePaginate/moviePaginate";
import useMovies from "@/hooks/useMovies";

interface MovieGridProps {
  initialMovies: Movie[];
  moviesPerPage?: number;
}

const MovieGrid = ({ initialMovies, moviesPerPage = 10 }: MovieGridProps) => {
  //Store
  const { allMovies, setAllMovies, searchValue } = useMovieStore();
  //Hook
  const { handleFilterMovies, filteredMovies } = useMovies();
  //Local state
  const [currentPage, setCurrentPage] = useState<number>(1);

  //Effects
  // Se asegura de setear el estado solo si allMovies está vacío
  useEffect(() => {
    if (allMovies.length === 0 && initialMovies.length > 0) {
      setAllMovies(initialMovies); // Setea las películas iniciales en el estado global
    }
  }, [allMovies, initialMovies, setAllMovies]);

  useEffect(() => {
    // Aplicar filtro cuando cambia la búsqueda
    handleFilterMovies(allMovies, searchValue);
    // Aplicar filtro cuando cambia el estado de todas las páginas
    setCurrentPage(1);
  }, [searchValue, allMovies, handleFilterMovies]);

  //Functions
  // Se usa `allMovies` si está disponible, de lo contrario, `initialMovies`
  const moviesToDisplay =
    filteredMovies.length > 0 ? filteredMovies : allMovies;
  // Calcular el número total de páginas
  const totalPages = Math.ceil(moviesToDisplay.length / moviesPerPage);

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Determinar las películas que se deben mostrar en la página actual
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = moviesToDisplay.slice(
    startIndex,
    startIndex + moviesPerPage
  );
  //UI
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {currentMovies.map((movie) => (
          <CardMovie
            key={movie.id}
            movie={movie}
            onToggleFavorite={() =>
              useMovieStore.getState().toggleFavorite(movie.id)
            }
          />
        ))}
      </div>
      <MoviePaginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieGrid;
