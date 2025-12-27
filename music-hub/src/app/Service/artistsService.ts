import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Artist {
  id: number;
  name: string;
  genre: string;
  Descripcion?: string;
  AlbumNames?: AlbumNames[];
}

export interface AlbumNames {
  AlbumName: string;
  Anio: number;
  pic: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/artists';

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.baseUrl);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/${id}`);
  }

  addArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.http.post<Artist>(this.baseUrl, artist);
  }

  deleteArtist(id: number): Observable<void> {

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
