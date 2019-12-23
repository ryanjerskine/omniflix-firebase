import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesDashboardComponent } from './movies-dashboard/movies-dashboard.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesDashboardComponent
  },
  {
    path: 'all',
    component: AllMoviesComponent
  },
  {
    path: ':id',
    component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
