import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { DefaultOmniflixState, OmniflixStateModel, DbMovie, WatchedMovie } from './omniflix.state.model';
import {
  SignInWithGoogle, MoviesLoaded, ResetState, SignOut, RecommendedMoviesChanged, LoadContent, SetCurrentMovie, Randomize, EditMedia
} from './omniflix.actions';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { take, debounceTime, skip } from 'rxjs/operators';
import { HandleSetUser, SetUser } from './action-handlers/set-user';
import { SetMovieWatchStatus, HandleSetMovieWatchStatus } from './action-handlers/set-movie-watch-status';
import { WatchedMoviesUpdated } from './action-handlers/watched-movies-updated';
import { GenerateRandomNumbers } from '../functions/get-random-number';
import { MediaRowItem } from 'src/app/media-displays/media-row/media-row';
import { Movie } from 'src/app/movies/movie/movie';

@State<OmniflixStateModel>({
  name: 'omniflix',
  defaults: DefaultOmniflixState()
})
export class OmniflixState {
  private userSubscriptions: Subscription[] = [];

  @Selector()
  static user(state: OmniflixStateModel) { return state.user; }
  @Selector()
  static movies(state: OmniflixStateModel) { return state.movies; }
  @Selector()
  static currentMovie(state: OmniflixStateModel) {
    if (!state.currentMovie) { return null; }
    const movie = state.movies.filter(m => m.id === state.currentMovie)[0];
    if (!movie) { return null; }
    return {
      ...movie,
      watched: state.watchedMovies.filter(m => m.id === movie.id).length > 0,
      progress: movie.id === '' ? 75 : 0
    } as Movie;
  }
  @Selector()
  static recommendedMovies(state: OmniflixStateModel) { return state.recommendedMovies; }
  @Selector()
  static randomMovies(state: OmniflixStateModel) { return state.randomMovies; }
  @Selector()
  static editingMediaId(state: OmniflixStateModel) { return state.editingMediaId; }
  @Selector()
  static movieAsMediaItem(state: OmniflixStateModel) {
    return (id: string) => {
      const mov = state.movies.filter(m => m.id === id)[0];
      if (!mov) { return null; }
      return {
        id: mov.id,
        type: 'movie',
        title: mov.title,
        subtitle: mov.released ? new Date(mov.released).getFullYear() : 'Uknown',
        fanart: mov.id === '15fb8762-2b8e-4954-9d4f-0c7e3b75c448',
        watched: state.watchedMovies.filter(m => m.id === mov.id).length > 0,
        progressPercent: 0,
        menuOpen: false,
        posterThumbnailUri: mov.posterThumbnail,
        posterUri: mov.poster,
        fanartThumbnailUri: mov.fanartThumbnail,
        fanartUri: mov.fanart
      } as MediaRowItem;
    };
  }

  constructor(
    private store: Store,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => user ?
      this.store.dispatch(new SetUser(user)) :
      this.store.dispatch(new ResetState()));
  }

  @Action(ResetState)
  resetState(ctx: StateContext<OmniflixStateModel>, action: ResetState) {
    this.userSubscriptions.forEach(s => s.unsubscribe());
    this.userSubscriptions = [];
    ctx.setState(DefaultOmniflixState());
  }

  @Action(SignInWithGoogle)
  async signInWithGoogle(ctx: StateContext<OmniflixStateModel>, action: SignInWithGoogle) {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
  }

  @Action(SignOut)
  async signOut(ctx: StateContext<OmniflixStateModel>, action: SignOut) {
    await this.afAuth.auth.signOut();
  }

  @Action(SetUser)
  setUser(ctx: StateContext<OmniflixStateModel>, action: SetUser) { return HandleSetUser(ctx, action); }

  @Action(LoadContent)
  async loadContent(ctx: StateContext<OmniflixStateModel>, action: LoadContent) {
    const id = ctx.getState().user.id;
    this.db.list<DbMovie>('/movies').valueChanges().pipe(take(1)).subscribe(movies =>
      ctx.dispatch(new MoviesLoaded(movies)));
    this.db.list<string>('/recommended-movies').valueChanges().pipe(take(1)).subscribe(rms =>
      ctx.dispatch(new RecommendedMoviesChanged(rms)));
    this.db.list<WatchedMovie>(`/users/${id}/watched-movies`).valueChanges().pipe(take(1)).subscribe(wms =>
      ctx.dispatch(new WatchedMoviesUpdated(wms)));
    this.db.database.ref('/movies').orderByChild('updated').startAt(Date.now()).on('child_added',
      (a, b) => console.log('movie child added', { a, b }));
    this.db.database.ref('/movies').on('child_changed', (a, b) => console.log('movie child changed', { a, b }));
    this.db.database.ref('/movies').on('child_removed', (a, b) => console.log('movie child removed', { a, b }));
    this.userSubscriptions.push(
      this.db.list<DbMovie>('/movies').valueChanges().pipe(skip(1), debounceTime(300)).subscribe(movies =>
        this.store.dispatch(new MoviesLoaded(movies))));
    this.userSubscriptions.push(
      this.db.list<string>('/recommended-movies').valueChanges().pipe(skip(1), debounceTime(300)).subscribe(rms =>
        this.store.dispatch(new RecommendedMoviesChanged(rms))));
    this.userSubscriptions.push(
      this.db.list<WatchedMovie>(`users/${id}/watched-movies`).valueChanges().pipe(skip(1), debounceTime(300)).subscribe(wms =>
        this.store.dispatch(new WatchedMoviesUpdated(wms))));
  }
  @Action(MoviesLoaded)
  setMovies(ctx: StateContext<OmniflixStateModel>, action: MoviesLoaded) {
    ctx.patchState({ movies: action.movies });
    return ctx.dispatch(new Randomize());
  }
  @Action(RecommendedMoviesChanged)
  recommendedMoviesChanged(ctx: StateContext<OmniflixStateModel>, action: RecommendedMoviesChanged) {
    ctx.patchState({ recommendedMovies: action.ids });
  }
  @Action(SetCurrentMovie)
  setCurrentMovie(ctx: StateContext<OmniflixStateModel>, action: SetCurrentMovie) {
    ctx.patchState({ currentMovie: action.id });
  }
  @Action(SetMovieWatchStatus)
  setMovieWatchStatus(ctx: StateContext<OmniflixStateModel>, action: SetMovieWatchStatus) {
    HandleSetMovieWatchStatus(ctx, action, this.db);
  }
  @Action(WatchedMoviesUpdated)
  watchedMoviesUpdated(ctx: StateContext<OmniflixStateModel>, action: WatchedMoviesUpdated) {
    ctx.patchState({ watchedMovies: action.movieIds });
  }
  @Action(Randomize)
  randomize(ctx: StateContext<OmniflixStateModel>, action: Randomize) {
    const movies = ctx.getState().movies;
    const randomIndexes = GenerateRandomNumbers(0, movies.length, 10);
    const randomMovies = randomIndexes.map(i => movies[i].id);
    ctx.patchState({ randomMovies });
  }
  @Action(EditMedia)
  editMedia(ctx: StateContext<OmniflixStateModel>, action: EditMedia) {
    ctx.patchState({ editingMediaId: action.id });
  }
}
