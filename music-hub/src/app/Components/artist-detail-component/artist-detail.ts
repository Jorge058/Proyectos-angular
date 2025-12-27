import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistsService, Artist } from '../../Service/artistsService';
import { JsonPipe } from '@angular/common';
import { AlbumsCarousel } from "../albums-carousel/albums-carousel";

@Component({
  selector: 'artist-detail',
  imports: [RouterLink, AlbumsCarousel],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.scss',
  standalone: true,
})
export class ArtistDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ArtistsService);

  artist = signal<Artist | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.service.getArtist(id).subscribe((data) => {
          this.artist.set(data);
          console.log('Artista cargado:', this.artist());
        });
      }
    });
  }
}
