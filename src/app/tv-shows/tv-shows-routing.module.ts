import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsDashboardComponent } from './tv-shows-dashboard/tv-shows-dashboard.component';
import { AllTvShowsComponent } from './all-tv-shows/all-tv-shows.component';
import { TvShowComponent } from './tv-show/tv-show.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowsDashboardComponent
  },
  {
    path: 'all',
    component: AllTvShowsComponent
  },
  {
    path: ':id',
    component: TvShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }
