import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OmniflixState } from '../../store/omniflix.state';
import { Observable } from 'rxjs';
import { User } from '../../store/omniflix.state.model';
import { SignOut } from '../../store/omniflix.actions';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(OmniflixState.user)
  user$: Observable<User>;

  constructor(private store: Store, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('film', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/film.svg') );
  }

  signOut() {
    this.store.dispatch(new SignOut());
  }
}
