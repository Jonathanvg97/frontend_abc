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
}

export interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (id: string) => void;
}

export type Genre = {
  id: string;
  name: string;
  slug: string;
};
export interface Genres {
  data: Genre[];
}
