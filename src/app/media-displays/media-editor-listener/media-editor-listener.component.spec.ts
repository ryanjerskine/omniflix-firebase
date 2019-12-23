import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaEditorListenerComponent } from './media-editor-listener.component';

describe('MediaEditorListenerComponent', () => {
  let component: MediaEditorListenerComponent;
  let fixture: ComponentFixture<MediaEditorListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaEditorListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaEditorListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
