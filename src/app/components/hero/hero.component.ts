import { Component, OnInit } from '@angular/core';
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

  constructor(private peliculaService: PeliculaService) {}

  async ngOnInit() {
    await this.cargarPeliculasHero();
  }

  async cargarPeliculasHero() {
    try {
      const data = await this.peliculaService.getAll();

      // ordenar por fecha DESC
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      // tomar solo 5
      this.peliculasHero = data.slice(0, 5);
    } catch (error) {
      console.error('Error cargando películas hero:', error);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.peliculasHero.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.peliculasHero.length) % this.peliculasHero.length;
  }
}