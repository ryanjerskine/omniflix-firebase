import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaRowComponent } from './media-row.component';

describe('MediaRowComponent', () => {
  let component: MediaRowComponent;
  let fixture: ComponentFixture<MediaRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
