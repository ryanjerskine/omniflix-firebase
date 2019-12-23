import { WatchedMovie } from '../omniflix.state.model';

export class WatchedMoviesUpdated {
  static readonly type = '[omniflix] Watched Movies Updated';
  constructor(public movieIds: WatchedMovie[]) {}
}
