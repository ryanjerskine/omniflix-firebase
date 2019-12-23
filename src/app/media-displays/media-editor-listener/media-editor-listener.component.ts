import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OmniflixState } from 'src/app/core/store/omniflix.state';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { MediaEditorComponent } from '../media-editor/media-editor.component';
import { EditMedia } from 'src/app/core/store/omniflix.actions';

@Component({
  selector: 'app-media-editor-listener',
  templateUrl: './media-editor-listener.component.html',
  styleUrls: ['./media-editor-listener.component.scss']
})
export class MediaEditorListenerComponent implements OnInit {
  @Select(OmniflixState.editingMediaId)
  editing$: Observable<string>;

  constructor(private store: Store, private dialog: MatDialog) {
    // TODO: Pipe/takeuntil
    this.editing$.subscribe(id => this.editMedia(id));
  }

  ngOnInit() {
  }

  editMedia(id: string) {
    if (!id) { return; }
    const dialogRef = this.dialog.open(MediaEditorComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(new EditMedia(null));
    });
  }
}
