import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, viewChild } from '@angular/core';
import { AlbumNames } from '../../Service/artistsService';

@Component({
  selector: 'albums-carousel',
  imports: [],
  templateUrl: 'albums-carousel.html',
  styleUrl: './albums-carousel.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlbumsCarousel {
  albums = input<AlbumNames[]>([]);
  swiperEl = viewChild<ElementRef>('swiper');


  ngAfterViewInit() {
    const el = this.swiperEl();

    Object.assign(el?.nativeElement, {
      slidesPerView: 3,
      spaceBetween: 4,
      autoplay: { delay: 1900 },
      breakpoints: { 768: { slidesPerView: 6 } },
    });
    (el?.nativeElement as any).initialize();
  }
}
