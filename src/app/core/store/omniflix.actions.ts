import { DbMovie } from './omniflix.state.model';

export class ResetState {
  static readonly type = '[omniflix] Reset State';
  constructor() {}
}
export class SignInWithGoogle {
  static readonly type = '[omniflix] Sign In With Google';
  constructor() {}
}
export class SignOut {
  static readonly type = '[omniflix] Sign Out';
  constructor() {}
}
export class LoadContent {
  static readonly type = '[omniflix] Load Content';
  constructor() {}
}
export class MoviesLoaded {
  static readonly type = '[omniflix] Set Movies';
  constructor(public movies: DbMovie[]) {}
}
export class RecommendedMoviesChanged {
  static readonly type = '[omniflix] Recommended Movies Loaded';
  constructor(public ids: string[]) {}
}
export class SetCurrentMovie {
  static readonly type = '[omniflix] Set Current Movie';
  constructor(public id: string) {}
}
export class Randomize {
  static readonly type = '[omniflix] Randomize';
  constructor() {}
}
export class EditMedia {
  static readonly type = '[omniflix] EditMedia';
  constructor(public id: string) {}
}
