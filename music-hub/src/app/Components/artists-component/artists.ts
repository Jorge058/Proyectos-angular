import { Component, inject, signal } from '@angular/core';
import { Artist, ArtistsService } from '../../Service/artistsService';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GenreformatPipePipe } from '../../Pipes/genreformat-pipe-pipe';

@Component({
  selector: 'app-artists',
  imports: [RouterLink, FormsModule,GenreformatPipePipe],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
})
export class ArtistsComponent {
  private service = inject(ArtistsService);

  artists = signal<Artist[]>([]);
  newName = '';
  newGenre = '';

  ngOnInit() {
    this.service.getArtists().subscribe((data) => this.artists.set(data));
  }

  addArtist() {
    const artist = { name: this.newName, genre: this.newGenre };
    this.service.addArtist(artist).subscribe((newArtist) => {
      this.artists.update((list) => [...list, newArtist]);
      this.newName = '';
      this.newGenre = '';
    });
  }
  deleteArtist(id:number){

    this.service.deleteArtist(id).subscribe(()=>{
      this.artists.set(this.artists().filter(a =>a.id != id))
    })
  }
}


