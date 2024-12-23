"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { MovieGridSkeleton } from "../UI/movieSkeleton";
import { Movie } from "@/utils/types/movieTypes";
import CardMovie from "@/components/cardMovie/cardMovie";
import { useMovieStore } from "@/store/useMovieStore";
import { useEffect, useState } from "react";
import MoviePaginate from "@/components/moviePaginate/moviePaginate";
import useMovies from "@/hooks/useMovies";
import MoviesNotFound from "@/components/moviesNotFound/moviesNotFound";

interface MovieGridProps {
  initialMovies: Movie[];
  moviesPerPage?: number;
}

export default function MovieGrid({
  initialMovies,
  moviesPerPage = 10,
}: MovieGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  // Store
  const {
    allMovies,
    setAllMovies,
    searchValue,
    setDefaultDataBanner,
    favoriteMovies,
    currentRoute,
    setCurrentRoute,
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

  // Update currentRoute based on pathname
  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname, setCurrentRoute]);

  useEffect(() => {
    if (currentRoute !== "/favoriteMovies") {
      setIsLoading(true);
      if (allMovies.length === 0 && initialMovies.length > 0) {
        setAllMovies(initialMovies);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [allMovies, initialMovies, setAllMovies, currentRoute]);

  useEffect(() => {
    if (currentRoute !== "/favoriteMovies") {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname, currentRoute]);

  useEffect(() => {
    if (currentRoute !== "/favoriteMovies") {
      handleFilterMovies(allMovies, searchValue);
    }
    setCurrentPage(1);
  }, [searchValue, allMovies, handleFilterMovies, currentRoute]);

  useEffect(() => {
    if (currentRoute === "/favoriteMovies") {
      const maxPage = Math.ceil(favoriteMovies.length / moviesPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
    }
  }, [favoriteMovies, currentPage, moviesPerPage, currentRoute]);

  if ((isPending || isLoading) && currentRoute !== "/favoriteMovies") {
    return <MovieGridSkeleton />;
  }

  const moviesToDisplay =
    pathname === "/favoriteMovies"
      ? favoriteMovies
      : searchValue
      ? filteredMovies
      : allMovies;

  const totalMovies = moviesToDisplay.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = moviesToDisplay.slice(
    startIndex,
    startIndex + moviesPerPage
  );

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

  const handleViewMovies = () => {
    startTransition(() => {
      setCurrentRoute("/");
      router.push("/");
    });
  };

  // Handle empty states - now using pathname instead of currentRoute
  if (pathname === "/favoriteMovies" && favoriteMovies.length === 0) {
    return (
      <MoviesNotFound
        title="No Favorite Movies"
        description="You don't have any favorite movies yet. Start adding some to your favorites list!"
        actionText="View Movies"
        onAction={handleViewMovies}
      />
    );
  }

  if (moviesToDisplay.length === 0 && pathname !== "/favoriteMovies") {
    return (
      <MoviesNotFound
        title="No Movies Found"
        description="We couldn't find any movies matching your search. Try exploring our collection or refine your search criteria."
        actionText="Clear Search"
        onAction={() => useMovieStore.getState().setSearchValue("")}
      />
    );
  }

  return (
    <div>
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
    </div>
  );
}
