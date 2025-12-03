import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Pelicula } from 'src/app/models/pelicula.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  peliculasHero: Pelicula[] = [];
  currentIndex = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.cargarPeliculasHero();
  }

  cargarPeliculasHero() {
    this.dataService.getPeliculas().subscribe(data => {

      const peliculas = data.map(d => Pelicula.fromJSON(d));

      // ordenar por fecha DESC
      peliculas.sort((a, b) =>
        new Date(b.getCreatedAt()).getTime() - new Date(a.getCreatedAt()).getTime()
      );

      // tomar solo 5
      this.peliculasHero = peliculas.slice(0, 5);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.peliculasHero.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.peliculasHero.length) %
      this.peliculasHero.length;
  }
}
