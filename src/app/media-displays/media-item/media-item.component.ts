import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MediaRowItem } from '../media-row/media-row';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OmniflixState } from 'src/app/core/store/omniflix.state';
import { map } from 'rxjs/operators';
import { SetMovieWatchStatus } from 'src/app/core/store/action-handlers/set-movie-watch-status';
import { EditMedia } from 'src/app/core/store/omniflix.actions';
import { TMDB_CONFIGURATION } from 'src/environments/tmdb-configuration';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaItemComponent implements OnInit {
  @Input() id: string;
  @Input() fanart: boolean;
  @Input() type: string;
  @Input() size: string;
  mediaItem$: Observable<MediaRowItem>;
  menuOpen = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.mediaItem$ = this.store
      .select(OmniflixState.movieAsMediaItem)
      .pipe(map(filterFn => filterFn(this.id)));
  }

  getRouterLink() {
    if (this.type === 'movie') {
      return `/movies/${this.id}`;
    }
    return '';
  }

  getPosterUrl(tmdbPoster: string) {
    if (this.size === 'large') {
      return `${TMDB_CONFIGURATION.images.secure_base_url}${TMDB_CONFIGURATION.images.poster_sizes[4]}${tmdbPoster}`;
    }
    return `${TMDB_CONFIGURATION.images.secure_base_url}${TMDB_CONFIGURATION.images.poster_sizes[2]}${tmdbPoster}`;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  edit() {
    this.store.dispatch(new EditMedia(this.id));
  }

  watched(value: boolean) {
    this.store.dispatch(new SetMovieWatchStatus(this.id, value));
  }
}
