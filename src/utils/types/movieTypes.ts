// Tipado de la respuesta de la API
export type Status = {
  id: number;
  name: string;
  recordType: string;
  keepUpdated: boolean;
};

export type Movies = {
  id: number;
  name: string;
  slug: string;
  image: string;
  nameTranslations: string[];
  overviewTranslations: string[];
  aliases: string[];
  score: number;
  runtime: number;
  status: Status;
  lastUpdated: string;
  year: string;
};

export type MoviesResponse = {
  data: Movies[];
  status: string;
};

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  isFavorite?: boolean;
  slug?: string;
  description?: string;
}

export interface MovieCardProps {
  movie: Movie;
  getMovieInfo: (movie: Movie) => void;
  handleToggleFavorite: (movieId: string) => void;
  isFavorite?: boolean;
}

export type Genre = {
  id: string;
  name: string;
  slug: string;
};
export interface Genres {
  data: Genre[];
}

export interface MovieDetail {
  id: number
  name: string
  image: string
  runtime: number
  year: string
  trailers: Array<{
    id: number
    name: string
    url: string
  }>
  genres: Array<{
    id: number
    name: string
  }>
  characters: Array<{
    name: string
    personName: string
    personImgURL: string
    peopleType: string
  }>
  artworks: Array<{
    image: string
    type: number
  }>
} 
