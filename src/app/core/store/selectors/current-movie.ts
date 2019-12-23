import { OmniflixStateModel } from '../omniflix.state.model';

export function SelectCurrentMovie(state: OmniflixStateModel) {
  return state.currentMovie ? state.movies.filter(m => m.id === state.currentMovie)[0] : null;
}
