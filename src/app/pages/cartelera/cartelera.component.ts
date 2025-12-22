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

  constructor(
    private peliculaService: PeliculaService,
    private actorService: ActorService,
    private funcionService: FuncionService,
    public auth: AuthService
  ) {}

  // ✅ CARGA DIRECTA, SIN SUBJECT
  async ngOnInit(): Promise<void> {
    this.peliculas = await this.peliculaService.getAll();
    this.peliculasFiltradas = [...this.peliculas];

    console.log('PELÍCULAS CARGADAS:', this.peliculas);
  }

  async onSavePelicula(p: PeliculaI) {
    if (this.peliculas.some(x => x.id === p.id)) {
      await this.peliculaService.update(p);
    } else {
      await this.peliculaService.add(p);
    }

    this.peliculas = await this.peliculaService.getAll();
    this.peliculasFiltradas = [...this.peliculas];
    this.showForm = false;
  }

  async eliminarPelicula(p: PeliculaI) {
    if (!confirm(`¿Seguro que quieres eliminar "${p.titulo}"?`)) return;

    await this.peliculaService.delete(p.id);
    this.peliculas = await this.peliculaService.getAll();
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
        p.clasificacion !== this.filtro.edad) {
        return false;
      }

      if (this.filtro.categoria &&
        !p.genero.toLowerCase().includes(this.filtro.categoria.toLowerCase())) {
        return false;
      }

      if (this.filtro.casting) {
        const encontrado = p.casting.some(id => {
          const actor = allActores.find(a => a.id === id);
          return actor?.nombre.toLowerCase().includes(this.filtro.casting!.toLowerCase());
        });
        if (!encontrado) return false;
      }

      return true;
    });
  }

  limpiarFiltros() {
    this.filtro = {};
    this.peliculasFiltradas = [...this.peliculas];
  }
}
