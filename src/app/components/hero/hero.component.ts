import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { PeliculaI } from 'src/app/models/interfaces/pelicula-i';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  peliculasHero: PeliculaI[] = [];
  currentIndex = 0;
  trailerUrl!: SafeResourceUrl;

  constructor(
    private peliculaService: PeliculaService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const data = await this.peliculaService.getAll();

    data.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    this.peliculasHero = data.slice(0, 5);
    this.loadTrailer();
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.peliculasHero.length;
    this.loadTrailer();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.peliculasHero.length) %
      this.peliculasHero.length;
    this.loadTrailer();
  }

  // 🔥 CLAVE
  loadTrailer() {
    const peli = this.peliculasHero[this.currentIndex];
    if (!peli?.trailer) return;

    const videoId = this.getYoutubeId(peli.trailer);
    if (!videoId) return;

    const embedUrl =
      `https://www.youtube.com/embed/${videoId}?` +
      `autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1`;

    this.trailerUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getYoutubeId(url: string): string | null {
    if (url.includes('watch?v=')) {
      return url.split('v=')[1].split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    return null;
  }
}
