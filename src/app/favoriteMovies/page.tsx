"use client";
import MovieGrid from "@/components/cardMovie/movieGrid";
import SideNav from "@/components/sideNav/sideNav";
import { useMovieStore } from "@/store/useMovieStore";

export default function Page() {
  const { favoriteMovies } = useMovieStore();

  return (
    <>
      <section className="flex  w-full flex-col items-center justify-center ">
        <SideNav />
        <h1 className="text-4xl text-white mt-10">Favorite Movies</h1>
        {/* Movie Grid */}
        <div className="flex-1 p-6">
          <MovieGrid initialMovies={favoriteMovies} />
        </div>
      </section>
    </>
  );
}
