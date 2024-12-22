"use client";

import { Movie } from "@/utils/types/movieTypes";
import CardMovie from "./cardMovie";
import { useMovieStore } from "@/store/useMovieStore";
import { useEffect, useState } from "react";
import MoviePaginate from "../moviePaginate/moviePaginate";
import useMovies from "@/hooks/useMovies";
import MoviesNotFound from "../moviesNotFound/moviesNotFound";

interface MovieGridProps {
  initialMovies: Movie[];
  moviesPerPage?: number;
}

const MovieGrid = ({ initialMovies, moviesPerPage = 10 }: MovieGridProps) => {
  // Store
  const {
    allMovies,
    setAllMovies,
    searchValue,
    setDefaultDataBanner,
    favoriteMovies,
    currentRoute,
  } = useMovieStore();
  // Hook
  const {
    handleFilterMovies,
    filteredMovies,
    getMovieInfo,
    handleToggleFavorite,
  } = useMovies();
  // Local state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Effects
  useEffect(() => {
    if (allMovies.length === 0 && initialMovies.length > 0) {
      setAllMovies(initialMovies); // Set the initial movies in the global state
    }
  }, [allMovies, initialMovies, setAllMovies]);

  useEffect(() => {
    // Apply filter when search value changes
    handleFilterMovies(allMovies, searchValue);
    // Reset the page to 1 when filters or search change
    setCurrentPage(1);
  }, [searchValue, allMovies, handleFilterMovies]);

  // Handle the removal of a favorite movie
  useEffect(() => {
    // Check if we have enough movies to stay on the current page
    if (
      currentRoute === "/favoriteMovies" &&
      favoriteMovies.length <= (currentPage - 1) * moviesPerPage
    ) {
      // If the current page becomes empty after removing a movie, go to the previous page
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [favoriteMovies, currentPage, moviesPerPage, currentRoute]);

  // Functions
  const moviesToDisplay = searchValue ? filteredMovies : allMovies;

  // Calculate the total pages for pagination
  const totalMovies =
    currentRoute === "/favoriteMovies"
      ? favoriteMovies.length
      : moviesToDisplay.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Adjust pagination logic when viewing favorite movies
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies =
    currentRoute === "/favoriteMovies"
      ? favoriteMovies.slice(startIndex, startIndex + moviesPerPage)
      : moviesToDisplay.slice(startIndex, startIndex + moviesPerPage);

  const handleGetMovieInfo = (movie: Movie) => {
    const newBanner = getMovieInfo(movie);
    setDefaultDataBanner({
      id: newBanner.id,
      title: newBanner.title,
      posterUrl: newBanner.posterUrl,
      description:
        newBanner.description ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit .",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UI
  return (
    <div>
      {moviesToDisplay.length === 0 ? (
        <MoviesNotFound
          title="No Movies Found"
          description="We couldn't find any movies matching your search. Try exploring our collection or refine your search criteria."
          actionText="Clear Search"
          onAction={() => useMovieStore.getState().setSearchValue("")}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {currentMovies.map((movie) => (
              <CardMovie
                key={movie.id}
                movie={movie}
                getMovieInfo={handleGetMovieInfo}
                handleToggleFavorite={handleToggleFavorite}
                isFavorite={favoriteMovies.some((fav) => fav.id === movie.id)}
              />
            ))}
          </div>
          <MoviePaginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MovieGrid;
