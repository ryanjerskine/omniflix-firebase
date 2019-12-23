import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaRowComponent } from './media-row/media-row.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MediaItemComponent } from './media-item/media-item.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MediaEditorComponent } from './media-editor/media-editor.component';
import { MediaEditorListenerComponent } from './media-editor-listener/media-editor-listener.component';

@NgModule({
  declarations: [
    MediaRowComponent,
    MediaItemComponent,
    MediaEditorComponent,
    MediaEditorListenerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    MediaRowComponent,
    MediaEditorListenerComponent,
    MediaItemComponent
  ],
  entryComponents: [
    MediaEditorComponent
  ]
})
export class MediaDisplaysModule { }
