export interface OmniflixStateModel {
  user: User;
  movies: DbMovie[];
  currentMovie: string;
  watchedMovies: WatchedMovie[];
  recommendedMovies: string[];
  randomMovies: string[];
  editingMediaId: string;
}
export interface User {
  id: string;
  email: string;
  photo: string;
  displayName?: string;
}
export interface WatchedMovie {
  id: string;
  date: number;
}
export interface DbMovie {
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
  // External ids
  tmdbId: number;
  imdbId: string;
  // External media
  fanart: string;
  fanartThumbnail: string;
  poster: string;
  posterThumbnail: string;
  // Status?
  tmdbStatus: string; // Released
  // tslint:disable-next-line: ban-types
  updated: number;
}
export const DefaultOmniflixState = (): OmniflixStateModel => {
  return {
    user: null,
    movies: [],
    currentMovie: null,
    watchedMovies: [],
    recommendedMovies: [],
    randomMovies: [],
    editingMediaId: null
  };
};
