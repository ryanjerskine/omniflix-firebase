import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { OmniflixState } from 'src/app/core/store/omniflix.state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SetCurrentMovie } from 'src/app/core/store/omniflix.actions';
import { SetMovieWatchStatus } from 'src/app/core/store/action-handlers/set-movie-watch-status';
import { TMDB_CONFIGURATION } from 'src/environments/tmdb-configuration';
import { Movie } from './movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  @Select(OmniflixState.currentMovie)
  movie$: Observable<Movie>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.store.dispatch(new SetCurrentMovie(''));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new SetCurrentMovie(params.id));
    });
  }

  getPosterUrl(url: string) {
    return `${TMDB_CONFIGURATION.images.secure_base_url}${TMDB_CONFIGURATION.images.poster_sizes[5]}${url}`;
  }

  getReleaseYear(released: number) {
    if (!released) { return 'Unknown Release Date'}
    return new Date(released).getFullYear().toString();
  }

  getRuntime(runtime: number) {
    if (!runtime) { return 'Unknown runtime'; }
    if (runtime < 60) { return `${runtime} min`; }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const hoursDisplay = hours > 1 ? `${hours} hrs` : '1 hr';
    const minutesDisplay = minutes > 1 ? `${minutes} mins` : '1 min';
    return minutes === 0 ? hoursDisplay : `${hoursDisplay} ${minutesDisplay}`;
  }

  getWatchedButtonColor(watched: boolean) {
    return watched ? 'primary' : 'accent';
  }

  watch(id: string, watched: boolean) {
    this.store.dispatch(new SetMovieWatchStatus(id, watched));
  }

  ngOnDestroy() {
    this.store.dispatch(new SetCurrentMovie(null));
  }
}
