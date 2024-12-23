import { Suspense } from "react";
import MainLayout from "@/app/layouts/MainLayout";
import MovieGrid from "@/components/cardMovie/movieGrid";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";
import { MovieGridSkeleton } from "@/components/UI/movieSkeleton";
import { getAllMovies, getMoviesImages } from "@/services/movies.service";
import { adaptMovie } from "@/utils/adapters/adaptMovieResponse";

async function MovieContent() {
  // Fetch movies
  const moviesResponse = await getAllMovies(1);
  if (!moviesResponse) {
    return <div>No movies found.</div>;
  }

  const adaptedMovies = moviesResponse.data.map(adaptMovie);
  const images = await getMoviesImages(
    adaptedMovies.map((movie) => movie.slug || "")
  );

  const moviesWithImages = adaptedMovies.map((movie, index) => {
    const image = images[index];
    return {
      ...movie,
      posterUrl: image?.data.image || null,
    };
  });

  return <MovieGrid initialMovies={moviesWithImages} />;
}

export default function Home() {
  return (
    <MainLayout>
      <div className="flex h-full">
        <MovieSidebar />
        <Suspense
          fallback={
            <div className="flex-1">
              <MovieGridSkeleton />
            </div>
          }
        >
          <div className="flex-1">
            <MovieContent />
          </div>
        </Suspense>
      </div>
    </MainLayout>
  );
}
