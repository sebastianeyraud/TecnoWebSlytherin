import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Pelicula } from 'src/app/models/pelicula.model';
import { PeliculaFiltro } from 'src/app/models/pelicula-filtro';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  peliculas: Pelicula[] = [];
  peliculasFiltradas: Pelicula[] = [];
  filtro: PeliculaFiltro = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.dataService.getPeliculas().subscribe((data: any[]) => {
      this.peliculas = data.map(d => Pelicula.fromJSON(d));
      this.peliculasFiltradas = [...this.peliculas];
    });
  }

  aplicarFiltros() {
    this.peliculasFiltradas = this.peliculas.filter(p => {
      // Tiempo
      if (this.filtro.tiempo && !p.getDuracionMin().toString().includes(this.filtro.tiempo)) return false;

      // Edad
      if (this.filtro.edad && this.filtro.edad !== 'Todas las edades' && p.getClasificacion() !== this.filtro.edad) return false;

      // Categoría / género
      if (this.filtro.categoria && !p.getGenero().toLowerCase().includes(this.filtro.categoria.toLowerCase())) return false;

      // Casting
      if (this.filtro.casting) {
        const encontrado = p.getCasting().some(a => a.toLowerCase().includes(this.filtro.casting!.toLowerCase()));
        if (!encontrado) return false;
      }

      // Precio base (si tu película tiene varias funciones con precios)
      if (this.filtro.precioMin !== undefined || this.filtro.precioMax !== undefined) {
        const precios = p.getFunciones().map(f => f.getPrecioBase());
        const minPrecio = Math.min(...precios);
        const maxPrecio = Math.max(...precios);

        if (this.filtro.precioMin !== undefined && maxPrecio < this.filtro.precioMin) return false;
        if (this.filtro.precioMax !== undefined && minPrecio > this.filtro.precioMax) return false;
      }

      return true;
    });
  }

  limpiarFiltros() {
    this.filtro = {};
    this.peliculasFiltradas = [...this.peliculas];
  }
}
