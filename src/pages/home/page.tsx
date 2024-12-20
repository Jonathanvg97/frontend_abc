import MainLayout from "@/app/layouts/MainLayout";
import MovieGrid from "@/components/cardMovie/movieGrid";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";

const Home = () => {
  return (
    <MainLayout>
      <MovieSidebar />
      <MovieGrid />
    </MainLayout>
  );
};
export default Home;
