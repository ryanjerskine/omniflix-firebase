export interface Movie {
  id: string;
  title: string;
  released: number;
  runtime: number;
  rating: string;
  summary: string;
  budget: number;
  revenue: number;
  tagline: string;
  imdbRating: number;
  generes: any[];
  directors: any[];
  writers: any[];
  studios: any[];
  tmdbId: number;
  imdbId: string;
  fanart: string;
  fanartThumbnail: string;
  poster: string;
  posterThumbnail: string;
  tmdbStatus: string; // Released
  updated: number;
  watched: boolean;
  progress: number;
}
