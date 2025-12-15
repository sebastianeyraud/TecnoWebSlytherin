import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { PeliculaFiltro } from 'src/app/models/pelicula-filtro';
import { PeliculaI } from 'src/app/models/interfaces/pelicula-i';
import { ActorService } from 'src/app/services/actor.service';
import { FuncionService } from 'src/app/services/funcion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  peliculas: PeliculaI[] = [];
  peliculasFiltradas: PeliculaI[] = [];
  filtro: PeliculaFiltro = {};
  showForm = false;

  constructor(private peliculasService: PeliculaService,
    private actorService: ActorService,
    private funcionService: FuncionService,
    public auth: AuthService,
    public peliculaService: PeliculaService) {
  }

  ngOnInit(): void {
    this.peliculaService.peliculas$.subscribe(pelis => {
      this.peliculas = pelis;
      this.peliculasFiltradas = [...pelis];
    });

    this.peliculaService.getAll();
  }

  async onSavePelicula(p: PeliculaI) {
    if (this.peliculas.some(x => x.id === p.id)) {
      await this.peliculaService.update(p);
    } else {
      await this.peliculaService.add(p);
    }
    this.showForm = false;
  }

  async eliminarPelicula(p: PeliculaI) {
    const confirmacion = confirm(`¿Seguro que quieres eliminar "${p.titulo}"?`);
    if (!confirmacion) return;

    await this.peliculaService.delete(p.id);
    alert('Película eliminada');
  }


  async getPeliculas(): Promise<void> {
    this.peliculas = await this.peliculasService.getAll();

    this.peliculasFiltradas = [...this.peliculas];
  }



  async aplicarFiltros(): Promise<void> {
    const allActores = await this.actorService.getAll();
    const allFunciones = await this.funcionService.getAll();

    this.peliculasFiltradas = this.peliculas.filter(p => {

      if (this.filtro.titulo &&
        !p.titulo.toLowerCase().includes(this.filtro.titulo.toLowerCase())) {
        return false;
      }

      if (this.filtro.tiempo &&
        !p.duracion_min.toString().includes(this.filtro.tiempo)) {
        return false;
      }

      if (this.filtro.edad &&
        this.filtro.edad !== 'Todas las edades' &&
        p.clasificacion !== this.filtro.edad) {
        return false;
      }

      if (this.filtro.categoria &&
        !p.genero.toLowerCase().includes(this.filtro.categoria.toLowerCase())) {
        return false;
      }

      if (this.filtro.casting) {
        const encontrado = p.casting.some(actorId => {
          const actor = allActores.find(a => a.id === actorId);
          return actor?.nombre.toLowerCase().includes(this.filtro.casting!.toLowerCase());
        });
        if (!encontrado) return false;
      }

      if (this.filtro.precioMin !== undefined || this.filtro.precioMax !== undefined) {
        const precios = p.funciones
          .map(id => allFunciones.find(f => f.id === id))
          .filter(f => f != null)
          .map(f => f!.precio_base);

        if (precios.length > 0) {
          const minPrecio = Math.min(...precios);
          const maxPrecio = Math.max(...precios);

          if (this.filtro.precioMin !== undefined && maxPrecio < this.filtro.precioMin) return false;
          if (this.filtro.precioMax !== undefined && minPrecio > this.filtro.precioMax) return false;
        }
      }

      return true;
    });
  }

  limpiarFiltros() {
    this.filtro = {};
    this.peliculasFiltradas = [...this.peliculas];
  }
}
