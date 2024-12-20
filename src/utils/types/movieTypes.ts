export interface Movie {
    id: string
    title: string
    posterUrl: string
    releaseDate: string
    rating: number
    isFavorite?: boolean
  }
  
 export  interface MovieCardProps {
    movie: Movie
    onToggleFavorite: (id: string) => void
  }
  