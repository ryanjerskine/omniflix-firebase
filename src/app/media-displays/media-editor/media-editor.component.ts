import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-media-editor',
  templateUrl: './media-editor.component.html',
  styleUrls: ['./media-editor.component.scss']
})
export class MediaEditorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MediaEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
