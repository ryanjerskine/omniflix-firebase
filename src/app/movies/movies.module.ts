import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieComponent } from './movie/movie.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MoviesDashboardComponent } from './movies-dashboard/movies-dashboard.component';
import { MediaDisplaysModule } from '../media-displays/media-displays.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MovieComponent,
    AllMoviesComponent,
    MoviesDashboardComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MediaDisplaysModule,
    MaterialModule
  ]
})
export class MoviesModule { }
