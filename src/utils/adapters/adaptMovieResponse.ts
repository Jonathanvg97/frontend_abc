import { Movie, Movies } from "../types/movieTypes";

export const adaptMovie = (movie: Movies): Movie => {
  return {
    id: movie.id.toString(),
    title: movie.name,
    posterUrl: movie.image,
    slug: movie.slug,
    releaseDate: movie.year,
    rating: movie.score,
  };
};
