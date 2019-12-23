import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsDashboardComponent } from './tv-shows-dashboard.component';

describe('TvShowsDashboardComponent', () => {
  let component: TvShowsDashboardComponent;
  let fixture: ComponentFixture<TvShowsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
