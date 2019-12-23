import {
  Component, Input, OnDestroy, AfterViewInit,
  ChangeDetectionStrategy, OnChanges, ChangeDetectorRef, ViewChild, Output, EventEmitter
} from '@angular/core';
import { SwiperConfig, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-media-row',
  templateUrl: './media-row.component.html',
  styleUrls: ['./media-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaRowComponent implements OnDestroy, AfterViewInit, OnChanges {
  private fanartIds: string[] = [];
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @Input() mediaIds: string[];
  @Input() rowTitle: string;
  @Input() refreshable = false;
  @Output() refresh = new EventEmitter();
  atStart = true;
  atEnd = false;
  config = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    keyboard: true,
    mousewheel: false,
    direction: 'horizontal'
  } as SwiperConfig;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => window.dispatchEvent(new Event('resize')));
  }

  ngOnChanges() {
    if (this.directiveRef) {
      this.directiveRef.update();
    }
    let prev = false;
    let piar = 0;
    this.fanartIds = [];
    for (const id of this.mediaIds) {
      if (prev) {
        prev = false;
        continue;
      }
      if (Math.random() > .5 || piar > 4) {
        prev = true;
        piar = 0;
        this.fanartIds.push(id);
      } else {
        piar++;
      }
    }
    // this.fanartIds = this.mediaIds.filter(m => Math.random() > 0.67);
  }

  prev() {
    this.directiveRef.prevSlide();
  }

  next() {
    this.directiveRef.nextSlide();
  }

  updateSwiper() {
    const sr = this.directiveRef.swiper();
    console.log(sr);
    this.atStart = sr.isBeginning;
    this.atEnd = sr.isEnd;
  }

  useFanart(id: string) {
    return this.fanartIds.indexOf(id) !== -1;
  }

  emitRefresh() {
    this.refresh.emit();
  }

  ngOnDestroy() {

  }
}
