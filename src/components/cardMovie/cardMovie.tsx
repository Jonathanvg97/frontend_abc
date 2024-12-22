import { MovieCardProps } from "@/utils/types/movieTypes";
import { IconHeart } from "@public/icons";

const CardMovie = ({
  movie,
  getMovieInfo,
  handleToggleFavorite,
  isFavorite = false,
}: MovieCardProps) => {
  //Functions
  // Format the release date
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString(
    "es-ES",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  //Ui
  return (
    <button
      className="group relative w-full"
      onClick={() => getMovieInfo(movie)}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
          <h3 className="text-lg font-semibold text-white line-clamp-1 flex justify-start">
            {movie.title}
          </h3>
          <p className="text-sm text-zinc-400 flex justify-start">
            {formattedDate}
          </p>
          <div className="mt-2 flex items-center gap-8 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400">Score</span>
              <span className="text-sm font-bold text-white">
                {Math.round(movie.rating)}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400">Favorites</span>
              <div
                onClick={() => handleToggleFavorite(movie.id)}
                className="group/fav mt-0.5 cursor-pointer"
              >
                <IconHeart
                  isFavorite={isFavorite}
                  className={`h-5 w-5 transition-colors ${
                    isFavorite
                      ? "text-red-500"
                      : "text-white group-hover/fav:text-red-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CardMovie;
