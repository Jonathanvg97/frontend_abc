import { create, StateCreator } from "zustand";
import zukeeper from "zukeeper";
import { Movie } from "@/utils/types/movieTypes";
import envs from "@/config/envs";

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
      const movie = state.allMovies.find((movie) => movie.id === id);
      if (movie) {
        const isFavorite = state.favoriteMovies.some((fav) => fav.id === id);

        // Si la película está en favoritos, Se elimina de favoriteMovies
        if (isFavorite) {
          const updatedFavorites = state.favoriteMovies.filter(
            (fav) => fav.id !== id
          );

          return { favoriteMovies: updatedFavorites };
        } else {
          // Si no está en favoritos, se agregamos y se asignas isFavorite: true
          const updatedFavorites = [
            ...state.favoriteMovies,
            { ...movie, isFavorite: true }, // añade isFavorite: true
          ];

          return { favoriteMovies: updatedFavorites };
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
});

export const useMovieStore = create<MovieState>(
  envs.NODE_ENV === "development" ? zukeeper(stateCreator) : stateCreator
);
