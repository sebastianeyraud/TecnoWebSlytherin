import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  image: string;
  date: string;
  genre: string;
  duration: string;
  description: string;
  rating: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getFeaturedMovie(): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/featured`);
  }
}
