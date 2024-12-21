import { getAllMovies } from "@/services/movies.service"
import { useMovieStore } from "@/store/useMovieStore"
import { adaptMovie } from "@/utils/adapters/adaptMovieResponse"
import { Movie } from "@/utils/types/movieTypes"
import { useCallback, useEffect, useTransition } from "react"

const useMovies = (initialMovies: Movie[]) => {
  const [isPending, startTransition] = useTransition()
  const { allMovies, setAllMovies } = useMovieStore()

  // Hidratación del store
  useEffect(() => {
    // Hidratar el store solo si está vacío y tenemos datos iniciales
    if (initialMovies.length > 0 && allMovies.length === 0) {
      setAllMovies(initialMovies)
    }
  }, [initialMovies, allMovies.length, setAllMovies])

  const getAllPopularMovies = useCallback(
    async (page: number = 1): Promise<Movie[] | null> => {
      try {
        startTransition(async () => {
          const moviesResponse = await getAllMovies(page)
          if (moviesResponse) {
            const adaptedMovies = moviesResponse.data.map(adaptMovie)
            // Si es la primera página, reemplazar todo
            // Si no, agregar a las existentes
            if (page === 1) {
              setAllMovies(adaptedMovies)
            } else {
              useMovieStore.getState().addMovies(adaptedMovies)
            }
          }
        })
        return null
      } catch (error) {
        console.error('Error fetching movies:', error)
        return null
      }
    },
    [setAllMovies]
  )

  return {
    getAllPopularMovies,
    isPending,
  }
}

export default useMovies

