import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { OmniflixState } from 'src/app/core/store/omniflix.state';
import { MediaRow } from 'src/app/media-displays/media-row/media-row';
import { SEED_MOVIES } from 'src/environments/seed.data';
import { DbMovie } from 'src/app/core/store/omniflix.state.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Randomize } from 'src/app/core/store/omniflix.actions';

@Component({
  selector: 'app-movies-dashboard',
  templateUrl: './movies-dashboard.component.html',
  styleUrls: ['./movies-dashboard.component.scss']
})
export class MoviesDashboardComponent implements OnInit {
  @Select(OmniflixState.recommendedMovies)
  recommendedMovies$: Observable<string[]>;

  @Select(OmniflixState.randomMovies)
  randomMovies$: Observable<string[]>;

  constructor(private db: AngularFireDatabase, private store: Store) { }

  ngOnInit() {

  }

  async addMedia() {
    for (const m of SEED_MOVIES) {
      await this.db.list<DbMovie>('/movies').set(m.id, m);
    }
  }

  randomize() {
    this.store.dispatch(new Randomize());
  }

  // tslint:disable-next-line: member-ordering : variable-name
  private _temp = true;
  async populateRecommended() {
    await this.db.list('/recommended-movies').remove();
    if (this._temp) {
      await this.db.list('/recommended-movies').set('49181eb6-e1f0-4ab9-ab4a-f2cbd87e3591', '49181eb6-e1f0-4ab9-ab4a-f2cbd87e3591');
      await this.db.list('/recommended-movies').set('197361db-15ef-4a39-9273-12d81feedaa5', '197361db-15ef-4a39-9273-12d81feedaa5');
    } else {
      await this.db.list('/recommended-movies').set('0abb45be-8627-4fab-88e2-cbc926e75721', '0abb45be-8627-4fab-88e2-cbc926e75721');
      await this.db.list('/recommended-movies').set('15fb8762-2b8e-4954-9d4f-0c7e3b75c448', '15fb8762-2b8e-4954-9d4f-0c7e3b75c448');
    }
    this._temp = !this._temp;
  }
}
