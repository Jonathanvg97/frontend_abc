import { create, StateCreator } from "zustand";
import zukeeper from "zukeeper";
import { Movie } from "@/utils/types/movieTypes";
import envs from "@/config/envs";

interface MovieState {
  allMovies: Movie[];
  setAllMovies: (movies: Movie[]) => void;
  addMovies: (movies: Movie[]) => void;
  toggleFavorite: (id: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const stateCreator: StateCreator<MovieState> = (set) => ({
  allMovies: [],
  setAllMovies: (movies: Movie[]) => set({ allMovies: movies }),
  addMovies: (movies: Movie[]) =>
    set((state) => ({
      allMovies: [...state.allMovies, ...movies],
    })),
  toggleFavorite: (id: string) =>
    set((state) => ({
      allMovies: state.allMovies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      ),
    })),
  searchValue: "",
  setSearchValue: (value: string) => set({ searchValue: value }),
});

export const useMovieStore = create<MovieState>(
  envs.NODE_ENV === "development" ? zukeeper(stateCreator) : stateCreator
);
