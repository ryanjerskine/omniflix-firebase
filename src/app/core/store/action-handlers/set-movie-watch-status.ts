import { StateContext } from '@ngxs/store';
import { OmniflixStateModel, WatchedMovie } from '../omniflix.state.model';
import { AngularFireDatabase } from '@angular/fire/database';

export class SetMovieWatchStatus {
  static readonly type = '[omniflix] Mark Movie Watched';
  constructor(public id: string, public watched: boolean) {}
}
export function HandleSetMovieWatchStatus(ctx: StateContext<OmniflixStateModel>, action: SetMovieWatchStatus, db: AngularFireDatabase) {
  if (action.watched) {
    db.list<WatchedMovie>(`/users/${ctx.getState().user.id}/watched-movies`).set(action.id, {
      id: action.id,
      date: Date.now()
    });
  } else {
    db.list<WatchedMovie>(`/users/${ctx.getState().user.id}/watched-movies/${action.id}`).remove();
  }
}
