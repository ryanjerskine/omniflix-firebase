import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from '../material/material.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxsModule } from '@ngxs/store';
import { OmniflixState } from './store/omniflix.state';
import { MediaDisplaysModule } from '../media-displays/media-displays.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    SidenavComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxsModule.forRoot([OmniflixState]),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MediaDisplaysModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
