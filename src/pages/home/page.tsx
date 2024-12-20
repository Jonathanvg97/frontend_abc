import MainLayout from "@/app/layouts/MainLayout";
import MovieGrid from "@/components/cardMovie/movieGrid";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Sidebar */}
        <MovieSidebar />
        {/* Movie Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <MovieGrid />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
