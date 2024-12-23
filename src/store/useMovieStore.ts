import { create, StateCreator } from "zustand";
import zukeeper from "zukeeper";
import { Movie, MovieDetail } from "@/utils/types/movieTypes";
import envs from "@/config/envs";
import db from "@/config/db";

interface MovieState {
  allMovies: Movie[];
  setAllMovies: (movies: Movie[]) => void;
  addMovies: (movies: Movie[]) => void;
  toggleFavorite: (id: string) => void;
  favoriteMovies: Movie[];
  setFavoriteMovies: (movies: Movie[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  defaultDataBanner?: {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
  };
  setDefaultDataBanner: (value: {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
  }) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  movieDetail: MovieDetail | null;
  setMovieDetail: (movie: MovieDetail | null) => void;
  moviesWithGenre: Movie[];
  setMoviesWithGenre: (movies: Movie[]) => void;
  moviesFiltered: boolean;
  setMoviesFiltered: (value: boolean) => void;
  clearFilters: () => void; // Función para limpiar filtros
}

const stateCreator: StateCreator<MovieState> = (set) => ({
  allMovies: [],
  setAllMovies: (movies: Movie[]) => set({ allMovies: movies }),
  addMovies: (movies: Movie[]) =>
    set((state) => ({
      allMovies: [...state.allMovies, ...movies],
    })),
  favoriteMovies: [],
  setFavoriteMovies: (movies: Movie[]) => set({ favoriteMovies: movies }),
  toggleFavorite: (id: string) =>
    set((state) => {
      // Si moviesFiltered es true, se trabaja con moviesWithGenre, sino con allMovies
      const moviesList = state.moviesFiltered
        ? state.moviesWithGenre
        : state.allMovies;
      const movie = moviesList.find((movie) => movie.id === id);

      if (movie) {
        const isFavorite = state.favoriteMovies.some((fav) => fav.id === id);

        // Si la película está en favoritos, se elimina de favoriteMovies
        if (isFavorite) {
          db.favoriteMovies.delete(id);
          const updatedFavorites = state.favoriteMovies.filter(
            (fav) => fav.id !== id
          );

          // Si moviesFiltered es true, también se actualiza moviesWithGenre
          const updatedMoviesWithGenre = state.moviesFiltered
            ? state.moviesWithGenre.map((m) =>
                m.id === id ? { ...m, isFavorite: false } : m
              )
            : state.moviesWithGenre;

          // También se  actualiza allMovies si no se esta trabajando con moviesWithGenre
          const updatedAllMovies = state.moviesFiltered
            ? state.allMovies
            : state.allMovies.map((m) =>
                m.id === id ? { ...m, isFavorite: false } : m
              );

          return {
            favoriteMovies: updatedFavorites,
            allMovies: updatedAllMovies,
            moviesWithGenre: updatedMoviesWithGenre,
          };
        } else {
          // Si no está en favoritos, se agrega y se asigna isFavorite: true
          db.favoriteMovies.add(movie);
          const updatedFavorites = [
            ...state.favoriteMovies,
            { ...movie, isFavorite: true },
          ];

          // Si moviesFiltered es true, también se actualiza moviesWithGenre
          const updatedMoviesWithGenre = state.moviesFiltered
            ? state.moviesWithGenre.map((m) =>
                m.id === id ? { ...m, isFavorite: true } : m
              )
            : state.moviesWithGenre;

          // También actualiza allMovies si no se esta trabajando con moviesWithGenre
          const updatedAllMovies = state.moviesFiltered
            ? state.allMovies
            : state.allMovies.map((m) =>
                m.id === id ? { ...m, isFavorite: true } : m
              );

          return {
            favoriteMovies: updatedFavorites,
            allMovies: updatedAllMovies,
            moviesWithGenre: updatedMoviesWithGenre,
          };
        }
      }
      return state;
    }),

  searchValue: "",
  setSearchValue: (value: string) => set({ searchValue: value }),
  defaultDataBanner: {
    id: "1",
    title: "Kung Fu Panda 4",
    posterUrl: "images/banner.jpeg",
    description:
      " Join Po and the Furious Five on a new epic adventure! Discover the power of friendship and the strength within! Get ready to unleash your inner warrior! 🥋✨",
  },
  setDefaultDataBanner: (value: {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
  }) => set({ defaultDataBanner: value }),
  currentRoute: "",
  setCurrentRoute: (route: string) => set({ currentRoute: route }),
  movieDetail: null,
  setMovieDetail: (movie) => set({ movieDetail: movie }),
  moviesFiltered: false,
  setMoviesFiltered: (value: boolean) => set({ moviesFiltered: value }),
  moviesWithGenre: [],
  setMoviesWithGenre: (movies: Movie[]) => {
    set({ moviesWithGenre: movies });
    set({ moviesFiltered: true });
  },
  clearFilters: () => {
    // Limpiar cualquier estado relacionado con los filtros
    set({ moviesFiltered: false });
    set({ moviesWithGenre: [] }); // Resetear películas con género (si es necesario)
  },
});

// Cargar las películas favoritas desde Dexie cuando el store se inicializa
const loadFavoriteMovies = async () => {
  const favoriteMovies = await db.favoriteMovies.toArray();
  useMovieStore.getState().setFavoriteMovies(favoriteMovies); // Actualiza el estado
};

export const useMovieStore = create<MovieState>(
  envs.NODE_ENV === "development" ? zukeeper(stateCreator) : stateCreator
);

// Cargar las películas favoritas desde Dexie al iniciar
loadFavoriteMovies();
