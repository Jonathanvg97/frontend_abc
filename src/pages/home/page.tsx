import MainLayout from "@/app/layouts/MainLayout";
import MovieGrid from "@/components/cardMovie/movieGrid";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";
import { getAllMovies } from "@/services/movies.service";
import { adaptMovie } from "@/utils/adapters/adaptMovieResponse";

const Home = async () => {
  const initialMovies = await getAllMovies(1);
  const adaptedMovies = initialMovies ? initialMovies.data.map(adaptMovie) : [];
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Sidebar */}
        <MovieSidebar />
        {/* Movie Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <MovieGrid initialMovies={adaptedMovies} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
