import MainLayout from "@/app/layouts/MainLayout";
import MovieGrid from "@/components/cardMovie/movieGrid";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";
import { getAllMovies, getMoviesImages } from "@/services/movies.service";
import { adaptMovie } from "@/utils/adapters/adaptMovieResponse";

const Home = async () => {
  //store
  try {
    // Obtener las películas desde el servidor
    const moviesResponse = await getAllMovies(1);
    if (!moviesResponse) {
      return (
        <MainLayout>
          <div>No movies found.</div>
        </MainLayout>
      );
    }

    // Adaptar las películas
    const adaptedMovies = moviesResponse.data.map(adaptMovie);

    // Obtener imágenes
    const images = await getMoviesImages(
      adaptedMovies.map((movie) => movie.slug || "")
    );

    // Mapear las imágenes a las películas
    const moviesWithImages = adaptedMovies.map((movie, index) => {
      const image = images[index];
      return {
        ...movie,
        posterUrl: image?.data.image || null,
      };
    });

    return (
      <MainLayout>
        <div className="flex h-full">
          {/* Sidebar */}
          <MovieSidebar />
          {/* Movie Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <MovieGrid initialMovies={moviesWithImages} />
          </div>
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return (
      <MainLayout>
        <div>Error fetching movies.</div>
      </MainLayout>
    );
  }
};

export default Home;
