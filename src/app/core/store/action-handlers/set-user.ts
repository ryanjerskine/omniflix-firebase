import { StateContext } from '@ngxs/store';
import { OmniflixStateModel } from '../omniflix.state.model';
import { LoadContent } from '../omniflix.actions';
import { User } from 'firebase';

export class SetUser {
  static readonly type = '[omniflix] Set User';
  constructor(public user: User) {}
}
export function HandleSetUser(ctx: StateContext<OmniflixStateModel>, action: SetUser) {
  ctx.patchState({ user: {
    id: action.user.uid,
    email: action.user.email,
    photo: action.user.photoURL,
    displayName: action.user.displayName
  }});
  return ctx.dispatch(new LoadContent());
}
