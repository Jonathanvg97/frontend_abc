import { MovieCardProps } from "@/utils/types/movieTypes";

const CardMovie = ({ movie, onToggleFavorite }: MovieCardProps) => {
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="group relative">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-zinc-400">{formattedDate}</p>
          <div className="mt-2 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400">Rating</span>
              <span className="text-sm font-bold text-white">
                {Math.round(movie.rating)}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400">Favorites</span>
              <button
                onClick={() => onToggleFavorite(movie.id)}
                className="group/fav mt-0.5"
              >
                <svg
                  className={`h-5 w-5 transition-colors ${
                    movie.isFavorite
                      ? "text-red-500"
                      : "text-white group-hover/fav:text-red-500"
                  }`}
                  fill={movie.isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardMovie;
