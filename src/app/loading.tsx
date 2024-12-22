import MainLayout from "@/app/layouts/MainLayout";
import MovieSidebar from "@/components/movieSidebar/movieSidebar";
import { MovieGridSkeleton } from "@/components/UI/movieSkeleton";

export default function Loading() {
  return (
    <MainLayout>
      <div className="flex h-full">
        <MovieSidebar />
        <div className="flex-1">
          <MovieGridSkeleton />
        </div>
      </div>
    </MainLayout>
  );
}
