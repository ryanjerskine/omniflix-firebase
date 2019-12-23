import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { AllTvShowsComponent } from './all-tv-shows/all-tv-shows.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { TvShowsDashboardComponent } from './tv-shows-dashboard/tv-shows-dashboard.component';

@NgModule({
  declarations: [AllTvShowsComponent, TvShowComponent, TvShowsDashboardComponent],
  imports: [
    CommonModule,
    TvShowsRoutingModule
  ]
})
export class TvShowsModule { }
